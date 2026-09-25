import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { time } from 'node:console';

/** Values captured from the first row of the Unplaced Orders tab (Tosca buffers UnplacedOrder*). */
export type UnplacedOrderDetails = {
  createdDate: string;
  shippingAccountNumber: string;
  subtotal: string;
  itemsCount: string;
  lastModifiedDate: string;
};

/** Account Dashboard > Orders (submitted, unplaced and future & recurring orders, order history search). */
export class GepMyOrdersPage extends BasePage {
  // Not in the Tosca export: on UK the Account Dashboard link is inside the collapsed account menu
  get accountMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'Expand account menu' });
  }

  // Not in the Tosca export: UK lists new orders under "Pending Location Orders" until the location is verified
  private get pendingLocationOrdersSection(): Locator {
    return this.page
      .locator('app-submitted-orders')
      .filter({ has: this.page.getByRole('heading', { name: 'Pending Location Orders' }) });
  }

  // Tosca: Click on Account Dashboard > Account Dashboard   | UK: inside the account menu (accountMenuButton)
  get accountDashboardLink(): Locator {
    return this.page.getByRole('link', { name: 'Account Dashboard' });
  }

  // Tosca: Click on Orders > Orders   | UK: Account Dashboard left menu
  get ordersTab(): Locator {
    return this.page.getByRole('menuitem', { name: 'Orders & Returns' });
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

  // Tosca: Orders & Returns > close   | optional overlay on the orders page
  get ordersReturnsPopupCloseButton(): Locator {
    return this.page.getByRole('dialog', { name: 'Orders & Returns' }).getByRole('button', { name: 'close' });
  }

  // Tosca: My Account | My Orders | Search Orders > Search INput box (also " Search the Order")
  get orderHistorySearchInput(): Locator {
    return this.pendingLocationOrdersSection.getByRole('searchbox', { name: 'Search', exact: true });
  }

  // Tosca: My Account | My Orders | Search Orders > search_btn
  get orderHistorySearchButton(): Locator {
    return this.pendingLocationOrdersSection.getByRole('button', { name: 'search-button' });
  }

  // Tosca: Orders > OrderNumberPass in Buffer   | order number link, located by the captured order number
  orderNumberLink(orderNumber: string): Locator {
    return this.page.getByRole('link', { name: orderNumber, exact: true });
  }

  // Tosca: Navigate to My Orders Page   | UK site: header "Orders & Returns" opens My Orders directly
  get headerOrdersAndReturnsButton(): Locator {
    return this.page.getByRole('button', { name: /Orders & Returns/ });
  }

  // Tosca: Orders Page Tab > Unplaced Orders
  get unplacedOrdersTab(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrdersTab', 'Orders Page Tab > Unplaced Orders');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Created Date   | first row of the unplaced orders table
  get unplacedOrderCreatedDateCell(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderCreatedDateCell', 'Unplaced Orders Tab > TBODY > Created Date');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Created By User
  get unplacedOrderCreatedByUserCell(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderCreatedByUserCell', 'Unplaced Orders Tab > TBODY > Created By User');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Shipping Account Number
  get unplacedOrderShippingAccountNumberCell(): Locator {
    return this.todo(
      'GepMyOrdersPage.unplacedOrderShippingAccountNumberCell',
      'Unplaced Orders Tab > TBODY > Shipping Account Number'
    );
  }

  // Tosca: Unplaced Orders Tab > TBODY > Subtotal Value
  get unplacedOrderSubtotalCell(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderSubtotalCell', 'Unplaced Orders Tab > TBODY > Subtotal Value');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Items Count
  get unplacedOrderItemsCountCell(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderItemsCountCell', 'Unplaced Orders Tab > TBODY > Items Count');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Location Address
  get unplacedOrderLocationAddressCell(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderLocationAddressCell', 'Unplaced Orders Tab > TBODY > Location Address');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Last Modified date
  get unplacedOrderLastModifiedDateCell(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderLastModifiedDateCell', 'Unplaced Orders Tab > TBODY > Last Modified date');
  }

  // Tosca: Unplaced Orders Tab > TBODY > View & Modify
  get unplacedOrderViewAndModifyLink(): Locator {
    return this.todo('GepMyOrdersPage.unplacedOrderViewAndModifyLink', 'Unplaced Orders Tab > TBODY > View & Modify');
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

  /** Tosca: Orders Tab > Navigate to My Orders Page (UK: account menu > Account Dashboard > Orders & Returns). */
  async navigateToOrders(): Promise<void> {
    await this.accountMenuButton.click();
    await this.accountDashboardLink.click();
    await expect(this.ordersTab).toBeVisible();
    await this.ordersTab.click();
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

  /** Tosca: Search the Order -My Orders Page. Closes the Orders & Returns overlay first if it is shown. */
  async searchOrderHistory(orderNumber: string): Promise<void> {
    await this.clickIfVisible(this.ordersReturnsPopupCloseButton, 3000);
    await expect(this.orderHistorySearchInput).toBeVisible();
    await this.orderHistorySearchInput.fill(orderNumber);
    await this.orderHistorySearchButton.click();
  }

  /** Tosca: Navigate to viewandtrackmyorders for orderId Buffer. Opens the order's View & Track page. */
  async openOrderViewAndTrack(orderNumber: string): Promise<void> {
    const orderLink = this.orderNumberLink(orderNumber);
    await expect(orderLink).toBeVisible();
    await orderLink.click();
  }

  /** Tosca: Navigate to UnplacedOrders Tab. */
  async openUnplacedOrdersTab(): Promise<void> {
    await expect(this.unplacedOrdersTab).toBeVisible();
    await this.unplacedOrdersTab.click();
  }

  /** Tosca: Validation of UnplacedOrdersTab. Verifies every column of the first row and returns the captured values. */
  async verifyFirstUnplacedOrderDetails(): Promise<UnplacedOrderDetails> {
    const columns = [
      this.unplacedOrderCreatedDateCell,
      this.unplacedOrderCreatedByUserCell,
      this.unplacedOrderShippingAccountNumberCell,
      this.unplacedOrderSubtotalCell,
      this.unplacedOrderItemsCountCell,
      this.unplacedOrderLocationAddressCell,
      this.unplacedOrderLastModifiedDateCell,
      this.unplacedOrderViewAndModifyLink,
    ];
    for (const column of columns) {
      await expect(column).toBeVisible();
    }

    return {
      createdDate: (await this.unplacedOrderCreatedDateCell.innerText()).trim(),
      // Tosca reads OuterText here; innerText is the Playwright equivalent
      shippingAccountNumber: (await this.unplacedOrderShippingAccountNumberCell.innerText()).trim(),
      subtotal: (await this.unplacedOrderSubtotalCell.innerText()).trim(),
      itemsCount: (await this.unplacedOrderItemsCountCell.innerText()).trim(),
      lastModifiedDate: (await this.unplacedOrderLastModifiedDateCell.innerText()).trim(),
    };
  }

  /** Tosca: CLick on View & Modify in UnplacedOrdersTab. Loads the unplaced order back into the cart. */
  async viewAndModifyFirstUnplacedOrder(): Promise<void> {
    await this.unplacedOrderViewAndModifyLink.click();
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
}
