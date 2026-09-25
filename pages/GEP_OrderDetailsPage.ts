import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Order Details page, opened with "View & Track" from My Orders. */
export class GEP_OrderDetailsPage extends BasePage {
  // Tosca: OrderDetails|Reorder > Reorder
  get reorderLink(): Locator {
    return this.page.getByText('Reorder', { exact: true });
  }

  // Tosca: OrderDetails|ReorderConfirmModal > close
  get reorderConfirmModalCloseButton(): Locator {
    return this.page.locator('[data-test-id="view_and_track_my_orders_component_button_1"]');
  }

  // Tosca: Fetch the order status in order details page > Status
  get orderStatusText(): Locator {
    return this.page.locator('[data-test-id="viewAndTrackMyOrders.OrderStatusText18"] + *');
  }

  /** Tosca: Click the Reorder link in the order detials page, then Close the Reorder Modal. */
  async reorder(): Promise<void> {
    await expect(this.reorderLink).toBeVisible();
    await this.reorderLink.click();
    await expect(this.reorderConfirmModalCloseButton).toBeVisible();
    await this.reorderConfirmModalCloseButton.click();
    await expect(this.reorderConfirmModalCloseButton).toBeHidden();
  }

  /** Tosca: Verify the Status in order details page ({STRINGTOLOWER} on both sides, so case-insensitive). */
  async expectOrderStatus(expectedStatus: string): Promise<void> {
    await expect(this.orderStatusText).toHaveText(new RegExp(`^\\s*${escapeRegExp(expectedStatus.trim())}\\s*$`, 'i'));
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
