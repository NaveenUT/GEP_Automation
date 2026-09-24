import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GepOrderConfirmationPage extends BasePage {
  // Tosca: Checkout | Order Confirmation > Your order has been submitted !
  get orderSubmittedText(): Locator {
    return this.page.getByText(/Your order has been submitted/i).first();
  }

  // Tosca: Order Number > Order Number
  get orderNumberText(): Locator {
    return this.page.locator("//div[@data-test-id='orderconfirmation_span_ordernumber']//following::div[@class='caption1-regular']");
  }

  /** Tosca: Checkout | Order Confirmation (Verify "Your order has been submitted !"). */
  async expectOrderSubmitted(): Promise<void> {
    await expect(this.orderSubmittedText).toBeVisible();
  }

  /** Tosca: FetchOrderNumber in Order Confirmation Page (InnerText -> Ordernumber). */
  async getOrderNumber(): Promise<string> {
    const orderNumber = (await this.orderNumberText.innerText()).trim();
    if (!orderNumber) throw new Error('Order number is empty on the order confirmation page.');
    return orderNumber;
  }
}
