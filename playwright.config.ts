import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const TIMEOUT = Number(process.env.TIMEOUT) || 60000;

export default defineConfig({
  testDir: './tests',
  timeout: TIMEOUT,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['monocart-reporter', { name: 'Automation Test Report', outputFile: 'monocart-report/index.html' }],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    actionTimeout: 30000,
    navigationTimeout: TIMEOUT,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
  ],

  outputDir: 'test-results',
});
