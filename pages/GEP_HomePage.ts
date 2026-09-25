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

  // Tosca: Header | sign out > IMG   | user menu icon shown when already logged in
  get headerUserMenuIcon(): Locator {
    return this.page.getByRole('button', { name: 'Expand account menu' });
  }

  // Tosca: Header | sign out > Sign Out
  get headerSignOutLink(): Locator {
    return this.page.getByRole('button', { name: 'Sign Out' });
  }

  // Tosca: HomePage | Sign out > Logout
  get logoutButton(): Locator {
    return this.todo('GEP_HomePage.logoutButton', 'HomePage | Sign out > Logout');
  }

  // Tosca: SignIn > Select Browse > Browse   | UK Medical/Dental domain selector
  get domainBrowseButton(): Locator {
    return this.page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: `UK ${config.domain}` })
      .getByRole('link', { name: 'Browse' });
  }

  // Tosca: Header |Cart > cart-icon   | UK: opens the full shopping basket page (no mini cart)
  get cartIcon(): Locator {
    return this.page.getByRole('button', { name: /^cart-icon/ });
  }

  // Tosca: Header | CartItemCount > CartItemCount   | badge is not rendered when the cart is empty
  get cartItemCount(): Locator {
    return this.page.locator('[data-test-id="cart_image_qty"]');
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search input box
  get searchInput(): Locator {
    return this.page.getByPlaceholder("Hello! Let's search together");
  }

  // Tosca: GlobalSepdp_image_notfaviconarch > Search Icon (also "basic-addon2")
  get searchButton(): Locator {
    return this.page.getByRole('navigation', { name: 'Global Search' }).getByRole('button', { name: 'Search', exact: true });
  }

  /** Opens the site and clears the launch popups for the region. Tosca: Precondition-Launch the HS Website */
  async launch(region: Region, country: string, domain: string): Promise<void> {
    await this.setup(region === 'geny' ? withCacheBuster(config.baseUrl) : config.baseUrl);

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
    await this.headerUserMenuIcon.click();
    await expect(this.headerSignOutLink).toBeVisible();
    await this.headerSignOutLink.click();
  }

  /** Tosca: Domain Check for Genx-UK. Click Browse for UK Medical/Dental domains. */
  async selectDomainIfRequired(country: string, domain: string): Promise<void> {
    if (country !== 'UK' || !GEP_HomePage.UK_BROWSE_DOMAINS.includes(domain)) return;
    await this.clickIfVisible(this.domainBrowseButton, 30000);
  }

  /** Tosca: Click on the sign in link on header. */
  async clickSignIn(): Promise<void> {
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
  }

  /** Tosca: Fetch the product count of the shopping cart (CartItemCount). */
  async getCartItemCount(): Promise<number> {
    // The count badge is not rendered when the cart is empty
    if (!(await this.isVisibleWithin(this.cartItemCount))) return 0;
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
