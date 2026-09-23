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

  // Tosca: My Account | My Orders | Search Orders > Search INput box   | may be the same element as submittedOrderSearchInput (unverified)
  get myOrdersSearchInput(): Locator {
    return this.todo('GEP_MyOrdersPage.myOrdersSearchInput', 'My Account | My Orders | Search Orders > Search INput box');
  }

  // Tosca: My Account | My Orders | Search Orders > search_btn   | hint: may be id/class "search_btn" (unverified)
  get myOrdersSearchButton(): Locator {
    return this.todo('GEP_MyOrdersPage.myOrdersSearchButton', 'My Account | My Orders | Search Orders > search_btn');
  }

  // Tosca: Orders | View&Track > View & Track   | one per order row; the first row is used
  get viewAndTrackButtons(): Locator {
    return this.todo('GEP_MyOrdersPage.viewAndTrackButtons', 'Orders | View&Track > View & Track');
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

  /** Tosca: My Account | My Orders | Search Orders (Search INput box + search_btn). */
  async searchOrder(orderNumber: string): Promise<void> {
    await expect(this.myOrdersSearchInput).toBeVisible();
    await this.myOrdersSearchInput.fill(orderNumber);
    await this.myOrdersSearchButton.click();
  }

  /** Tosca: Click View and Track button in My Account orders section (first order in the list). */
  async openFirstOrderDetails(): Promise<void> {
    const firstViewAndTrack = this.viewAndTrackButtons.first();
    await expect(firstViewAndTrack).toBeVisible();
    await firstViewAndTrack.click();
  }

  /** Tosca: Submitted order TABLE > $1 > $1 (VisibleInnerText == Ordernumber). */
  async expectOrderInFirstRow(orderNumber: string): Promise<void> {
    await expect(this.firstRowOrderNumberCell).toHaveText(orderNumber);
  }
}
