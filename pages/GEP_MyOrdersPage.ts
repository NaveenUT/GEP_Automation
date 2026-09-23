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
}
