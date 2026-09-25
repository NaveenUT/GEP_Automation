import { defineConfig, devices } from '@playwright/test';
import type { GepOptions } from './fixtures/gepFixtures';
import { env, resolveMarket, selectedMarketIds } from './src/config/env';

export default defineConfig<GepOptions>({
  testDir: './tests',
  timeout: env.timeout,
  expect: {
    timeout: 10000,
  },
  // Tests share one account (and so one cart) per market, so they run one after another.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['monocart-reporter', { name: 'Automation Test Report', outputFile: 'monocart-report/index.html' }],
  ],

  use: {
    headless: env.headless,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 30000,
    navigationTimeout: env.timeout,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },

  // One project per market selected with MARKET in .env (default us-qa), e.g. MARKET=us-qa,uk-dental-qa.
  projects: selectedMarketIds().map((marketId) => ({
    name: marketId,
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 },
      marketId,
      baseURL: resolveMarket(marketId).baseUrl,
    },
  })),

  outputDir: 'test-results',
});
