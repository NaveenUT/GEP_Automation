import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { time } from 'node:console';

/** Account Dashboard > Orders (submitted orders). */
export class GepMyOrdersPage extends BasePage {
  // Tosca: Click on Account Dashboard > Account Dashboard   | header "Orders & Returns" / "Order And Returns" button
  get accountDashboardLink(): Locator {
    return this.page.locator('[data-test-id="user_details_component_button_13"]');
  }

  // Tosca: Click on Orders > Orders   | UK site: "Submitted Orders" tab on My Orders
  get submittedOrdersTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_submittedorder"]');
  }

  // Tosca: Orders | Submitted order > Submitted order Search   | the panel renders twice; use the visible one
  get submittedOrdersSearchInput(): Locator {
    return this.page.locator('#submitted-orders-tab-panel [data-test-id="submittedorder_textbox_search"]').filter({ visible: true }).first();
  }

  // Tosca: Orders | Submitted order > Submitted order search-button
  get submittedOrdersSearchButton(): Locator {
    return this.page.locator('#submitted-orders-tab-panel button[aria-label="search-button"]').filter({ visible: true }).first();
  }

  // Tosca: Orders | Submitted order > Submitted order TABLE > $1 > $1   | row 1, column 1, e.g. "WEB04393054"
  get submittedOrdersFirstRowOrderCell(): Locator {
    return this.page
      .locator('#submitted-orders-tab-panel table tr')
      .filter({ has: this.page.locator('td'), visible: true })
      .first()
      .locator('td')
      .first();
  }

  // Tosca: Orders | View&Track > View & Track   | one per order row; the first row is used
  get submittedOrdersViewAndTrackLinks(): Locator {
    return this.page.locator('a[data-test-id="submitted_orders_component_a_13"]:visible');
  }

  // Tosca: Navigate to My Orders Page   | header button: "Orders & Returns" (UK), "Order And Returns" (US)
  get headerOrdersAndReturnsButton(): Locator {
    return this.page.getByRole('button', { name: /Orders? (&|And) Returns/ });
  }

  // First data row of the Future & Recurring results table (the header row has no <td>)
  get futureRecurringFirstRow(): Locator {
    return this.page.locator('#future-recurring-tab-panel table tr').filter({ has: this.page.locator('td') }).first();
  }

  // Tosca: Recurring Orders > Future & Recurring
  get futureRecurringTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_futureandrecurring"]');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block, captured from the live site
  get futureRecurringSearchInput(): Locator {
    return this.page.locator('#future-recurring-tab-panel input[name="searchTerm"]');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | reusable block, captured from the live site
  get futureRecurringSearchButton(): Locator {
    return this.page.locator('#future-recurring-tab-panel #search_btn');
  }

  // Tosca: Search the Order -RecurringOrderTab_GenZ_Reference   | "Order Nickname And #" cell, e.g. "Testorder 03914000"
  get futureRecurringFirstRowOrderCell(): Locator {
    return this.futureRecurringFirstRow.locator('td').first();
  }

  // Tosca: RecurringOrder|ManageUpcoming > Manage Upcoming
  get futureRecurringManageUpcomingLink(): Locator {
    return this.futureRecurringFirstRow.getByText('Manage Upcoming', { exact: true });
  }

  /** Tosca: Orders Tab > Navigate to My Orders Page. */
  async openMyOrdersViaAccountDashboard(): Promise<void> {
    await this.accountDashboardLink.click();
    await expect(this.submittedOrdersTab).toBeVisible();
    await this.submittedOrdersTab.click();
  }

  /** Opens the Submitted Orders tab (UK: after the header "Orders & Returns" button). */
  async openSubmittedOrdersTab(): Promise<void> {
    await expect(this.submittedOrdersTab).toBeVisible();
    await this.submittedOrdersTab.click();
  }

  /** Tosca: Orders | Submitted order (search). */
  async searchSubmittedOrder(orderNumber: string): Promise<void> {
    await this.submittedOrdersSearchInput.fill(orderNumber, { timeout: 5000 });
    const input = this.submittedOrdersSearchInput;
    const placeholder = await input.getAttribute('placeholder');
    console.log(`GepMyOrdersPage.searchSubmittedOrder | input placeholder: ${placeholder}`);
    await this.submittedOrdersSearchButton.click();
  }

  /** Tosca: Submitted order TABLE > $1 > $1 (VisibleInnerText == Ordernumber). */
  async expectSubmittedOrderListed(orderNumber: string): Promise<void> {
    // The table shows a "WEB" prefix (e.g. WEB04393054); the confirmation page may not.
    await expect(this.submittedOrdersFirstRowOrderCell).toContainText(orderNumber);
  }

  /** Tosca: Navigate to My Orders Page, via the header "Orders & Returns" button. */
  async openMyOrdersViaHeader(): Promise<void> {
    await this.headerOrdersAndReturnsButton.click();
  }

  /** Tosca: Navigate to Recurring order Tab (Future & Recurring). */
  async openFutureRecurringTab(): Promise<void> {
    await expect(this.futureRecurringTab).toBeVisible();
    await this.futureRecurringTab.click();
  }

  /** Tosca: Search the Order -RecurringOrderTab_GenZ_Reference (Input = OrderNumber). */
  async searchRecurringOrder(orderNumber: string): Promise<void> {
    await this.futureRecurringSearchInput.fill(orderNumber);
    await this.futureRecurringSearchButton.click();
  }

  /** Verifies the searched order is listed in the Future & Recurring tab. */
  async expectRecurringOrderListed(orderNumber: string): Promise<void> {
    // The cell holds the order nickname and the order number.
    await expect(this.futureRecurringFirstRowOrderCell).toContainText(orderNumber);
  }

  /** Tosca: Click Manage upcoming CTA (Verify "Manage Upcoming" Exists == True). */
  async expectManageUpcomingVisible(): Promise<void> {
    await expect(this.futureRecurringManageUpcomingLink).toBeVisible();
  }

  /** Tosca: My Account | My Orders | Search Orders. A just-submitted order can take a while to be searchable, so reload and retry. */
  async searchSubmittedOrderUntilFound(orderNumber: string): Promise<void> {
    let attempt = 0;
    await expect(async () => {
      if (attempt++ > 0) await this.page.reload();
      await expect(this.submittedOrdersSearchInput).toBeVisible();
      await this.submittedOrdersSearchInput.fill(orderNumber);
      await this.submittedOrdersSearchButton.click();
      await expect(this.submittedOrdersViewAndTrackLinks.first()).toBeVisible({ timeout: 15000 });
    }).toPass({ timeout: 180000 });
  }

  /** Tosca: Click View and Track button in My Account orders section (first order in the list). */
  async openFirstSubmittedOrderDetails(): Promise<void> {
    const firstViewAndTrack = this.submittedOrdersViewAndTrackLinks.first();
    await expect(firstViewAndTrack).toBeVisible();
    await firstViewAndTrack.click();
  }
}
