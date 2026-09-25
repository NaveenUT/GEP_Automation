import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** My Orders > View & Track: details of one order, opened from the order history. */
export class GEP_OrderViewAndTrackPage extends BasePage {
  // Tosca: HenrySchein| My Orders | View&Track > Product In Order Page - Primary UOM   | located by the ordered product ID
  primaryUomForProduct(productId: string): Locator {
    return this.page
      .locator('.product-summary')
      .filter({ hasText: productId })
      .locator('[data-test-id="viewAndTrackMyOrders.UomText1"]');
  }

  // Tosca: Validate Presence of Primary&Secondary UOM_Reference > Secondary UOM   | GenY; reusable block not in export
  secondaryUomForProduct(productId: string): Locator {
    return this.todo(
      'GEP_OrderViewAndTrackPage.secondaryUomForProduct',
      `Validate Presence of Primary&Secondary UOM_Reference > Secondary UOM (${productId})`
    );
  }

  /** Tosca: Validate Presence of Primary&Secondary UOM (GenX/GenZ only verify the primary UOM). */
  async expectPrimaryUomDisplayed(productId: string): Promise<void> {
    await expect(this.primaryUomForProduct(productId)).toBeVisible();
  }

  /** Tosca: Validate Presence of Primary&Secondary UOM_Reference (GenY). */
  async expectPrimaryAndSecondaryUomDisplayed(productId: string): Promise<void> {
    await expect(this.primaryUomForProduct(productId)).toBeVisible();
    await expect(this.secondaryUomForProduct(productId)).toBeVisible();
  }
}
