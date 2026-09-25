import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GEP_Popups } from './GEP_Popups';
import { config, Region } from '../utils/config';
import { withCacheBuster } from '../utils/dataHelpers';

/** Header, global search and sign in / sign out, available on every page. */
export class GEP_HomePage extends BasePage {
  // Tosca: Domain Check for Genx-UK. Only these domains need "Browse" to be selected.
  private static readonly UK_BROWSE_DOMAINS = ['Medical', 'Dental'];

  private readonly popups = new GEP_Popups(this.page);

  // Tosca: Sign In > Sign In Button
  get signInButton(): Locator {
    return this.page.locator('#sign-in');
  }

  // Tosca: Header | sign out > IMG   | "Hi, <name>" user menu shown when already logged in
  get headerUserMenuIcon(): Locator {
    return this.page.locator('div.user-info');
  }

  // Tosca: Header | sign out > Sign Out   | appears when hovering the user menu
  get headerSignOutLink(): Locator {
    return this.page.locator('button.signOut__link');
  }

  // Tosca: HomePage | Sign out > Logout
  get logoutButton(): Locator {
    return this.todo('GEP_HomePage.logoutButton', 'HomePage | Sign out > Logout');
  }

  // Tosca: SignIn > Select Browse > Browse   | "Browse" link on the "UK <domain>" card of the domain picker popup
  domainBrowseButton(country: string, domain: string): Locator {
    return this.page
      .locator('div.newdomain')
      .filter({ has: this.page.getByText(`${country} ${domain}`, { exact: true }) })
      .locator('a[data-test-id^="selectDomain.BrowseText"]');
  }

  // Tosca: Header |Cart > cart-icon   | hint: may be id "cart-icon" (unverified)
  get cartIcon(): Locator {
    return this.page.locator('[data-test-id="user_details_component_div_10"]');
  }

  // Tosca: Header | CartItemCount > CartItemCount   | hint: may be id/class "CartItemCount" (unverified)
  get cartItemCount(): Locator {
    return this.page.locator('[data-test-id="cart_image_qty"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search input box
  get searchInput(): Locator {
    return this.page.locator('[data-test-id="RecipientUsername"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search Icon (also "basic-addon2")   | hint: may be id "basic-addon2" (unverified)
  get searchButton(): Locator {
    return this.page.locator('#basic-addon2');
  }

  /** Opens the site (BASE_URL unless a URL is given) and clears the launch popups for the region. Tosca: Precondition-Launch the HS Website */
  async launch(region: Region, country: string, domain: string, url: string = config.baseUrl): Promise<void> {
    await this.setup(region === 'geny' ? withCacheBuster(url) : url);

    if (region === 'genz') {
      // Tosca: GenZ > FR popup, then Accept the Cookie
      await this.popups.confirmLaunchPopup();
      await this.popups.acceptCookies();
      return;
    }

    // Tosca: GenX and GenY
    await this.signOutIfLoggedIn();
    await this.popups.acceptCookies();
    // Tosca: "Close the ad popup" is in the Else branch, which only GenY reaches
    if (region === 'geny') await this.popups.closeAdPopup();
    // Tosca: Domain Check for Genx-UK
    if (region === 'genx') await this.selectDomainIfRequired(country, domain);
    await this.signOutIfLoggedIn();
    await this.popups.confirmLaunchPopup();
  }

  /** Tosca: If "Header | sign out > IMG" exists, sign out first so the test starts logged out. */
  async signOutIfLoggedIn(): Promise<void> {
    if (!(await this.isVisibleWithin(this.headerUserMenuIcon, 3000))) return;
    // Clicking the menu opens the dashboard; the Sign Out link only shows on hover.
    await this.headerUserMenuIcon.hover();
    await expect(this.headerSignOutLink).toBeVisible();
    await this.headerSignOutLink.click();
  }

  /** Tosca: Domain Check for Genx-UK. Click Browse on the matching UK Medical/Dental card. */
  async selectDomainIfRequired(country: string, domain: string): Promise<void> {
    if (country !== 'UK' || !GEP_HomePage.UK_BROWSE_DOMAINS.includes(domain)) return;
    await this.clickIfVisible(this.domainBrowseButton(country, domain), 30000);
  }

  /** Tosca: Click on the sign in link on header. */
  async clickSignIn(): Promise<void> {
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
  }

  /** Tosca: Fetch the product count of the shopping cart (CartItemCount). */
  async getCartItemCount(): Promise<number> {
    // The count badge is not rendered when the cart is empty.
    if (!(await this.isVisibleWithin(this.cartItemCount, 5000))) return 0;
    const text = (await this.cartItemCount.innerText()).trim();
    return Number.parseInt(text, 10) || 0;
  }

  /** Tosca: Header |Cart > cart-icon. Opens the mini cart. */
  async openMiniCart(): Promise<void> {
    await expect(this.cartIcon).toBeVisible();
    await this.cartIcon.click();
  }

  /** Tosca: Global Search. */
  async searchProduct(searchTerm: string): Promise<void> {
    await expect(this.searchInput).toBeEnabled();
    await this.searchInput.fill(searchTerm.trim());
    await this.searchButton.click();
  }

  /** Tosca: Post condition > Click on the SignOut (GenZ). */
  async logout(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
    // Tosca: Verify logout Success and Signin Visible
    await expect(this.signInButton).toBeVisible();
  }
}
