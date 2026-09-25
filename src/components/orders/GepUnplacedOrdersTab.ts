import { Locator, expect } from '@playwright/test';
import { BaseComponent } from '../../core/BaseComponent';

/** Values captured from the first row of the Unplaced Orders tab (Tosca buffers UnplacedOrder*). */
export type UnplacedOrderDetails = {
  createdDate: string;
  shippingAccountNumber: string;
  subtotal: string;
  itemsCount: string;
  lastModifiedDate: string;
};

/** My Orders > Unplaced Orders tab. */
export class GepUnplacedOrdersTab extends BaseComponent {
  protected get root(): Locator {
    return this.page.locator('#unplaced-orders-tab-panel');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Created Date   | first row of the unplaced orders table
  get unplacedOrderCreatedDateCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderCreatedDateCell', 'Unplaced Orders Tab > TBODY > Created Date');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Created By User
  get unplacedOrderCreatedByUserCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderCreatedByUserCell', 'Unplaced Orders Tab > TBODY > Created By User');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Shipping Account Number
  get unplacedOrderShippingAccountNumberCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderShippingAccountNumberCell', 'Unplaced Orders Tab > TBODY > Shipping Account Number');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Subtotal Value
  get unplacedOrderSubtotalCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderSubtotalCell', 'Unplaced Orders Tab > TBODY > Subtotal Value');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Items Count
  get unplacedOrderItemsCountCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderItemsCountCell', 'Unplaced Orders Tab > TBODY > Items Count');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Location Address
  get unplacedOrderLocationAddressCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderLocationAddressCell', 'Unplaced Orders Tab > TBODY > Location Address');
  }

  // Tosca: Unplaced Orders Tab > TBODY > Last Modified date
  get unplacedOrderLastModifiedDateCell(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderLastModifiedDateCell', 'Unplaced Orders Tab > TBODY > Last Modified date');
  }

  // Tosca: Unplaced Orders Tab > TBODY > View & Modify
  get unplacedOrderViewAndModifyLink(): Locator {
    return this.todo('GepUnplacedOrdersTab.unplacedOrderViewAndModifyLink', 'Unplaced Orders Tab > TBODY > View & Modify');
  }

  /** Tosca: Validation of UnplacedOrdersTab. Verifies every column of the first row and returns the captured values. */
  async verifyFirstOrderDetails(): Promise<UnplacedOrderDetails> {
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
  async viewAndModifyFirstOrder(): Promise<void> {
    await this.unplacedOrderViewAndModifyLink.click();
  }
}
