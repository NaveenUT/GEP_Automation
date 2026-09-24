import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GepPopups } from './GepPopups';

/** Shopping cart page, plus the mini cart popup used on sites that have one. */
export class GepShoppingCartPage extends BasePage {
  private readonly popups = new GepPopups(this.page);

  // Tosca: Waiton for ItemCode to display > Item code goes here
  get cartItemCodeInput(): Locator {
    return this.page.getByPlaceholder('Item code goes here');
  }

  // Tosca: Shopping Cart|GuestCartIcon > View Cart
  get miniCartGuestViewCartButton(): Locator {
    return this.todo('GepShoppingCartPage.miniCartGuestViewCartButton', 'Shopping Cart|GuestCartIcon > View Cart');
  }

  // Tosca: Shopping Cart|LoggedInCartIcon > DIV
  get miniCartLoggedInViewCartButton(): Locator {
    return this.todo('GepShoppingCartPage.miniCartLoggedInViewCartButton', 'Shopping Cart|LoggedInCartIcon > DIV');
  }

  // Tosca: Shopping Cart | Clear Cart > Clear Cart
  get cartClearBasketLink(): Locator {
    return this.page.locator('[data-test-id="shoppingCart.RemoveCartText46"]');
  }

  // Tosca: Checkout | Proceed to Shipping and billing page > Shipping and billing button
  get cartProceedToShippingBillingButton(): Locator {
    return this.page.locator('[data-test-id="cart_button_shippingbilling"]');
  }

  /** Tosca: Waiton for ItemCode to display (the cart page quick-order box). */
  async expectCartPageLoaded(): Promise<void> {
    await expect(this.cartItemCodeInput).toBeVisible();
  }

  /** Tosca: Click on Cart Icon > View Cart. Uses the logged-in variant when present, else the guest one. */
  async openCartFromMiniCartPopup(): Promise<void> {
    if (await this.clickIfVisible(this.miniCartLoggedInViewCartButton, 3000)) return;
    await this.miniCartGuestViewCartButton.click();
  }

  /** Tosca: Shopping Cart | Clear Cart. */
  async clearCart(): Promise<void> {
    await expect(this.cartClearBasketLink).toBeVisible();
    await this.cartClearBasketLink.click();
    await expect(this.cartClearBasketLink).toBeHidden();
  }

  /** Tosca: Navigate to shipping and billing page, including the cart popups. */
  async proceedToShippingAndBilling(): Promise<void> {
    await expect(this.cartProceedToShippingBillingButton).toBeVisible();
    await this.cartProceedToShippingBillingButton.click();

    await this.popups.continueWithoutFreeItemIfShown();
    // Tosca clicks "Shipping and billing" again after the License / Controlled Substances popups are dismissed.
    if (await this.popups.skipLicenseIfShown()) {
      await this.cartProceedToShippingBillingButton.click();
    }
    if (await this.popups.skipControlledSubstancesIfShown()) {
      await this.cartProceedToShippingBillingButton.click();
    }
  }
}
