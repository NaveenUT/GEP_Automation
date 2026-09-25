import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GepProductDetailPage extends BasePage {
  // Tosca: PDP|QuantityInput > quantity-box   | hint: may be id "quantity-box" (unverified)
  get pdpQuantityInput(): Locator {
    return this.page.locator('[data-test-id="pdp_input_quantityinput"]');
  }

  // Tosca: Add to cart > PDP add to cart (also PDP | Add To Cart > Add To Cart in GEP2-18257)
  get pdpAddToCartButton(): Locator {
    return this.page.locator('[data-test-id="pdp_button_additemtocart"] [data-test-id="pdp_button_addcart"]').first();
  }

  // Tosca: PDP|COMDropdown > Dropdown Required*   | only shown for some products
  get pdpComDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /Required/i });
  }

  // Tosca: Select the dropdown value > users   | first/only COM option (unverified)
  get pdpComUsersOption(): Locator {
    return this.todo('GepProductDetailPage.pdpComUsersOption', 'Select the dropdown value > users');
  }

  // Tosca: Click FixerType > Rapide Fixer   | FR only
  get pdpRapideFixerOption(): Locator {
    return this.todo('GepProductDetailPage.pdpRapideFixerOption', 'Click FixerType > Rapide Fixer');
  }

  // Tosca: Verify the Backorder Modal is displayed > Modal
  get backorderDialog(): Locator {
    return this.page.getByRole('dialog').filter({ hasText: /back ?order/i });
  }

  // Tosca: Click Add to cart in Backorder Modal > Add To Cart
  get backorderDialogAddToCartButton(): Locator {
    return this.backorderDialog.getByRole('button', { name: /Add To (Basket|Cart)/i });
  }

  // Tosca: PDP | Unite   | GenX/GenZ; module has no controls in the export. UK: the first "Unit of measure" button (e.g. Each)
  get uomUnitOption(): Locator {
    return this.page.locator('[data-test-id="pdp_li_uom_value"]').first();
  }

  // Tosca: Verify Price Changes when UOM is changed_Reference > UOM selector   | GenY; reusable block not in export
  get uomSelector(): Locator {
    return this.todo('GepProductDetailPage.uomSelector', 'Verify Price Changes when UOM is changed_Reference > UOM selector');
  }

  // Tosca: Verify Price Changes when UOM is changed_Reference > secondary UOM option   | GenY; reusable block not in export
  get secondaryUomOption(): Locator {
    return this.todo(
      'GepProductDetailPage.secondaryUomOption',
      'Verify Price Changes when UOM is changed_Reference > secondary UOM option'
    );
  }

  // Tosca: Verify Price Changes when UOM is changed_Reference > product price   | GenY; reusable block not in export
  get productPrice(): Locator {
    return this.todo('GepProductDetailPage.productPrice', 'Verify Price Changes when UOM is changed_Reference > product price');
  }

  /** Tosca: PDP|QuantityInput ({BACKSPACE}{SENDKEYS[50]}). */
  async enterQuantity(quantity: number): Promise<void> {
    await expect(this.pdpQuantityInput).toBeVisible();
    await this.pdpQuantityInput.fill(String(quantity));
  }

  /** Tosca: Select the COM value in PDP. Only runs when the COM dropdown exists. */
  async selectComValueIfShown(): Promise<boolean> {
    if (!(await this.isVisibleWithin(this.pdpComDropdown, 3000))) return false;
    await this.pdpComDropdown.click();
    await this.pdpComUsersOption.click();
    return true;
  }

  /** Tosca: If Country is FR > If fixertype exist, click "Rapide Fixer". */
  async selectFixerTypeIfRequired(country: string): Promise<boolean> {
    // Tosca: ValidCountries = FR
    if (country !== 'FR') return false;
    return this.clickIfVisible(this.pdpRapideFixerOption, 3000);
  }

  /** Tosca: Add to cart. */
  async clickAddToCart(): Promise<void> {
    await this.pdpAddToCartButton.click();
  }

  /** Tosca: If "Verify the Backorder Modal is displayed", click Add To Cart in the modal. */
  async confirmBackorderIfShown(): Promise<boolean> {
    if (!(await this.isVisibleWithin(this.backorderDialog, 3000))) return false;
    await this.backorderDialogAddToCartButton.click();
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
