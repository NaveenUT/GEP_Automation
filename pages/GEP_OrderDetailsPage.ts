import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Order Details page, opened with "View & Track" from My Orders. */
export class GEP_OrderDetailsPage extends BasePage {
  // Tosca: OrderDetails|Reorder > Reorder
  get reorderLink(): Locator {
    return this.todo('GEP_OrderDetailsPage.reorderLink', 'OrderDetails|Reorder > Reorder');
  }

  // Tosca: OrderDetails|ReorderConfirmModal > close
  get reorderConfirmModalCloseButton(): Locator {
    return this.todo('GEP_OrderDetailsPage.reorderConfirmModalCloseButton', 'OrderDetails|ReorderConfirmModal > close');
  }

  // Tosca: Fetch the order status in order details page > Status
  get orderStatusText(): Locator {
    return this.todo('GEP_OrderDetailsPage.orderStatusText', 'Fetch the order status in order details page > Status');
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
