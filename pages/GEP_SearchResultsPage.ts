import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_SearchResultsPage extends BasePage {
  // Tosca: SRP | Navigate to First Product > Product name
  get firstProductName(): Locator {
    return this.page.locator('[data-test-id="product-name"]').first();
  }

  // Tosca: SRP | Navigate to First Product > Product ID
  get firstProductId(): Locator {
    return this.page.locator('[data-test-id="srp_listview_text_productid"]').first();
  }

  /** Tosca: SelectProductinGrid SRP | Navigate to PDP. */
  async openProduct(productId: string): Promise<void> {
    await expect(this.firstProductName).toBeVisible();

    // Tosca: If Searched with product Id, click the Product ID link
    if (await this.isVisibleWithin(this.firstProductId, 3000)) {
      await this.firstProductId.click();
      return;
    }

    // Tosca: Else click the product name when its text equals the product ID
    await expect(this.firstProductName).toHaveText(productId);
    await this.firstProductName.click();
  }
}
