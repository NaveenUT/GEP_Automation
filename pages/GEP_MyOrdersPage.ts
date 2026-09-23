import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Account Dashboard > Orders (submitted orders). */
export class GEP_MyOrdersPage extends BasePage {
  // Tosca: Click on Account Dashboard > Account Dashboard
  get accountDashboardLink(): Locator {
    return this.todo('GEP_MyOrdersPage.accountDashboardLink', 'Click on Account Dashboard > Account Dashboard');
  }

  // Tosca: Click on Orders > Orders
  get ordersTab(): Locator {
    return this.todo('GEP_MyOrdersPage.ordersTab', 'Click on Orders > Orders');
  }

  // Tosca: Orders | Submitted order > Submitted order Search
  get submittedOrderSearchInput(): Locator {
    return this.todo('GEP_MyOrdersPage.submittedOrderSearchInput', 'Orders | Submitted order > Submitted order Search');
  }

  // Tosca: Orders | Submitted order > Submitted order search-button
  get submittedOrderSearchButton(): Locator {
    return this.todo('GEP_MyOrdersPage.submittedOrderSearchButton', 'Orders | Submitted order > Submitted order search-button');
  }

  // Tosca: Orders | Submitted order > Submitted order TABLE > $1 > $1   | row 1, column 1
  get firstRowOrderNumberCell(): Locator {
    return this.todo('GEP_MyOrdersPage.firstRowOrderNumberCell', 'Orders | Submitted order > Submitted order TABLE > $1 > $1');
  }

  // Tosca: Recurring Orders > Future & Recurring
  get futureAndRecurringTab(): Locator {
    return this.todo('GEP_MyOrdersPage.futureAndRecurringTab', 'Recurring Orders > Future & Recurring');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block; its controls are not in the export
  get recurringOrderSearchInput(): Locator {
    return this.todo('GEP_MyOrdersPage.recurringOrderSearchInput', 'Search the Order -RecurringOrderTab_GenZ_Reference > (search input)');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block; its controls are not in the export
  get recurringOrderSearchButton(): Locator {
    return this.todo('GEP_MyOrdersPage.recurringOrderSearchButton', 'Search the Order -RecurringOrderTab_GenZ_Reference > (search button)');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | assumed order number cell in the first result row (unverified)
  get recurringOrderFirstRowOrderNumberCell(): Locator {
    return this.todo(
      'GEP_MyOrdersPage.recurringOrderFirstRowOrderNumberCell',
      'Search the Order -RecurringOrderTab_GenZ_Reference > (results row 1, order number)'
    );
  }

  // Tosca: RecurringOrder|ManageUpcoming > Manage Upcoming
  get manageUpcomingButton(): Locator {
    return this.todo('GEP_MyOrdersPage.manageUpcomingButton', 'RecurringOrder|ManageUpcoming > Manage Upcoming');
  }

  /** Tosca: Orders Tab > Navigate to My Orders Page. */
  async navigateToOrders(): Promise<void> {
    await this.accountDashboardLink.click();
    await expect(this.ordersTab).toBeVisible();
    await this.ordersTab.click();
  }

  /** Tosca: Orders | Submitted order (search). */
  async searchSubmittedOrder(orderNumber: string): Promise<void> {
    await this.submittedOrderSearchInput.fill(orderNumber);
    await this.submittedOrderSearchButton.click();
  }

  /** Tosca: Submitted order TABLE > $1 > $1 (VisibleInnerText == Ordernumber). */
  async expectOrderInFirstRow(orderNumber: string): Promise<void> {
    await expect(this.firstRowOrderNumberCell).toHaveText(orderNumber);
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
    await expect(this.recurringOrderFirstRowOrderNumberCell).toHaveText(orderNumber);
  }

  /** Tosca: Click Manage upcoming CTA (Verify "Manage Upcoming" Exists == True). */
  async expectManageUpcomingVisible(): Promise<void> {
    await expect(this.manageUpcomingButton).toBeVisible();
  }
}
