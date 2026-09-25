import { test as base, expect } from '@playwright/test';
import { GepHomePage } from '../pages/GepHomePage';
import { GepLoginPage } from '../pages/GepLoginPage';
import { GepPopups } from '../pages/GepPopups';
import { GepSearchResultsPage } from '../pages/GepSearchResultsPage';
import { GepProductDetailPage } from '../pages/GepProductDetailPage';
import { GepShoppingCartPage } from '../pages/GepShoppingCartPage';
import { GepShippingBillingPage } from '../pages/GepShippingBillingPage';
import { GepReviewOrderPage } from '../pages/GepReviewOrderPage';
import { GepOrderConfirmationPage } from '../pages/GepOrderConfirmationPage';
import { GepMyOrdersPage } from '../pages/GepMyOrdersPage';
import { GepOrderViewAndTrackPage } from '../pages/GepOrderViewAndTrackPage';

type GEPFixtures = {
  homePage: GepHomePage;
  loginPage: GepLoginPage;
  popups: GepPopups;
  searchResultsPage: GepSearchResultsPage;
  productDetailPage: GepProductDetailPage;
  shoppingCartPage: GepShoppingCartPage;
  shippingBillingPage: GepShippingBillingPage;
  reviewOrderPage: GepReviewOrderPage;
  orderConfirmationPage: GepOrderConfirmationPage;
  myOrdersPage: GepMyOrdersPage;
  orderViewAndTrackPage: GepOrderViewAndTrackPage;
};

/**
 * Page fixtures only construct the page objects. Navigation is done once in the
 * test (homePage.launch), so using several fixtures doesn't reload the site.
 */
export const test = base.extend<GEPFixtures>({
  homePage: async ({ page }, use) => use(new GepHomePage(page)),
  loginPage: async ({ page }, use) => use(new GepLoginPage(page)),
  popups: async ({ page }, use) => use(new GepPopups(page)),
  searchResultsPage: async ({ page }, use) => use(new GepSearchResultsPage(page)),
  productDetailPage: async ({ page }, use) => use(new GepProductDetailPage(page)),
  shoppingCartPage: async ({ page }, use) => use(new GepShoppingCartPage(page)),
  shippingBillingPage: async ({ page }, use) => use(new GepShippingBillingPage(page)),
  reviewOrderPage: async ({ page }, use) => use(new GepReviewOrderPage(page)),
  orderConfirmationPage: async ({ page }, use) => use(new GepOrderConfirmationPage(page)),
  myOrdersPage: async ({ page }, use) => use(new GepMyOrdersPage(page)),
  orderViewAndTrackPage: async ({ page }, use) => use(new GepOrderViewAndTrackPage(page)),
});

export { expect };
