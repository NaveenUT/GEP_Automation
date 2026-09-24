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

/**
 * Central configuration. Required values are getters, so a missing value fails
 * the test that needs it instead of breaking `playwright test --list`.
 */
export const config = {
  baseUrl: process.env.BASE_URL?.trim() ?? '',
  timeout: Number(process.env.TIMEOUT) || 60000,

  // Tosca: {CP[Domain]} (only used for the UK domain check)
  domain: process.env.DOMAIN?.trim() ?? '',
  // Tosca: {CP[UserType]} (selects which TDM user to log in with)
  userType: process.env.USER_TYPE?.trim() ?? '',

  get username(): string {
    return requireEnv('APP_USERNAME');
  },
  get password(): string {
    return requireEnv('APP_PASSWORD');
  },
  // Tosca: {CP[Country]}
  get country(): string {
    return requireEnv('COUNTRY').toUpperCase();
  },
  get region(): Region {
    const value = requireEnv('REGION').toLowerCase();
    if (!REGIONS.includes(value as Region)) {
      throw new Error(`REGION must be one of ${REGIONS.join(', ')} (got "${value}").`);
    }
    return value as Region;
  },
  // Tosca: TDM Condition == 'Generic' (product to order)
  get productId(): string {
    return requireEnv('PRODUCT_ID');
  },
  // Tosca: TDM Condition == 'recurringFrequency' (option shown in the recurring frequency dropdown)
  get recurringFrequency(): string {
    return requireEnv('RECURRING_FREQUENCY');
  },
};

/**
 * Per-test values: reads <TC>_<NAME> first (e.g. GEP2_36899_APP_USERNAME), then the shared <NAME>.
 * Lets test cases that need a different user or product share one .env.
 */
export function configFor(tcId: string) {
  const prefix = tcId.replace(/-/g, '_');
  const value = (name: string): string => process.env[`${prefix}_${name}`]?.trim() || requireEnv(name);
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
