import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_ReviewOrderPage extends BasePage {
  // Tosca: Review Order | SubmitOrder > Submit Your Order
  get submitYourOrderButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit Your Order' });
  }

  /** Tosca: Submit the order from the Order confirmation page. */
  async submitOrder(): Promise<void> {
    await expect(this.submitYourOrderButton).toBeVisible();
    await this.submitYourOrderButton.click();
  }
}
