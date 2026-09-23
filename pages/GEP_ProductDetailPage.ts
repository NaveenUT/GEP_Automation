import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_ProductDetailPage extends BasePage {
  // Tosca: PDP|QuantityInput > quantity-box   | hint: may be id "quantity-box" (unverified)
  get quantityInput(): Locator {
    return this.todo('GEP_ProductDetailPage.quantityInput', 'PDP|QuantityInput > quantity-box');
  }

  // Tosca: Add to cart > PDP add to cart
  get addToCartButton(): Locator {
    return this.todo('GEP_ProductDetailPage.addToCartButton', 'Add to cart > PDP add to cart');
  }

  // Tosca: PDP | Unite   | GenX/GenZ; module has no controls in the export, likely the "Unit" UOM option (unverified)
  get uomUnitOption(): Locator {
    return this.todo('GEP_ProductDetailPage.uomUnitOption', 'PDP | Unite');
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
