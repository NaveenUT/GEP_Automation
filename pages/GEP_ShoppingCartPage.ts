import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GEP_Popups } from './GEP_Popups';

/** Mini cart (opened from the header) and the full shopping cart page. */
export class GEP_ShoppingCartPage extends BasePage {
  private readonly popups = new GEP_Popups(this.page);

  // Tosca: Waiton for ItemCode to display > Item code goes here
  get miniCartItemCode(): Locator {
    return this.todo('GEP_ShoppingCartPage.miniCartItemCode', 'Waiton for ItemCode to display > Item code goes here');
  }

  // Tosca: Shopping Cart|GuestCartIcon > View Cart
  get guestViewCartButton(): Locator {
    return this.todo('GEP_ShoppingCartPage.guestViewCartButton', 'Shopping Cart|GuestCartIcon > View Cart');
  }

  // Tosca: Shopping Cart|LoggedInCartIcon > DIV
  get loggedInViewCartButton(): Locator {
    return this.todo('GEP_ShoppingCartPage.loggedInViewCartButton', 'Shopping Cart|LoggedInCartIcon > DIV');
  }

  // Tosca: Shopping Cart | Clear Cart > Clear Cart
  get clearCartButton(): Locator {
    return this.todo('GEP_ShoppingCartPage.clearCartButton', 'Shopping Cart | Clear Cart > Clear Cart');
  }

  // Tosca: Checkout | Proceed to Shipping and billing page > Shipping and billing button
  get proceedToShippingBillingButton(): Locator {
    return this.todo(
      'GEP_ShoppingCartPage.proceedToShippingBillingButton',
      'Checkout | Proceed to Shipping and billing page > Shipping and billing button'
    );
  }

  /** Tosca: Waiton for ItemCode to display. */
  async expectItemInMiniCart(): Promise<void> {
    await expect(this.miniCartItemCode).toBeVisible();
  }

  /** Tosca: Click on Cart Icon > View Cart. Uses the logged-in variant when present, else the guest one. */
  async openCartFromMiniCart(): Promise<void> {
    if (await this.clickIfVisible(this.loggedInViewCartButton, 3000)) return;
    await this.guestViewCartButton.click();
  }

  /** Tosca: Shopping Cart | Clear Cart. */
  async clearCart(): Promise<void> {
    await expect(this.clearCartButton).toBeVisible();
    await this.clearCartButton.click();
  }

  /** Tosca: Navigate to shipping and billing page, including the cart popups. */
  async proceedToShippingAndBilling(): Promise<void> {
    await expect(this.proceedToShippingBillingButton).toBeVisible();
    await this.proceedToShippingBillingButton.click();

    await this.popups.continueWithoutFreeItem();
    // Tosca clicks "Shipping and billing" again after the License / Controlled Substances popups are dismissed.
    if (await this.popups.skipLicense()) {
      await this.proceedToShippingBillingButton.click();
    }
    if (await this.popups.skipControlledSubstancesForm()) {
      await this.proceedToShippingBillingButton.click();
    }
  }
}
