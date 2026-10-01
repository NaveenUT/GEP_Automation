import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Demo Web Shop "Thank you" page after an order is confirmed (/checkout/completed). */
export class DemoOrderCompletedPage extends BasePage {
  // Tosca TC03 step 22: Success Message   | "Your order has been successfully processed!"
  private get successMessageText(): Locator {
    return this.page.locator('.order-completed .title');
  }

  // Demo site: "Order number: 1234567" (evidence for the report; not checked by Tosca)
  private get orderNumberText(): Locator {
    return this.page.locator('.order-completed .details li').filter({ hasText: /Order number/i }).first();
  }

  // Tosca TC03 step 22: Continue
  private get continueButton(): Locator {
    return this.page.locator('.order-completed input.order-completed-continue-button');
  }

  /** TC03 step 22: the success message is exactly this text. */
  async expectSuccessMessage(message: string): Promise<void> {
    await this.expectText(this.successMessageText, message);
  }

  /** The new order's number, read from the page. */
  async getOrderNumber(): Promise<string> {
    return (await this.readText(this.orderNumberText)).replace(/\D/g, '');
  }

  /** TC03 step 22: clicks Continue; the site returns to the home page. */
  async clickContinue(): Promise<void> {
    await this.click(this.continueButton);
    // The home page: nothing after the site address.
    await this.expectUrl(/^https?:\/\/[^/]+\/?$/);
  }
}
