import dotenv from 'dotenv';
import path from 'path';
import { DEFAULT_MARKET, MARKETS, Market, MarketId, isMarketId } from './markets';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env'), quiet: true });

function read(name: string): string {
  return process.env[name]?.trim() ?? '';
}

/** Run settings from .env (or the CI environment). */
export const ENV = {
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

// ---------------------------------------------------------------- Demo Web Shop (second application)

/** Demo Web Shop site; DEMO_WEBSHOP_BASE_URL in .env overrides it. */
export function demoWebshopUrl(): string {
  return read('DEMO_WEBSHOP_BASE_URL') || 'https://demowebshop.tricentis.com';
}

/** Demo Web Shop login, from .env only: DEMO_WEBSHOP_USERNAME / DEMO_WEBSHOP_PASSWORD (Tosca {PL[Email]} / {PL[Password]}). */
export function demoWebshopCredentials(): Credentials {
  const username = read('DEMO_WEBSHOP_USERNAME');
  const password = read('DEMO_WEBSHOP_PASSWORD');
  if (!username || !password) {
    throw new Error('No Demo Web Shop login. Set DEMO_WEBSHOP_USERNAME and DEMO_WEBSHOP_PASSWORD in .env (see .env.example).');
  }
  return { username, password };
}

export type MailServer = { host: string; port: number; secure: boolean; user: string; password: string };

export type DemoMailSettings = {
  /** Sender mailbox (SMTP), steps 22-23 */
  sender: MailServer & { from: string };
  /** Receiver mailbox (IMAP), steps 24-25 */
  receiver: MailServer & { address: string };
};

/**
 * Sender (SMTP) and receiver (IMAP) mailboxes for TC04, from .env:
 *   DEMO_MAIL_SMTP_HOST, DEMO_MAIL_SMTP_PORT (587), DEMO_MAIL_SMTP_USER, DEMO_MAIL_SMTP_PASSWORD, DEMO_MAIL_FROM (= SMTP user)
 *   DEMO_MAIL_IMAP_HOST, DEMO_MAIL_IMAP_PORT (993), DEMO_MAIL_IMAP_USER, DEMO_MAIL_IMAP_PASSWORD, DEMO_MAIL_TO (= IMAP user)
 * Returns undefined when any required value is missing.
 */
export function demoMailSettings(): DemoMailSettings | undefined {
  const smtpHost = read('DEMO_MAIL_SMTP_HOST');
  const smtpUser = read('DEMO_MAIL_SMTP_USER');
  const smtpPassword = read('DEMO_MAIL_SMTP_PASSWORD');
  const imapHost = read('DEMO_MAIL_IMAP_HOST');
  const imapUser = read('DEMO_MAIL_IMAP_USER');
  const imapPassword = read('DEMO_MAIL_IMAP_PASSWORD');
  if (!smtpHost || !smtpUser || !smtpPassword || !imapHost || !imapUser || !imapPassword) return undefined;

  const smtpPort = Number(read('DEMO_MAIL_SMTP_PORT')) || 587;
  const imapPort = Number(read('DEMO_MAIL_IMAP_PORT')) || 993;
  return {
    sender: { host: smtpHost, port: smtpPort, secure: smtpPort === 465, user: smtpUser, password: smtpPassword, from: read('DEMO_MAIL_FROM') || smtpUser },
    receiver: { host: imapHost, port: imapPort, secure: true, user: imapUser, password: imapPassword, address: read('DEMO_MAIL_TO') || imapUser },
  };
}
