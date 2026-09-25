import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Values captured from the first row of the Unplaced Orders tab (Tosca buffers UnplacedOrder*). */
export type UnplacedOrderDetails = {
  createdDate: string;
  shippingAccountNumber: string;
  subtotal: string;
  itemsCount: string;
  lastModifiedDate: string;
};

/** Account Dashboard > Orders (submitted orders, unplaced orders and order history search). */
export class GEP_MyOrdersPage extends BasePage {
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

  // Tosca: Click on Account Dashboard > Account Dashboard
  get accountDashboardLink(): Locator {
    return this.page.getByRole('link', { name: 'Account Dashboard' });
  }

  // Tosca: Click on Orders > Orders
  get ordersTab(): Locator {
    return this.page.getByRole('menuitem', { name: 'Orders & Returns' });
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

  // Tosca: Orders Page Tab > Unplaced Orders
  get unplacedOrdersTab(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrdersTab', 'Orders Page Tab > Unplaced Orders');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Created Date   | first row of the unplaced orders table
  get unplacedOrderCreatedDateCell(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderCreatedDateCell', 'Unplaced Orders Tab > TBODY > Created Date');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Created By User
  get unplacedOrderCreatedByUserCell(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderCreatedByUserCell', 'Unplaced Orders Tab > TBODY > Created By User');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Shipping Account Number
  get unplacedOrderShippingAccountNumberCell(): Locator {
    return this.todo(
      'GEP_MyOrdersPage.unplacedOrderShippingAccountNumberCell',
      'Unplaced Orders Tab > TBODY > Shipping Account Number'
    );
  }

  // Tosca: Unplaced Orders Tab > TBODY > Subtotal Value
  get unplacedOrderSubtotalCell(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderSubtotalCell', 'Unplaced Orders Tab > TBODY > Subtotal Value');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Items Count
  get unplacedOrderItemsCountCell(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderItemsCountCell', 'Unplaced Orders Tab > TBODY > Items Count');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Location Address
  get unplacedOrderLocationAddressCell(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderLocationAddressCell', 'Unplaced Orders Tab > TBODY > Location Address');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Last Modified date
  get unplacedOrderLastModifiedDateCell(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderLastModifiedDateCell', 'Unplaced Orders Tab > TBODY > Last Modified date');
  }

  // Tosca: Unplaced Orders Tab > TBODY > View & Modify
  get unplacedOrderViewAndModifyLink(): Locator {
    return this.todo('GEP_MyOrdersPage.unplacedOrderViewAndModifyLink', 'Unplaced Orders Tab > TBODY > View & Modify');
  }

  /** Tosca: Orders Tab > Navigate to My Orders Page. */
  async navigateToOrders(): Promise<void> {
    await this.accountMenuButton.click();
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

  /** Tosca: Search the Order -My Orders Page. Closes the Orders & Returns overlay first if it is shown. */
  async searchOrderHistory(orderNumber: string): Promise<void> {
    await this.clickIfVisible(this.ordersReturnsPopupCloseButton, 3000);
    await expect(this.orderHistorySearchInput).toBeVisible();
    await this.orderHistorySearchInput.fill(orderNumber);
    await this.orderHistorySearchButton.click();
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

  /** Tosca: Navigate to viewandtrackmyorders for orderId Buffer. Opens the order's View & Track page. */
  async openOrderViewAndTrack(orderNumber: string): Promise<void> {
    const orderLink = this.orderNumberLink(orderNumber);
    await expect(orderLink).toBeVisible();
    await orderLink.click();
  }
}
