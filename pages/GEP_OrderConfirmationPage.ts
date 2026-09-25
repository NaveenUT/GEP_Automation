import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_OrderConfirmationPage extends BasePage {
  // Tosca: Checkout | Order Confirmation > Your order has been submitted !
  get orderSubmittedMessage(): Locator {
    return this.page.getByText(/your order has been submitted/i).first();
  }

  // Tosca: Order Number > Order Number
  get orderNumberText(): Locator {
    return this.page.getByText('Order Number', { exact: true }).locator('xpath=following-sibling::*[1]');
  }

  /** Tosca: Checkout | Order Confirmation (Verify "Your order has been submitted !"). */
  async expectOrderSubmitted(): Promise<void> {
    await expect(this.page).toHaveURL(/orderconfirmation/, { timeout: 60000 });
    await expect(this.orderSubmittedMessage).toBeVisible();
  }

  /** Tosca: FetchOrderNumber in Order Confirmation Page (InnerText -> Ordernumber). */
  async getOrderNumber(): Promise<string> {
    const orderNumber = (await this.orderNumberText.innerText()).trim();
    if (!/\d{5,}/.test(orderNumber)) throw new Error(`Unexpected order number on the confirmation page: "${orderNumber}"`);
    return orderNumber;
  }
}
