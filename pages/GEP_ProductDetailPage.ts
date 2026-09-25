import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_ProductDetailPage extends BasePage {
  // Tosca: PDP|QuantityInput > quantity-box   | hint: may be id "quantity-box" (unverified)
  get quantityInput(): Locator {
    return this.todo('GEP_ProductDetailPage.quantityInput', 'PDP|QuantityInput > quantity-box');
  }

  // Tosca: Add to cart > PDP add to cart (GEP2-18559 uses PDP | Add To Cart > Add To Cart; same element on UK)
  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add To Basket', exact: true });
  }

  // Tosca: PDP|COMDropdown > Dropdown Required*   | shown only for products that need a COM value
  get comDropdown(): Locator {
    return this.todo('GEP_ProductDetailPage.comDropdown', 'PDP|COMDropdown > Dropdown Required*');
  }

  // Tosca: Select the dropdown value > users   | option inside the COM dropdown
  get comDropdownUsersOption(): Locator {
    return this.todo('GEP_ProductDetailPage.comDropdownUsersOption', 'Select the dropdown value > users');
  }

  // Tosca: Click FixerType > Rapide Fixer   | FR only
  get rapideFixerTypeOption(): Locator {
    return this.todo('GEP_ProductDetailPage.rapideFixerTypeOption', 'Click FixerType > Rapide Fixer');
  }

  // Tosca: Verify the Backorder Modal is displayed > Modal
  get backorderModal(): Locator {
    return this.todo('GEP_ProductDetailPage.backorderModal', 'Verify the Backorder Modal is displayed > Modal');
  }

  // Tosca: Click Add to cart in Backorder Modal > Add To Cart
  get backorderModalAddToCartButton(): Locator {
    return this.todo('GEP_ProductDetailPage.backorderModalAddToCartButton', 'Click Add to cart in Backorder Modal > Add To Cart');
  }

  // Tosca: PDP | Unite   | GenX/GenZ; module has no controls in the export. UK: the first "Unit of measure" button (e.g. Each)
  get uomUnitOption(): Locator {
    return this.page.locator('[data-test-id="pdp_li_uom_value"]').first();
  }

  // Tosca: Verify Price Changes when UOM is changed_Reference > UOM selector   | GenY; reusable block not in export
  get uomSelector(): Locator {
    return this.todo('GEP_ProductDetailPage.uomSelector', 'Verify Price Changes when UOM is changed_Reference > UOM selector');
  }

  // Tosca: Verify Price Changes when UOM is changed_Reference > secondary UOM option   | GenY; reusable block not in export
  get secondaryUomOption(): Locator {
    return this.todo(
      'GEP_ProductDetailPage.secondaryUomOption',
      'Verify Price Changes when UOM is changed_Reference > secondary UOM option'
    );
  }

  // Tosca: Verify Price Changes when UOM is changed_Reference > product price   | GenY; reusable block not in export
  get productPrice(): Locator {
    return this.todo('GEP_ProductDetailPage.productPrice', 'Verify Price Changes when UOM is changed_Reference > product price');
  }

  /** Tosca: PDP|QuantityInput ({BACKSPACE}{SENDKEYS[50]}). */
  async setQuantity(quantity: number): Promise<void> {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill(String(quantity));
  }

  /** Tosca: Add to cart. */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /** Tosca: Select the COM value in PDP. Picks "users" when the required COM dropdown is shown. */
  async selectComValueIfRequired(): Promise<boolean> {
    if (!(await this.clickIfVisible(this.comDropdown, 3000))) return false;
    await this.comDropdownUsersOption.click();
    return true;
  }

  /** Tosca: If Country is FR > If fixertype exist. Selects "Rapide Fixer" when the option is shown. */
  async selectRapideFixerTypeIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.rapideFixerTypeOption, 3000);
  }

  /** Tosca: If the Backorder Modal is displayed, click its Add To Cart. */
  async confirmBackorderModalIfShown(): Promise<boolean> {
    if (!(await this.isVisibleWithin(this.backorderModal, 3000))) return false;
    await this.backorderModalAddToCartButton.click();
    return true;
  }

  /** Tosca: PDP | Unite (GenX/GenZ). Selects the unit UOM before adding to cart. */
  async selectUnitUom(): Promise<void> {
    await expect(this.uomUnitOption).toBeVisible();
    await this.uomUnitOption.click();
  }

  /** Tosca: Verify Price Changes when UOM is changed_Reference (GenY). The price must differ after switching UOM. */
  async verifyPriceChangesWhenUomChanged(): Promise<void> {
    await expect(this.productPrice).toBeVisible();
    const primaryUomPrice = (await this.productPrice.innerText()).trim();

    await this.uomSelector.click();
    await this.secondaryUomOption.click();

    await expect(this.productPrice).not.toHaveText(primaryUomPrice);
  }
}
