import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GEP_Popups } from './GEP_Popups';

/** Mini cart (opened from the header) and the full shopping cart page. */
export class GEP_ShoppingCartPage extends BasePage {
  private readonly popups = new GEP_Popups(this.page);

  // Tosca: Waiton for ItemCode to display > Item code goes here   | UK: quick-add field on the shopping basket page
  get miniCartItemCode(): Locator {
    return this.page.getByPlaceholder('Item code goes here');
  }

  // Tosca: Shopping Cart|GuestCartIcon > View Cart
  get guestViewCartButton(): Locator {
    return this.todo('GEP_ShoppingCartPage.guestViewCartButton', 'Shopping Cart|GuestCartIcon > View Cart');
  }

  // Tosca: Shopping Cart|LoggedInCartIcon > DIV   | UK: the header cart DIV (role=button), same element as GEP_HomePage.cartIcon
  get loggedInViewCartButton(): Locator {
    return this.page.getByRole('button', { name: /^cart-icon/ });
  }

  // Tosca: Shopping Cart | Clear Cart > Clear Cart
  get clearCartButton(): Locator {
    return this.page.getByText('Clear This Basket', { exact: true });
  }

  // Tosca: Checkout | Proceed to Shipping and billing page > Shipping and billing button
  get proceedToShippingBillingButton(): Locator {
    return this.page.getByRole('button', { name: 'Proceed To Shipping & Billing' });
  }

  // Tosca: Fetch the cart subtotal after new product is added > SubTotal
  get cartSubtotalText(): Locator {
    return this.todo('GEP_ShoppingCartPage.cartSubtotalText', 'Fetch the cart subtotal after new product is added > SubTotal');
  }

  /** Tosca: Fetch the cart subtotal after new product is added (InnerText -> cartAddSubTotal). */
  async getCartSubtotal(): Promise<string> {
    await expect(this.cartSubtotalText).toBeVisible();
    return (await this.cartSubtotalText.innerText()).trim();
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
