import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Account Dashboard > Orders (submitted orders). */
export class GEP_MyOrdersPage extends BasePage {
  // Tosca: Click on Account Dashboard > Account Dashboard
  get accountDashboardLink(): Locator {
    return this.page.locator('[data-test-id="user_details_component_button_13"]');
  }

  // Tosca: Click on Orders > Orders
  get ordersTab(): Locator {
    return this.page.locator('[data-test-id="orders_tab_submittedorder"]');
  }

  // Tosca: Orders | Submitted order > Submitted order Search
  get submittedOrderSearchInput(): Locator {
    return this.page.locator('[data-test-id="submittedorder_textbox_search"]:visible').first();
  }

  // Tosca: Orders | Submitted order > Submitted order search-button
  get submittedOrderSearchButton(): Locator {
    return this.page.locator('[id^="search_btn_submitted_order"]:visible').first();
  }

  // Tosca: Orders | Submitted order > Submitted order TABLE > $1 > $1   | row 1, column 1
  get firstRowOrderNumberCell(): Locator {
    return this.page.locator('a[data-test-id="submitted_orders_component_a_34"]:visible').first();
  }

  // Tosca: My Account | My Orders | Search Orders > Search INput box   | may be the same element as submittedOrderSearchInput (unverified)
  get myOrdersSearchInput(): Locator {
    return this.page.locator('[data-test-id="submittedorder_textbox_search"]:visible').first();
  }

  // Tosca: My Account | My Orders | Search Orders > search_btn   | hint: may be id/class "search_btn" (unverified)
  get myOrdersSearchButton(): Locator {
    return this.page.locator('[id^="search_btn_submitted_order"]:visible').first();
  }

  // Tosca: Orders | View&Track > View & Track   | one per order row; the first row is used
  get viewAndTrackButtons(): Locator {
    return this.page.locator('a[data-test-id="submitted_orders_component_a_13"]:visible');
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
    // A just-submitted order can take a while to become searchable; reload and search again until it appears.
    let attempt = 0;
    await expect(async () => {
      if (attempt++ > 0) await this.page.reload();
      await expect(this.myOrdersSearchInput).toBeVisible();
      await this.myOrdersSearchInput.fill(orderNumber);
      await this.myOrdersSearchButton.click();
      await expect(this.viewAndTrackButtons.first()).toBeVisible({ timeout: 15000 });
    }).toPass({ timeout: 180000 });
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
