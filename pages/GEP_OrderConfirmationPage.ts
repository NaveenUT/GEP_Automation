import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_OrderConfirmationPage extends BasePage {
  // Tosca: Checkout | Order Confirmation > Your order has been submitted !
  get orderSubmittedMessage(): Locator {
    return this.page.getByRole('heading', { name: 'Your Order Has Been Submitted!' });
  }

  // Tosca: Order Number > Order Number
  get orderNumberText(): Locator {
    return this.page.locator('[data-test-id="orderconfirmation_span_ordernumber"] + div');
  }

  /** Tosca: Checkout | Order Confirmation (Verify "Your order has been submitted !"). */
  async expectOrderSubmitted(): Promise<void> {
    await expect(this.orderSubmittedMessage).toBeVisible();
  }

  /** Tosca: FetchOrderNumber in Order Confirmation Page (InnerText -> Ordernumber). */
  async getOrderNumber(): Promise<string> {
    const orderNumber = (await this.orderNumberText.innerText()).trim();
    if (!orderNumber) throw new Error('Order number is empty on the order confirmation page.');
    return orderNumber;
  }
}
