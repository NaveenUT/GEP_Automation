import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GepOrderConfirmationPage extends BasePage {
  // Tosca: Checkout | Order Confirmation > Your order has been submitted !
  get orderSubmittedText(): Locator {
    return this.page.getByText(/Your order has been submitted/i).first();
  }

  // Tosca: Order Number > Order Number
  get orderNumberText(): Locator {
    // following:: matches every later caption1-regular div, so take the first one (the value under the label).
    return this.page.locator("//div[@data-test-id='orderconfirmation_span_ordernumber']//following::div[@class='caption1-regular']").first();
  }

  /** Tosca: Checkout | Order Confirmation (Verify "Your order has been submitted !"). */
  async expectOrderSubmitted(): Promise<void> {
    await expect(this.orderSubmittedText).toBeVisible();
  }

  /** Tosca: FetchOrderNumber in Order Confirmation Page (InnerText -> Ordernumber). */
  async getOrderNumber(): Promise<string> {
    // The value is filled in shortly after the confirmation message appears.
    await expect(this.orderNumberText).toHaveText(/\S/);
    const orderNumber = (await this.orderNumberText.innerText()).trim();
    if (!/\d{5,}/.test(orderNumber)) throw new Error(`Unexpected order number on the confirmation page: "${orderNumber}"`);
    return orderNumber;
  }
}
