import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { time } from 'node:console';

/** Account Dashboard > Orders (submitted orders). */
export class GEP_MyOrdersPage extends BasePage {
  // Tosca: Click on Account Dashboard > Account Dashboard
  get accountDashboardLink(): Locator {
    return this.todo('GEP_MyOrdersPage.accountDashboardLink', 'Click on Account Dashboard > Account Dashboard');
  }

  // Tosca: Click on Orders > Orders   | UK site: "Submitted Orders" tab on My Orders
  get ordersTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_submittedorder"]');
  }

  // Tosca: Orders | Submitted order > Submitted order Search   | the panel renders twice; use the visible one
  get submittedOrderSearchInput(): Locator {
    return this.page.locator('#submitted-orders-tab-panel [data-test-id="submittedorder_textbox_search"]').filter({ visible: true }).first();
  }

  // Tosca: Orders | Submitted order > Submitted order search-button
  get submittedOrderSearchButton(): Locator {
    return this.page.locator('#submitted-orders-tab-panel button[aria-label="search-button"]').filter({ visible: true }).first();
  }

  // Tosca: Orders | Submitted order > Submitted order TABLE > $1 > $1   | row 1, column 1, e.g. "WEB04393054"
  get firstRowOrderNumberCell(): Locator {
    return this.page
      .locator('#submitted-orders-tab-panel table tr')
      .filter({ has: this.page.locator('td'), visible: true })
      .first()
      .locator('td')
      .first();
  }

  // Tosca: Navigate to My Orders Page   | UK site: header "Orders & Returns" opens My Orders directly
  get headerOrdersAndReturnsButton(): Locator {
    return this.page.getByRole('button', { name: /Orders & Returns/ });
  }

  // First data row of the Future & Recurring results table (the header row has no <td>)
  get recurringOrderFirstRow(): Locator {
    return this.page.locator('#future-recurring-tab-panel table tr').filter({ has: this.page.locator('td') }).first();
  }

  // Tosca: Recurring Orders > Future & Recurring
  get futureAndRecurringTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_futureandrecurring"]');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block, captured from the live site
  get recurringOrderSearchInput(): Locator {
    return this.page.locator('#future-recurring-tab-panel input[name="searchTerm"]');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block, captured from the live site
  get recurringOrderSearchButton(): Locator {
    return this.page.locator('#future-recurring-tab-panel #search_btn');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | "Order Nickname And #" cell, e.g. "Testorder 03914000"
  get recurringOrderFirstRowOrderNumberCell(): Locator {
    return this.recurringOrderFirstRow.locator('td').first();
  }

  // Tosca: RecurringOrder|ManageUpcoming > Manage Upcoming
  get manageUpcomingButton(): Locator {
    return this.recurringOrderFirstRow.getByText('Manage Upcoming', { exact: true });
  }

  /** Tosca: Orders Tab > Navigate to My Orders Page. */
  async navigateToOrders(): Promise<void> {
    await this.accountDashboardLink.click();
    await expect(this.ordersTab).toBeVisible();
    await this.ordersTab.click();
  }

  /** Opens the Submitted Orders tab (UK: after the header "Orders & Returns" button). */
  async openSubmittedOrdersTab(): Promise<void> {
    await expect(this.ordersTab).toBeVisible();
    await this.ordersTab.click();
  }

  /** Tosca: Orders | Submitted order (search). */
  async searchSubmittedOrder(orderNumber: string): Promise<void> {
    await this.submittedOrderSearchInput.fill(orderNumber, { timeout: 5000 });
    const input = this.submittedOrderSearchInput;
    const placeholder = await input.getAttribute('placeholder');
    console.log(`GEP_MyOrdersPage.searchSubmittedOrder | input placeholder: ${placeholder}`);
    await this.submittedOrderSearchButton.click();
  }

  /** Tosca: Submitted order TABLE > $1 > $1 (VisibleInnerText == Ordernumber). */
  async expectOrderInFirstRow(orderNumber: string): Promise<void> {
    // The table shows a "WEB" prefix (e.g. WEB04393054); the confirmation page may not.
    await expect(this.firstRowOrderNumberCell).toContainText(orderNumber);
  }

  /** Tosca: Navigate to My Orders Page, via the header "Orders & Returns" button. */
  async openMyOrdersFromHeader(): Promise<void> {
    await this.headerOrdersAndReturnsButton.click();
  }

  /** Tosca: Navigate to Recurring order Tab (Future & Recurring). */
  async openFutureAndRecurringTab(): Promise<void> {
    await expect(this.futureAndRecurringTab).toBeVisible();
    await this.futureAndRecurringTab.click();
  }

  /** Tosca: Search the Order -RecurringOrderTab_GenZ_Reference (Input = OrderNumber). */
  async searchRecurringOrder(orderNumber: string): Promise<void> {
    await this.recurringOrderSearchInput.fill(orderNumber);
    await this.recurringOrderSearchButton.click();
  }

  /** Verifies the searched order is listed in the Future & Recurring tab. */
  async expectRecurringOrderInFirstRow(orderNumber: string): Promise<void> {
    // The cell holds the order nickname and the order number.
    await expect(this.recurringOrderFirstRowOrderNumberCell).toContainText(orderNumber);
  }

  /** Tosca: Click Manage upcoming CTA (Verify "Manage Upcoming" Exists == True). */
  async expectManageUpcomingVisible(): Promise<void> {
    await expect(this.manageUpcomingButton).toBeVisible();
  }
}
