import { test as base, expect } from '@playwright/test';
import { DemoHeader } from '../src/demo/components/DemoHeader';
import { DemoHomePage } from '../src/demo/pages/DemoHomePage';
import { DemoLoginPage } from '../src/demo/pages/DemoLoginPage';
import { DemoCategoryPage } from '../src/demo/pages/DemoCategoryPage';
import { DemoProductPage } from '../src/demo/pages/DemoProductPage';
import { DemoCartPage } from '../src/demo/pages/DemoCartPage';
import { DemoCheckoutPage } from '../src/demo/pages/DemoCheckoutPage';
import { DemoOrderCompletedPage } from '../src/demo/pages/DemoOrderCompletedPage';
import { DemoMyAccountPage } from '../src/demo/pages/DemoMyAccountPage';
import { DemoOrdersPage } from '../src/demo/pages/DemoOrdersPage';
import { DemoSessionFlow } from '../src/demo/flows/DemoSessionFlow';

type DemoFixtures = {
  // Components
  header: DemoHeader;
  // Pages
  homePage: DemoHomePage;
  loginPage: DemoLoginPage;
  categoryPage: DemoCategoryPage;
  productPage: DemoProductPage;
  cartPage: DemoCartPage;
  checkoutPage: DemoCheckoutPage;
  orderCompletedPage: DemoOrderCompletedPage;
  myAccountPage: DemoMyAccountPage;
  ordersPage: DemoOrdersPage;
  // Flows
  session: DemoSessionFlow;
};

/**
 * Fixtures for the Demo Web Shop tests (the "demo-webshop" project in playwright.config.ts).
 * Separate from gepFixtures.ts: the two applications share only src/core, src/config and src/utils.
 */
export const test = base.extend<DemoFixtures>({
  header: async ({ page }, use) => use(new DemoHeader(page)),

  homePage: async ({ page }, use) => use(new DemoHomePage(page)),
  loginPage: async ({ page }, use) => use(new DemoLoginPage(page)),
  categoryPage: async ({ page }, use) => use(new DemoCategoryPage(page)),
  productPage: async ({ page }, use) => use(new DemoProductPage(page)),
  cartPage: async ({ page }, use) => use(new DemoCartPage(page)),
  checkoutPage: async ({ page }, use) => use(new DemoCheckoutPage(page)),
  orderCompletedPage: async ({ page }, use) => use(new DemoOrderCompletedPage(page)),
  myAccountPage: async ({ page }, use) => use(new DemoMyAccountPage(page)),
  ordersPage: async ({ page }, use) => use(new DemoOrdersPage(page)),

  session: async ({ header, homePage, loginPage }, use) => use(new DemoSessionFlow({ header, homePage, loginPage })),
});

export { expect };

/** Demo Web Shop tests run against a public site and include mail steps, so they get more time. */
export const DEMO_TEST_TIMEOUT = 5 * 60 * 1000;
