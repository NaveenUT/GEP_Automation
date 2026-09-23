import { test as base, expect } from '@playwright/test';
import { GEP_HomePage } from '../pages/GEP_HomePage';
import { GEP_LoginPage } from '../pages/GEP_LoginPage';
import { GEP_Popups } from '../pages/GEP_Popups';
import { GEP_SearchResultsPage } from '../pages/GEP_SearchResultsPage';
import { GEP_ProductDetailPage } from '../pages/GEP_ProductDetailPage';
import { GEP_ShoppingCartPage } from '../pages/GEP_ShoppingCartPage';
import { GEP_ShippingBillingPage } from '../pages/GEP_ShippingBillingPage';
import { GEP_ReviewOrderPage } from '../pages/GEP_ReviewOrderPage';
import { GEP_OrderConfirmationPage } from '../pages/GEP_OrderConfirmationPage';
import { GEP_MyOrdersPage } from '../pages/GEP_MyOrdersPage';

type GEPFixtures = {
  homePage: GEP_HomePage;
  loginPage: GEP_LoginPage;
  popups: GEP_Popups;
  searchResultsPage: GEP_SearchResultsPage;
  productDetailPage: GEP_ProductDetailPage;
  shoppingCartPage: GEP_ShoppingCartPage;
  shippingBillingPage: GEP_ShippingBillingPage;
  reviewOrderPage: GEP_ReviewOrderPage;
  orderConfirmationPage: GEP_OrderConfirmationPage;
  myOrdersPage: GEP_MyOrdersPage;
};

/**
 * Page fixtures only construct the page objects. Navigation is done once in the
 * test (homePage.launch), so using several fixtures doesn't reload the site.
 */
export const test = base.extend<GEPFixtures>({
  homePage: async ({ page }, use) => use(new GEP_HomePage(page)),
  loginPage: async ({ page }, use) => use(new GEP_LoginPage(page)),
  popups: async ({ page }, use) => use(new GEP_Popups(page)),
  searchResultsPage: async ({ page }, use) => use(new GEP_SearchResultsPage(page)),
  productDetailPage: async ({ page }, use) => use(new GEP_ProductDetailPage(page)),
  shoppingCartPage: async ({ page }, use) => use(new GEP_ShoppingCartPage(page)),
  shippingBillingPage: async ({ page }, use) => use(new GEP_ShippingBillingPage(page)),
  reviewOrderPage: async ({ page }, use) => use(new GEP_ReviewOrderPage(page)),
  orderConfirmationPage: async ({ page }, use) => use(new GEP_OrderConfirmationPage(page)),
  myOrdersPage: async ({ page }, use) => use(new GEP_MyOrdersPage(page)),
});

export { expect };
