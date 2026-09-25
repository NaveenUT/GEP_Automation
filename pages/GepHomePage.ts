import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GepPopups } from './GepPopups';
import { config, Region } from '../utils/config';
import { withCacheBuster } from '../utils/dataHelpers';

/** Header, global search and sign in / sign out, available on every page. */
export class GepHomePage extends BasePage {
  // Tosca: Domain Check for Genx-UK. Only these domains need "Browse" to be selected.
  private static readonly UK_BROWSE_DOMAINS = ['Medical', 'Dental'];

  private readonly popups = new GepPopups(this.page);

  // Tosca: Sign In > Sign In Button
  get headerSignInButton(): Locator {
    return this.page.locator('[data-test-id="user-login-click"]');
  }

  // Tosca: Header | sign out > IMG   | "Hi, <name>" user menu shown when logged in
  get headerAccountMenuButton(): Locator {
    return this.page.locator('div.user-info');
  }

  // Tosca: Header | sign out > Sign Out   | appears when hovering the user menu
  get headerSignOutLink(): Locator {
    return this.page.locator('button.signOut__link');
  }

  // Tosca: HomePage | Sign out > Logout
  get headerLogoutButton(): Locator {
    return this.todo('GepHomePage.headerLogoutButton', 'HomePage | Sign out > Logout');
  }

  // Tosca: SignIn > Select Browse > Browse   | "Browse" link on the "<country> <domain>" card of the domain picker
  domainSelectorBrowseLink(country: string, domain: string): Locator {
    return this.page
      .locator('div.newdomain')
      .filter({ has: this.page.getByText(`${country} ${domain}`, { exact: true }) })
      .locator('a[data-test-id^="selectDomain.BrowseText"]');
  }

  // Tosca: Header |Cart > cart-icon   | hint: may be id "cart-icon" (unverified)
  get headerCartIcon(): Locator {
    return this.page.locator('[data-test-id="cart_image_icon"]');
  }

  // Tosca: Header | CartItemCount > CartItemCount   | hint: may be id/class "CartItemCount" (unverified)
  get headerCartCountText(): Locator {
    return this.page.locator('[data-test-id="cart_image_qty"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search input box
  get headerSearchInput(): Locator {
    return this.page.locator('[data-test-id="RecipientUsername"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search Icon (also "basic-addon2")   | hint: may be id "basic-addon2" (unverified)
  get headerSearchButton(): Locator {
    return this.page.locator('[data-test-id="basic-addon2"]');
  }

  /** Opens the site (BASE_URL unless a URL is given) and clears the launch popups for the region. Tosca: Precondition-Launch the HS Website */
  async launchSite(region: Region, country: string, domain: string, url: string = config.baseUrl): Promise<void> {
    await this.setup(region === 'geny' ? withCacheBuster(url) : url);

    if (region === 'genz') {
      // Tosca: GenZ > FR popup, then Accept the Cookie
      await this.popups.confirmLaunchPopupIfShown();
      await this.popups.acceptCookiesIfShown();
      return;
    }

    // Tosca: GenX and GenY
    await this.signOutIfLoggedIn();
    await this.popups.acceptCookiesIfShown();
    // Tosca: "Close the ad popup" is in the Else branch, which only GenY reaches
    if (region === 'geny') await this.popups.closeAdPopupIfShown();
    // Tosca: Domain Check for Genx-UK
    if (region === 'genx') await this.selectDomainIfRequired(country, domain);
    await this.signOutIfLoggedIn();
    await this.popups.confirmLaunchPopupIfShown();
  }

  /** Tosca: If "Header | sign out > IMG" exists, sign out first so the test starts logged out. */
  async signOutIfLoggedIn(): Promise<void> {
    if (!(await this.isVisibleWithin(this.headerAccountMenuButton, 3000))) return;
    // Clicking the menu opens the dashboard; the Sign Out link only shows on hover.
    await this.headerAccountMenuButton.hover();
    await expect(this.headerSignOutLink).toBeVisible();
    await this.headerSignOutLink.click();
  }

  /** Tosca: Domain Check for Genx-UK. Click Browse on the matching UK Medical/Dental card. */
  async selectDomainIfRequired(country: string, domain: string): Promise<void> {
    if (country !== 'UK' || !GepHomePage.UK_BROWSE_DOMAINS.includes(domain)) return;
    await this.clickIfVisible(this.domainSelectorBrowseLink(country, domain), 30000);
  }

  /** Tosca: Click on the sign in link on header. */
  async clickSignIn(): Promise<void> {
    await expect(this.headerSignInButton).toBeVisible();
    await this.headerSignInButton.click();
  }

  /** Tosca: Fetch the product count of the shopping cart (CartItemCount). */
  async getCartItemCount(): Promise<number> {
    // The count badge is not rendered when the basket is empty.
    if (!(await this.isVisibleWithin(this.headerCartCountText))) return 0;
    const text = (await this.headerCartCountText.innerText()).trim();
    return Number.parseInt(text, 10) || 0;
  }

  /** Waits until login has finished (the account menu replaces the Sign In button). */
  async expectLoggedIn(): Promise<void> {
    await expect(this.headerAccountMenuButton).toBeVisible({ timeout: 60000 });
  }

  /** Waits until the header basket count shows at least one item. */
  async expectCartNotEmpty(): Promise<void> {
    await expect(this.headerCartCountText).toBeVisible();
  }

  /** Tosca: Header |Cart > cart-icon. Opens the cart (UK: goes straight to the shopping cart page; other sites: mini cart). */
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

  /** Tosca: Post condition > Click on the SignOut (GenZ). */
  async logout(): Promise<void> {
    await expect(this.headerLogoutButton).toBeVisible();
    await this.headerLogoutButton.click();
    // Tosca: Verify logout Success and Signin Visible
    await expect(this.headerSignInButton).toBeVisible();
  }
}
