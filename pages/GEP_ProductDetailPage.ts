import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_ProductDetailPage extends BasePage {
  // Tosca: PDP|QuantityInput > quantity-box   | hint: may be id "quantity-box" (unverified)
  get quantityInput(): Locator {
    return this.page.locator('[data-test-id="pdp_input_quantityinput"]');
  }

  // Tosca: Add to cart > PDP add to cart (also PDP | Add To Cart > Add To Cart in GEP2-18257)
  get addToCartButton(): Locator {
    return this.page.locator('[data-test-id="pdp_button_additemtocart"] [data-test-id="pdp_button_addcart"]').first();
  }

  // Tosca: PDP|COMDropdown > Dropdown Required*   | only shown for some products
  get comDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /Required/i });
  }

  // Tosca: Select the dropdown value > users   | first/only COM option (unverified)
  get comDropdownUsersOption(): Locator {
    return this.todo('GEP_ProductDetailPage.comDropdownUsersOption', 'Select the dropdown value > users');
  }

  // Tosca: Click FixerType > Rapide Fixer   | FR only
  get rapideFixerTypeOption(): Locator {
    return this.todo('GEP_ProductDetailPage.rapideFixerTypeOption', 'Click FixerType > Rapide Fixer');
  }

  // Tosca: Verify the Backorder Modal is displayed > Modal
  get backorderModal(): Locator {
    return this.page.getByRole('dialog').filter({ hasText: /back ?order/i });
  }

  // Tosca: Click Add to cart in Backorder Modal > Add To Cart
  get backorderModalAddToCartButton(): Locator {
    return this.backorderModal.getByRole('button', { name: /Add To (Basket|Cart)/i });
  }

  /** Tosca: PDP|QuantityInput ({BACKSPACE}{SENDKEYS[50]}). */
  async setQuantity(quantity: number): Promise<void> {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill(String(quantity));
  }

  /** Tosca: Select the COM value in PDP. Only runs when the COM dropdown exists. */
  async selectComValueIfRequired(): Promise<boolean> {
    if (!(await this.isVisibleWithin(this.comDropdown, 3000))) return false;
    await this.comDropdown.click();
    await this.comDropdownUsersOption.click();
    return true;
  }

  /** Tosca: If Country is FR > If fixertype exist, click "Rapide Fixer". */
  async selectFixerTypeIfRequired(country: string): Promise<boolean> {
    // Tosca: ValidCountries = FR
    if (country !== 'FR') return false;
    return this.clickIfVisible(this.rapideFixerTypeOption, 3000);
  }

  /** Tosca: Add to cart. */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /** Tosca: If "Verify the Backorder Modal is displayed", click Add To Cart in the modal. */
  async confirmBackorderIfShown(): Promise<boolean> {
    if (!(await this.isVisibleWithin(this.backorderModal, 3000))) return false;
    await this.backorderModalAddToCartButton.click();
    return true;
  }
}
