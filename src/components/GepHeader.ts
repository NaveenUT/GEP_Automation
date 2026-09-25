import { Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/** Site header, shown on every page: sign in / sign out, global search, cart and Orders & Returns. */
export class GepHeader extends BasePage {
  // Tosca: Sign In > Sign In Button
  get headerSignInButton(): Locator {
    return this.page.locator('[data-test-id="user-login-click"]');
  }

  // Tosca: Header | sign out > IMG   | "Hi, <name>" user menu shown when logged in; hover shows Sign Out
  get headerAccountMenu(): Locator {
    return this.page.locator('div.user-info');
  }

  // "Expand account menu" arrow next to "Hi, <name>" (also only present when logged in)
  get headerAccountMenuExpandButton(): Locator {
    return this.page.getByRole('button', { name: 'Expand account menu' });
  }

  // Tosca: Header | sign out > Sign Out   | appears when hovering the user menu
  get headerSignOutLink(): Locator {
    return this.page.locator('button.signOut__link');
  }

  // Tosca: HomePage | Sign out > Logout   | GenZ only
  get headerLogoutButton(): Locator {
    return this.todo('GepHeader.headerLogoutButton', 'HomePage | Sign out > Logout');
  }

  // Tosca: Header |Cart > cart-icon   | opens the cart page directly on UK/US
  get headerCartIcon(): Locator {
    return this.page.locator('[data-test-id="cart_image_icon"]');
  }

  // Tosca: Header | CartItemCount > CartItemCount   | not rendered when the cart is empty
  get headerCartCountText(): Locator {
    return this.page.locator('[data-test-id="cart_image_qty"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search input box
  get headerSearchInput(): Locator {
    return this.page.locator('[data-test-id="RecipientUsername"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search Icon (also "basic-addon2")
  get headerSearchButton(): Locator {
    return this.page.locator('[data-test-id="basic-addon2"]');
  }

  // Tosca: Navigate to My Orders Page   | "Orders & Returns" (UK), "Order And Returns" (US)
  get headerOrdersAndReturnsButton(): Locator {
    return this.page.getByRole('button', { name: /Orders? (&|And) Returns/ });
  }

  /** Tosca: Click on the sign in link on header. */
  async clickSignIn(): Promise<void> {
    await expect(this.headerSignInButton).toBeVisible();
    await this.headerSignInButton.click();
  }

  /** Waits until login has finished (the account menu replaces the Sign In button). */
  async expectLoggedIn(): Promise<void> {
    await expect(this.headerAccountMenu.or(this.headerAccountMenuExpandButton).first()).toBeVisible({ timeout: 60000 });
  }

  /** Tosca: If "Header | sign out > IMG" exists, sign out first so the test starts logged out. */
  async signOutIfLoggedIn(): Promise<void> {
    if (!(await this.isVisibleWithin(this.headerAccountMenu, 3000))) return;
    // Clicking the menu opens the dashboard; the Sign Out link only shows on hover.
    await this.headerAccountMenu.hover();
    await expect(this.headerSignOutLink).toBeVisible();
    await this.headerSignOutLink.click();
  }

  /** Tosca: Fetch the product count of the shopping cart (CartItemCount). */
  async getCartItemCount(): Promise<number> {
    if (!(await this.isVisibleWithin(this.headerCartCountText))) return 0;
    const text = (await this.headerCartCountText.innerText()).trim();
    return Number.parseInt(text, 10) || 0;
  }

  /** Waits until the header cart count shows at least one item. */
  async expectCartNotEmpty(): Promise<void> {
    await expect(this.headerCartCountText).toBeVisible();
  }

  /** Tosca: Header |Cart > cart-icon. */
  async openCartFromHeader(): Promise<void> {
    await expect(this.headerCartIcon).toBeVisible();
    await this.headerCartIcon.click();
  }

  /** Tosca: Global Search. */
  async searchProduct(searchTerm: string): Promise<void> {
    await expect(this.headerSearchInput).toBeEnabled();
    await this.headerSearchInput.fill(searchTerm.trim());
    await this.headerSearchButton.click();
  }

  /** Opens My Orders with the header "Orders & Returns" button. */
  async openOrdersAndReturns(): Promise<void> {
    await expect(this.headerOrdersAndReturnsButton).toBeVisible();
    await this.headerOrdersAndReturnsButton.click();
  }

  /** Tosca: Post condition > Click on the SignOut (GenZ). */
  async logout(): Promise<void> {
    await expect(this.headerLogoutButton).toBeVisible();
    await this.headerLogoutButton.click();
    // Tosca: Verify logout Success and Signin Visible
    await expect(this.headerSignInButton).toBeVisible();
  }
}
