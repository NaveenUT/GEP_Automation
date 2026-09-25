import { test as base, expect } from '@playwright/test';
import type { Market, MarketId } from '../src/config/markets';
import { resolveMarket } from '../src/config/env';
import { regionFor, type RegionBehaviour } from '../src/regions';
import { GepHeader } from '../src/components/GepHeader';
import { GepPopups } from '../src/components/GepPopups';
import { GepHomePage } from '../src/pages/GepHomePage';
import { GepLoginPage } from '../src/pages/GepLoginPage';
import { GepSearchResultsPage } from '../src/pages/GepSearchResultsPage';
import { GepProductDetailPage } from '../src/pages/GepProductDetailPage';
import { GepShoppingCartPage } from '../src/pages/GepShoppingCartPage';
import { GepShippingBillingPage } from '../src/pages/GepShippingBillingPage';
import { GepReviewOrderPage } from '../src/pages/GepReviewOrderPage';
import { GepOrderConfirmationPage } from '../src/pages/GepOrderConfirmationPage';
import { GepMyOrdersPage } from '../src/pages/GepMyOrdersPage';
import { GepOrderDetailsPage } from '../src/pages/GepOrderDetailsPage';
import { GepSessionFlow } from '../src/flows/GepSessionFlow';
import { GepCartFlow } from '../src/flows/GepCartFlow';
import { GepCheckoutFlow } from '../src/flows/GepCheckoutFlow';
import { GepOrderHistoryFlow } from '../src/flows/GepOrderHistoryFlow';
import { getMarketData, type MarketData } from '../data/marketData';

/** Set per Playwright project in playwright.config.ts (one project per market). */
export type GepOptions = {
  marketId: MarketId;
};

type GepFixtures = {
  // Market
  market: Market;
  marketData: MarketData;
  region: RegionBehaviour;
  // Components
  header: GepHeader;
  popups: GepPopups;
  // Pages
  homePage: GepHomePage;
  loginPage: GepLoginPage;
  searchResultsPage: GepSearchResultsPage;
  productDetailPage: GepProductDetailPage;
  shoppingCartPage: GepShoppingCartPage;
  shippingBillingPage: GepShippingBillingPage;
  reviewOrderPage: GepReviewOrderPage;
  orderConfirmationPage: GepOrderConfirmationPage;
  myOrdersPage: GepMyOrdersPage;
  orderDetailsPage: GepOrderDetailsPage;
  // Flows (Tosca reusable test step blocks)
  session: GepSessionFlow;
  cart: GepCartFlow;
  checkout: GepCheckoutFlow;
  orderHistory: GepOrderHistoryFlow;
};

/**
 * Fixtures only construct objects; nothing navigates until a test calls a flow or page method.
 * Tests import `test` and `expect` from here instead of from @playwright/test.
 */
export const test = base.extend<GepOptions & GepFixtures>({
  marketId: ['us-qa', { option: true }],

  market: async ({ marketId }, use) => use(resolveMarket(marketId)),
  marketData: async ({ marketId }, use) => use(getMarketData(marketId)),
  region: async ({ market }, use) => use(regionFor(market.region)),

  header: async ({ page }, use) => use(new GepHeader(page)),
  popups: async ({ page }, use) => use(new GepPopups(page)),

  homePage: async ({ page }, use) => use(new GepHomePage(page)),
  loginPage: async ({ page }, use) => use(new GepLoginPage(page)),
  searchResultsPage: async ({ page }, use) => use(new GepSearchResultsPage(page)),
  productDetailPage: async ({ page }, use) => use(new GepProductDetailPage(page)),
  shoppingCartPage: async ({ page }, use) => use(new GepShoppingCartPage(page)),
  shippingBillingPage: async ({ page }, use) => use(new GepShippingBillingPage(page)),
  reviewOrderPage: async ({ page }, use) => use(new GepReviewOrderPage(page)),
  orderConfirmationPage: async ({ page }, use) => use(new GepOrderConfirmationPage(page)),
  myOrdersPage: async ({ page }, use) => use(new GepMyOrdersPage(page)),
  orderDetailsPage: async ({ page }, use) => use(new GepOrderDetailsPage(page)),

  session: async ({ market, region, homePage, header, popups, loginPage }, use) =>
    use(new GepSessionFlow({ market, region, homePage, header, popups, loginPage })),
  cart: async ({ market, region, header, searchResultsPage, productDetailPage, shoppingCartPage }, use) =>
    use(new GepCartFlow({ market, region, header, searchResultsPage, productDetailPage, shoppingCartPage })),
  checkout: async ({ market, region, popups, shoppingCartPage, shippingBillingPage, reviewOrderPage, orderConfirmationPage }, use) =>
    use(new GepCheckoutFlow({ market, region, popups, shoppingCartPage, shippingBillingPage, reviewOrderPage, orderConfirmationPage })),
  orderHistory: async ({ header, popups, myOrdersPage }, use) => use(new GepOrderHistoryFlow({ header, popups, myOrdersPage })),
});

export { expect };
