import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Demo Web Shop My account page ("My account - Customer info") with its side menu. */
export class DemoMyAccountPage extends BasePage {
  // Demo site: page heading, e.g. "My account - Customer info"
  private get myAccountHeading(): Locator {
    return this.page.locator('.page-title h1');
  }

  // Tosca TC04 step 9: Click Orders in the My Account side menu
  private get sideMenuOrdersLink(): Locator {
    return this.page.locator('.block-account-navigation a[href="/customer/orders"]');
  }

  /** Step 8 expected result: the My account page is displayed. */
  async expectDisplayed(): Promise<void> {
    await this.expectUrl(/\/customer\/info/);
    await this.expectText(this.myAccountHeading, /^My account/);
  }

  /** Step 9: Click Orders in the side menu. */
  async openOrders(): Promise<void> {
    await this.click(this.sideMenuOrdersLink);
  }
}
