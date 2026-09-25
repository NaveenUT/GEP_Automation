import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GepPopups } from './GepPopups';

/** Shopping cart page, plus the mini cart popup used on sites that have one. */
export class GepShoppingCartPage extends BasePage {
  private readonly popups = new GepPopups(this.page);

  // Tosca: Waiton for ItemCode to display > Item code goes here
  get cartFirstItemCodeText(): Locator {
    return this.page.locator('[data-test-id="cart_textbox_itemcode"]').first();
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
  async expectItemInCart(): Promise<void> {
    // Items (e.g. reordered ones) can take a while to show in the cart; reload until they do.
    await expect(async () => {
      if (!(await this.isVisibleWithin(this.cartFirstItemCodeText, 10000))) {
        await this.page.reload();
        await expect(this.cartFirstItemCodeText).toBeVisible({ timeout: 10000 });
      }
    }).toPass({ timeout: 90000 });
  }

  /** Tosca: Click on Cart Icon > View Cart. Uses the logged-in variant when present, else the guest one. */
  async openCartFromMiniCartPopup(): Promise<void> {
    // UK/US: the cart icon opens the cart page directly, there is no mini cart.
    if (this.page.url().includes('/shoppingcart')) return;
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

    await this.popups.continueInventoryNoticeIfShown();
    await this.popups.continueWithoutFreeItemIfShown();
    // Tosca clicks "Shipping and billing" again after the License / Controlled Substances popups are dismissed.
    if (await this.popups.skipLicenseIfShown()) {
      await this.cartProceedToShippingBillingButton.click();
    }
    if (await this.popups.skipControlledSubstancesIfShown()) {
      await this.cartProceedToShippingBillingButton.click();
    }
    // The first click can be swallowed while the cart is still loading; retry until the page changes.
    await expect(async () => {
      if (!this.page.url().includes('shippingandbilling')) {
        await this.cartProceedToShippingBillingButton.click();
        await this.popups.continueInventoryNoticeIfShown();
      }
      await expect(this.page).toHaveURL(/shippingandbilling/, { timeout: 10000 });
    }).toPass({ timeout: 60000 });
  }
}
