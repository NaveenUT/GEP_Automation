import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Demo Web Shop shopping cart page. */
export class DemoCartPage extends BasePage {
  // Tosca TC03 step 12: Shopping Cart > #1 > Remove   | "Remove" checkbox of each cart row
  private get cartRowRemoveCheckboxes(): Locator {
    return this.page.locator('.cart input[name="removefromcart"]');
  }

  // Tosca TC03 step 12: Agree Terms   | "I agree with the terms of service" checkbox
  private get termsOfServiceCheckbox(): Locator {
    return this.page.locator('#termsofservice');
  }

  // Tosca TC03 step 12: Checkout
  private get checkoutButton(): Locator {
    return this.page.locator('#checkout');
  }

  /**
   * TC03 step 12 (Perform Checkout): selects cart row `rowPosition` (Tosca #1), clicks its Remove control,
   * sets Agree Terms = True and clicks Checkout. Ticking Remove does not remove the row unless the cart is
   * updated, so the checkout still contains the product (as in the Tosca run).
   */
  async performCheckout(rowPosition = 1): Promise<void> {
    await this.click(this.cartRowRemoveCheckboxes.nth(rowPosition - 1));
    await this.check(this.termsOfServiceCheckbox);
    await this.click(this.checkoutButton);
    await this.expectUrl(/onepagecheckout/);
  }
}
