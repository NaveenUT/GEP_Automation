import { Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { GepSubmittedOrdersTab } from '../components/orders/GepSubmittedOrdersTab';
import { GepUnplacedOrdersTab } from '../components/orders/GepUnplacedOrdersTab';
import { GepFutureRecurringTab } from '../components/orders/GepFutureRecurringTab';

/** My Orders (opened from the header "Orders & Returns"): the order tabs. */
export class GepMyOrdersPage extends BasePage {
  readonly submittedOrders = new GepSubmittedOrdersTab(this.page);
  readonly unplacedOrders = new GepUnplacedOrdersTab(this.page);
  readonly futureRecurringOrders = new GepFutureRecurringTab(this.page);

  // Tosca: Click on Orders > Orders   | "Submitted Orders" tab
  get submittedOrdersTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_submittedorder"]');
  }

  // Tosca: Orders Page Tab > Unplaced Orders
  get unplacedOrdersTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_unplacedorder"]');
  }

  // Tosca: Recurring Orders > Future & Recurring
  get futureRecurringTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_futureandrecurring"]');
  }

  /** Opens the Submitted Orders tab. */
  async openSubmittedOrdersTab(): Promise<void> {
    await expect(this.submittedOrdersTab).toBeVisible();
    await this.submittedOrdersTab.click();
  }

  /** Tosca: Navigate to UnplacedOrders Tab. */
  async openUnplacedOrdersTab(): Promise<void> {
    await expect(this.unplacedOrdersTab).toBeVisible();
    await this.unplacedOrdersTab.click();
  }

  /** Tosca: Navigate to Recurring order Tab (Future & Recurring). */
  async openFutureRecurringTab(): Promise<void> {
    await expect(this.futureRecurringTab).toBeVisible();
    await this.futureRecurringTab.click();
  }
}
