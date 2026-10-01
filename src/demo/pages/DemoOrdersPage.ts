import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** One order item of My account > Orders, read from its text (Tosca TC04 steps 14-15). */
export type DemoOrder = {
  /** From "Order Number: <value>" */
  orderNumber: string;
  /** From "Order status: <value>" */
  status: string;
  /** From "Order Total: <value>" */
  total: string;
  /** From "Order Date: <value>" (kept for the report evidence) */
  orderDate: string;
};

/** Demo Web Shop "My account - Orders" page at /customer/orders. */
export class DemoOrdersPage extends BasePage {
  // Demo site: page heading "My account - Orders"
  private get ordersHeading(): Locator {
    return this.page.locator('.page-title h1');
  }

  // Tosca TC04 steps 10 and 13: order item in the list   | one block per order: number, status, date, total
  private get orderItems(): Locator {
    return this.page.locator('.order-list .order-item');
  }

  /** Step 9 expected result: My account - Orders is displayed at /customer/orders. */
  async expectDisplayed(): Promise<void> {
    await this.expectUrl(/\/customer\/orders/);
    await this.expectText(this.ordersHeading, 'My account - Orders');
  }

  /** Step 10: the number of order items listed on the page (Tosca buffer OrderCount). */
  async getOrderCount(): Promise<number> {
    return this.countOf(this.orderItems);
  }

  /**
   * Steps 12-15 and 21: reads every order item once (instead of Tosca's counter and existence check).
   * Each value is parsed from the same order item's text, so number, status and total stay on one row.
   */
  async readOrders(): Promise<DemoOrder[]> {
    const count = await this.countOf(this.orderItems);
    const orders: DemoOrder[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.readText(this.orderItems.nth(i));
      orders.push({
        orderNumber: valueAfter(text, 'Order Number'),
        status: valueAfter(text, 'Order status'),
        total: valueAfter(text, 'Order Total'),
        orderDate: valueAfter(text, 'Order Date'),
      });
    }
    return orders;
  }
}

/** The value after "<label>:" on its line, e.g. valueAfter("Order Total: 51.00", "Order Total") → "51.00". */
function valueAfter(text: string, label: string): string {
  const match = text.match(new RegExp(`${label}:\\s*(.+)`, 'i'));
  if (!match) throw new Error(`"${label}:" not found in order item text: ${text.replace(/\s+/g, ' ')}`);
  return match[1].trim();
}
