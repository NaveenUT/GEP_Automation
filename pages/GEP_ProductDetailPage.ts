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

  /** Tosca: PDP|QuantityInput ({BACKSPACE}{SENDKEYS[50]}). */
  async setQuantity(quantity: number): Promise<void> {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill(String(quantity));
  }

  /** Tosca: Add to cart. */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
