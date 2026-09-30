import { Locator } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class GepReviewOrderPage extends BasePage {
  // Tosca: Review Order | SubmitOrder > Submit Your Order
  private get submitYourOrderButton(): Locator {
    return this.page.locator('[data-test-id="reviewOrder.SubmitOrderText27"]');
  }

  /** Tosca: Submit the order from the Order confirmation page. */
  async submitOrder(): Promise<void> {
    await this.expectUrl(/revieworder/, 60000);
    await this.expectVisible(this.submitYourOrderButton);
    await this.click(this.submitYourOrderButton);
  }
}
