import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

/** Tosca "Gen" condition from TDM: decides which UI variant the country uses. */
export type Region = 'genx' | 'geny' | 'genz';

const REGIONS: readonly Region[] = ['genx', 'geny', 'genz'];

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env (see .env.example).`);
  }
  return value;
}

function optionalEnv(name: string): string {
  return process.env[name]?.trim() ?? '';
}

/**
 * Key for a per-country value: <COUNTRY>_<NAME> (e.g. US_BASE_URL) when that key is in .env,
 * else the shared <NAME>. A per-country key that is present but empty is reported as missing
 * instead of falling back, so one country never picks up another country's values.
 */
function countryKey(name: string): string {
  const country = process.env.COUNTRY?.trim().toUpperCase();
  const key = `${country}_${name}`;
  return country && key in process.env ? key : name;
}

/**
 * Central configuration. Required values are getters, so a missing value fails
 * the test that needs it instead of breaking `playwright test --list`.
 * COUNTRY picks the environment: see countryKey().
 */
export const config = {
  baseUrl: optionalEnv(countryKey('BASE_URL')),
  timeout: Number(process.env.TIMEOUT) || 60000,

  // Tosca: {CP[Domain]} (only used for the UK domain check)
  domain: optionalEnv(countryKey('DOMAIN')),
  // Tosca: {CP[UserType]} (selects which TDM user to log in with)
  userType: optionalEnv(countryKey('USER_TYPE')),

  get username(): string {
    return requireEnv(countryKey('APP_USERNAME'));
  },
  get password(): string {
    return requireEnv(countryKey('APP_PASSWORD'));
  },
  // Tosca: {CP[Country]}
  get country(): string {
    return requireEnv('COUNTRY').toUpperCase();
  },
  get region(): Region {
    const key = countryKey('REGION');
    const value = requireEnv(key).toLowerCase();
    if (!REGIONS.includes(value as Region)) {
      throw new Error(`${key} must be one of ${REGIONS.join(', ')} (got "${value}").`);
    }
    return value as Region;
  },
  // Tosca: TDM Condition == 'Generic' (product to order)
  get productId(): string {
    return requireEnv(countryKey('PRODUCT_ID'));
  },
  // Tosca: TDM Condition == 'Productwith2UOM' (product sold in a primary and a secondary UOM)
  get uomProductId(): string {
    return requireEnv(countryKey('UOM_PRODUCT_ID'));
  },
  // Tosca: TDM Condition == 'recurringFrequency' (option shown in the recurring frequency dropdown)
  get recurringFrequency(): string {
    return requireEnv(countryKey('RECURRING_FREQUENCY'));
  },
};

/**
 * Per-test values: reads <TC>_<NAME> first (e.g. GEP2_36899_APP_USERNAME), then the per-country
 * or shared <NAME> (see countryKey). Lets test cases that need a different user or product share one .env.
 */
export function configFor(tcId: string) {
  const prefix = tcId.replace(/-/g, '_');
  const value = (name: string): string => process.env[`${prefix}_${name}`]?.trim() || requireEnv(countryKey(name));
  return {
    get username(): string {
      return value('APP_USERNAME');
    },
    get password(): string {
      return value('APP_PASSWORD');
    },
    get productId(): string {
      return value('PRODUCT_ID');
    },
  };
}
