import { Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { escapeRegExp } from '../utils/dataHelpers';

/** Order details ("View & Track"), opened from My Orders: status, reorder and the ordered products. */
export class GepOrderDetailsPage extends BasePage {
  // Tosca: OrderDetails|Reorder > Reorder
  get reorderLink(): Locator {
    return this.page.getByText('Reorder', { exact: true });
  }

  // Tosca: OrderDetails|ReorderConfirmModal > close   | reorder confirmation dialog
  get reorderDialogCloseButton(): Locator {
    return this.page.locator('[data-test-id="view_and_track_my_orders_component_button_1"]');
  }

  // Tosca: Fetch the order status in order details page > Status
  get orderStatusText(): Locator {
    return this.page.locator('[data-test-id="viewAndTrackMyOrders.OrderStatusText18"] + *');
  }

  // Tosca: HenrySchein| My Orders | View&Track > Product In Order Page - Primary UOM   | located by the ordered product ID
  primaryUomForProduct(productId: string): Locator {
    return this.page.locator('.product-summary').filter({ hasText: productId }).locator('[data-test-id="viewAndTrackMyOrders.UomText1"]');
  }

  // Tosca: Validate Presence of Primary&Secondary UOM_Reference > Secondary UOM   | GenY; reusable block not in export
  secondaryUomForProduct(productId: string): Locator {
    return this.todo(
      'GepOrderDetailsPage.secondaryUomForProduct',
      `Validate Presence of Primary&Secondary UOM_Reference > Secondary UOM (${productId})`
    );
  }

  /** Tosca: Click the Reorder link in the order details page, then Close the Reorder Modal. */
  async reorder(): Promise<void> {
    await expect(this.reorderLink).toBeVisible();
    await this.reorderLink.click();
    await expect(this.reorderDialogCloseButton).toBeVisible();
    await this.reorderDialogCloseButton.click();
    await expect(this.reorderDialogCloseButton).toBeHidden();
  }

  /** Tosca: Verify the Status in order details page ({STRINGTOLOWER} on both sides, so case-insensitive). */
  async expectOrderStatus(expectedStatus: string): Promise<void> {
    await expect(this.orderStatusText).toHaveText(new RegExp(`^\\s*${escapeRegExp(expectedStatus.trim())}\\s*$`, 'i'));
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
