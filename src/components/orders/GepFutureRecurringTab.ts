import { Locator, expect } from '@playwright/test';
import { BaseComponent } from '../../core/BaseComponent';

/** My Orders > Future & Recurring tab. */
export class GepFutureRecurringTab extends BaseComponent {
  protected get root(): Locator {
    return this.page.locator('#future-recurring-tab-panel');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block, captured from the live site
  get futureRecurringSearchInput(): Locator {
    return this.root.locator('input[name="searchTerm"]');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block, captured from the live site
  get futureRecurringSearchButton(): Locator {
    return this.root.locator('#search_btn');
  }

  // First data row of the results table (the header row has no <td>)
  get futureRecurringFirstRow(): Locator {
    return this.root.locator('table tr').filter({ has: this.page.locator('td') }).first();
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | "Order Nickname And #" cell, e.g. "Testorder 03914000"
  get futureRecurringFirstRowOrderCell(): Locator {
    return this.futureRecurringFirstRow.locator('td').first();
  }

  // Tosca: RecurringOrder|ManageUpcoming > Manage Upcoming
  get futureRecurringManageUpcomingLink(): Locator {
    return this.futureRecurringFirstRow.getByText('Manage Upcoming', { exact: true });
  }

  /** Tosca: Search the Order -RecurringOrderTab_GenZ_Reference (Input = OrderNumber). */
  async searchRecurringOrder(orderNumber: string): Promise<void> {
    await this.futureRecurringSearchInput.fill(orderNumber);
    await this.futureRecurringSearchButton.click();
  }

  /** Verifies the searched order is in the first row (the cell holds the order nickname and number). */
  async expectRecurringOrderListed(orderNumber: string): Promise<void> {
    await expect(this.futureRecurringFirstRowOrderCell).toContainText(orderNumber);
  }

  /** Tosca: Click Manage upcoming CTA (Verify "Manage Upcoming" Exists == True). */
  async expectManageUpcomingVisible(): Promise<void> {
    await expect(this.futureRecurringManageUpcomingLink).toBeVisible();
  }
}
