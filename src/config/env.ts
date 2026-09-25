import dotenv from 'dotenv';
import path from 'path';
import { DEFAULT_MARKET, MARKETS, Market, MarketId, isMarketId } from './markets';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env'), quiet: true });

function read(name: string): string {
  return process.env[name]?.trim() ?? '';
}

/** Run settings from .env (or the CI environment). */
export const env = {
  timeout: Number(read('TIMEOUT')) || 60000,
  // Headed locally so the run can be watched; headless on CI or with HEADLESS=true.
  headless: !!process.env.CI || read('HEADLESS') === 'true',
};

/** Markets to run: MARKET in .env, comma-separated for several (default us-qa). */
export function selectedMarketIds(): MarketId[] {
  const ids = (read('MARKET') || DEFAULT_MARKET).split(',').map((id) => id.trim()).filter(Boolean);
  for (const id of ids) {
    if (!isMarketId(id)) {
      throw new Error(`Unknown MARKET "${id}". Use one of: ${Object.keys(MARKETS).join(', ')}.`);
    }
  }
  return ids as MarketId[];
}

/** The market profile, with an optional <PREFIX>_BASE_URL override from .env. */
export function resolveMarket(id: MarketId): Market {
  const market = MARKETS[id];
  return { ...market, baseUrl: read(`${market.envPrefix}_BASE_URL`) || market.baseUrl };
}

export type Credentials = { username: string; password: string };

/**
 * Login for a market, from .env only (never from code). Most specific key wins:
 *   <TC>_<PREFIX>_APP_USERNAME  e.g. GEP2_36899_UK_DENTAL_QA_APP_USERNAME (one test case on one market)
 *   <TC>_APP_USERNAME           e.g. GEP2_36899_APP_USERNAME            (one test case on every market)
 *   <PREFIX>_APP_USERNAME       e.g. US_QA_APP_USERNAME                 (the market's default user)
 *   APP_USERNAME                shared fallback
 * The same order applies to _APP_PASSWORD.
 */
export function credentialsFor(market: Market, tcId?: string): Credentials {
  const tc = tcId ? tcId.replace(/-/g, '_') : '';
  const lookup = (name: string): string => {
    const keys = [tc && `${tc}_${market.envPrefix}_${name}`, tc && `${tc}_${name}`, `${market.envPrefix}_${name}`, name].filter(Boolean);
    for (const key of keys) {
      const value = read(key);
      if (value) return value;
    }
    throw new Error(`No ${name} for market "${market.id}". Set ${market.envPrefix}_${name} in .env (see .env.example).`);
  };
  return { username: lookup('APP_USERNAME'), password: lookup('APP_PASSWORD') };
}
