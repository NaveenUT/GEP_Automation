import { Locator } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class GepSearchResultsPage extends BasePage {
  // Tosca: SRP | Navigate to First Product > Product name
  private get firstResultProductNameText(): Locator {
    return this.page.locator('[data-test-id="product-name"]').first();
  }

  // Tosca: SRP | Navigate to First Product > Product ID
  private get firstResultProductIdText(): Locator {
    return this.page.locator('[data-test-id="srp_listview_text_productid"]').first();
  }

  /** Tosca: SelectProductinGrid SRP | Navigate to PDP. */
  async openProductFromResults(productId: string): Promise<void> {
    await this.expectVisible(this.firstResultProductNameText);

    // Tosca: If Searched with product Id, click the Product ID link
    if (await this.isVisibleWithin(this.firstResultProductIdText, 3000)) {
      await this.click(this.firstResultProductIdText);
      return;
    }

    // Tosca: Else click the product name when its text equals the product ID
    await this.expectText(this.firstResultProductNameText, productId);
    await this.click(this.firstResultProductNameText);
  }
}
