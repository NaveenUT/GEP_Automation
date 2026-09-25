import type { RegionName } from '../regions/RegionBehaviour';

export type MarketId = 'us-qa' | 'uk-dental-qa' | 'uk-medical-qa';

export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy';

/**
 * A site configuration the tests run against. Replaces the Tosca test configuration
 * parameters {CP[Country]}, the "Gen" condition and {CP[Domain]}.
 */
export type Market = {
  id: MarketId;
  baseUrl: string;
  /** Tosca: {CP[Country]} */
  country: string;
  /** Tosca "Gen" condition from TDM: which UI variant the site uses */
  region: RegionName;
  /** Tosca: {CP[Domain]}; only the UK site has the Medical/Dental domain picker */
  domain: string;
  /** How the site shows dates in input fields */
  dateFormat: DateFormat;
  /** Prefix of this market's keys in .env, e.g. US_QA -> US_QA_APP_USERNAME, US_QA_BASE_URL */
  envPrefix: string;
};

export const MARKETS: Record<MarketId, Market> = {
  'us-qa': {
    id: 'us-qa',
    baseUrl: 'https://www.us.qa.eschein.com/en-us',
    country: 'US',
    region: 'genx',
    domain: '',
    dateFormat: 'mm/dd/yyyy',
    envPrefix: 'US_QA',
  },
  'uk-dental-qa': {
    id: 'uk-dental-qa',
    baseUrl: 'https://www.uk.qa.eschein.com/',
    country: 'UK',
    region: 'genx',
    domain: 'Dental',
    dateFormat: 'dd/mm/yyyy',
    envPrefix: 'UK_DENTAL_QA',
  },
  'uk-medical-qa': {
    id: 'uk-medical-qa',
    baseUrl: 'https://www.uk.qa.eschein.com/',
    country: 'UK',
    region: 'genx',
    domain: 'Medical',
    dateFormat: 'dd/mm/yyyy',
    envPrefix: 'UK_MEDICAL_QA',
  },
};

export const DEFAULT_MARKET: MarketId = 'us-qa';

export function isMarketId(value: string): value is MarketId {
  return value in MARKETS;
}
