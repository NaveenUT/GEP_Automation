import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GEP_Popups } from './GEP_Popups';

/** Mini cart (opened from the header) and the full shopping cart page. */
export class GEP_ShoppingCartPage extends BasePage {
  private readonly popups = new GEP_Popups(this.page);

  // Tosca: Waiton for ItemCode to display > Item code goes here
  get miniCartItemCode(): Locator {
    return this.page.locator('[data-test-id="cart_textbox_itemcode"]').first();
  }

  // Tosca: Shopping Cart|GuestCartIcon > View Cart
  get guestViewCartButton(): Locator {
    return this.page.getByRole('button', { name: /view (cart|basket)/i });
  }

  // Tosca: Shopping Cart|LoggedInCartIcon > DIV
  get loggedInViewCartButton(): Locator {
    return this.page.getByRole('link', { name: /view (cart|basket)/i });
  }

  // Tosca: Shopping Cart | Clear Cart > Clear Cart
  get clearCartButton(): Locator {
    return this.page.locator('[data-test-id="shoppingCart.RemoveCartText46"]');
  }

  // Tosca: Checkout | Proceed to Shipping and billing page > Shipping and billing button
  get proceedToShippingBillingButton(): Locator {
    return this.page.locator('[data-test-id="cart_button_shippingbilling"]');
  }

  /** Tosca: Waiton for ItemCode to display. */
  async expectItemInMiniCart(): Promise<void> {
    // Reordered items can take a while to show in the cart (seen on UK Dental); reload until they do.
    await expect(async () => {
      if (!(await this.isVisibleWithin(this.miniCartItemCode, 10000))) {
        await this.page.reload();
        await expect(this.miniCartItemCode).toBeVisible({ timeout: 10000 });
      }
    }).toPass({ timeout: 90000 });
  }

  /** Tosca: Click on Cart Icon > View Cart. Uses the logged-in variant when present, else the guest one. */
  async openCartFromMiniCart(): Promise<void> {
    // UK: the cart icon opens the cart page directly, there is no mini cart.
    if (this.page.url().includes('/shoppingcart')) return;
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
    // The first click can be swallowed while the cart is still loading; retry until the page changes.
    await expect(async () => {
      if (!this.page.url().includes('shippingandbilling')) await this.proceedToShippingBillingButton.click();
      await expect(this.page).toHaveURL(/shippingandbilling/, { timeout: 10000 });
    }).toPass({ timeout: 60000 });
  }
}
