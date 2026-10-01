import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Demo Web Shop header, shown on every page: Log in / Log out and the account link. */
export class DemoHeader extends BasePage {
  // Tosca TC04 step 2: Click Log in in the account menu   | "Log in" link in the header
  private get headerLoginLink(): Locator {
    return this.page.locator('.header-links .ico-login');
  }

  // Tosca TC04 steps 6 and 8: account link   | shows the logged-in user's email, opens My account
  private get headerAccountLink(): Locator {
    return this.page.locator('.header-links .account');
  }

  // Tosca TC04 step 26: Click Log out
  private get headerLogoutLink(): Locator {
    return this.page.locator('.header-links .ico-logout');
  }

  // Tosca TC01 step 5: Product Categories   | top menu category, found by its URL (the menu shows names in capitals)
  private topMenuCategoryLink(categorySlug: string): Locator {
    return this.page.locator(`.top-menu > li > a[href="/${categorySlug}"]`);
  }

  /** Step 2: Click Log in in the account menu. */
  async clickLogin(): Promise<void> {
    await this.expectVisible(this.headerLoginLink);
    await this.click(this.headerLoginLink);
  }

  /** Step 6: after login, the account link in the header is present and shows the user's email. */
  async expectLoggedInAs(email: string): Promise<void> {
    await this.expectText(this.headerAccountLink, email);
  }

  /** Step 8: Click the account link in the header. */
  async openMyAccount(): Promise<void> {
    await this.click(this.headerAccountLink);
  }

  // Tosca TC03 step 11: shopping cart   | "Shopping cart (n)" link in the header
  private get headerShoppingCartLink(): Locator {
    return this.page.locator('.header-links .ico-cart');
  }

  // Tosca TC03 step 9 result: green bar "The product has been added to your shopping cart"
  private get barNotificationText(): Locator {
    return this.page.locator('#bar-notification .content');
  }

  /** TC03 step 11: Click on Shopping cart link; the shopping cart page opens. */
  async openShoppingCart(): Promise<void> {
    await this.click(this.headerShoppingCartLink);
    await this.expectUrl(/\/cart/);
  }

  /** TC03 step 9 result: the "added to your shopping cart" bar is shown. */
  async expectAddedToCartNotification(): Promise<void> {
    await this.expectText(this.barNotificationText, /added to your shopping cart/i);
  }

  /** TC01 step 5: opens a category from the top menu, e.g. "apparel-shoes" (APPAREL & SHOES). */
  async openCategory(categorySlug: string): Promise<void> {
    await this.click(this.topMenuCategoryLink(categorySlug));
    await this.expectUrl(new RegExp(`/${categorySlug}`));
  }

  /** Step 26: Click Log out; the user is back on the public site ("Log in" shows again). */
  async logout(): Promise<void> {
    await this.click(this.headerLogoutLink);
    await this.expectVisible(this.headerLoginLink);
  }
}
