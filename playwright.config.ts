import { defineConfig, devices } from '@playwright/test';
import type { GepOptions } from './fixtures/gepFixtures';
import { ENV, resolveMarket, selectedMarketIds } from './src/config/env';

// Headless (CI, HEADLESS=true): fixed 1920x1080 so every run renders the same layout.
// Headed (local): a maximised window sized to the screen, so the whole page stays in view.
// deviceScaleFactor is dropped because Playwright rejects it with a null viewport.
const { deviceScaleFactor: _deviceScaleFactor, ...desktopChrome } = devices['Desktop Chrome'];
const browserWindow = ENV.headless
  ? { viewport: { width: 1920, height: 1080 } }
  : { viewport: null, launchOptions: { args: ['--start-maximized'] } };

export default defineConfig<GepOptions>({
  testDir: './tests',
  timeout: ENV.timeout,
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
    headless: ENV.headless,
    actionTimeout: 30000,
    navigationTimeout: ENV.timeout,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },

  // One project per market selected with MARKET in .env (default us-qa), e.g. MARKET=us-qa,uk-dental-qa.
  projects: selectedMarketIds().map((marketId) => ({
    name: marketId,
    use: {
      ...desktopChrome,
      ...browserWindow,
      marketId,
      baseURL: resolveMarket(marketId).baseUrl,
    },
  })),

  outputDir: 'test-results',
});
