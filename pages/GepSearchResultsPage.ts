import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GepSearchResultsPage extends BasePage {
  // Tosca: SRP | Navigate to First Product > Product name
  get firstResultProductNameText(): Locator {
    return this.page.locator('[data-test-id="product-name"]').first();
  }

  // Tosca: SRP | Navigate to First Product > Product ID
  get firstResultProductIdText(): Locator {
    return this.page.locator('[data-test-id="srp_listview_text_productid"]').first();
  }

  /** Tosca: SelectProductinGrid SRP | Navigate to PDP. */
  async openProductFromResults(productId: string): Promise<void> {
    await expect(this.firstResultProductNameText).toBeVisible();

    // Tosca: If Searched with product Id, click the Product ID link
    if (await this.isVisibleWithin(this.firstResultProductIdText, 3000)) {
      await this.firstResultProductIdText.click();
      return;
    }

    // Tosca: Else click the product name when its text equals the product ID
    await expect(this.firstResultProductNameText).toHaveText(productId);
    await this.firstResultProductNameText.click();
  }
}
