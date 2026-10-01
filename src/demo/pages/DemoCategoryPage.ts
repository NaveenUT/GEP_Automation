import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** A Demo Web Shop category page: product grid with "Display [4|8|12] per page". */
export class DemoCategoryPage extends BasePage {
  // Demo site: category page heading, e.g. "Apparel & Shoes"
  private get categoryHeading(): Locator {
    return this.page.locator('.page-title h1');
  }

  // Tosca TC01 step 6: DisplayBy   | "Display [4|8|12] per page" dropdown
  private get displayPerPageDropdown(): Locator {
    return this.page.locator('#products-pagesize');
  }

  // Demo site: the option currently selected in "Display ... per page"
  private get displayPerPageSelectedOption(): Locator {
    return this.page.locator('#products-pagesize option:checked');
  }

  // Tosca TC01 step 9: product item #{B[ItemCount]}   | one product tile in the grid
  private get productItems(): Locator {
    return this.page.locator('.product-grid .item-box');
  }

  // Tosca TC02 step 8: product #1   | product name link in the grid, found by name and position (1 = first)
  private productTitleLink(productName: string): Locator {
    return this.page.locator('.product-grid .item-box .product-title a', { hasText: productName });
  }

  /** TC02 step 8: clicks the product with this name; `position` picks among products with the same name (1 = first). */
  async openProduct(productName: string, position = 1): Promise<void> {
    await this.click(this.productTitleLink(productName).nth(position - 1));
  }

  /** TC01 step 5 expected result: the category page is open. */
  async expectDisplayed(categoryName: string): Promise<void> {
    await this.expectText(this.categoryHeading, categoryName);
  }

  /** TC01 step 6: chooses "Display <size> per page"; the site reloads the category with ?pagesize=<size>. */
  async selectDisplayPerPage(size: number): Promise<void> {
    await this.selectOption(this.displayPerPageDropdown, { label: String(size) });
  }

  /** TC01 step 7: waits until the page has reloaded with the new size (address and dropdown both show it). */
  async expectDisplayPerPageApplied(size: number): Promise<void> {
    await this.expectUrl(new RegExp(`[?&]pagesize=${size}\\b`));
    await this.expectText(this.displayPerPageSelectedOption, String(size));
  }

  /** TC01 steps 8-9: how many product items the page lists (Tosca counted them with a loop). */
  async getProductCount(): Promise<number> {
    return this.countOf(this.productItems);
  }

  /** TC01 step 9: product item at this position (1 = first) exists on the page. */
  async expectProductAt(position: number): Promise<void> {
    await this.expectVisible(this.productItems.nth(position - 1));
  }

  /** TC01 step 12 (Size 8 / 12): Tosca "Send Keys" to scroll down the page; the End key scrolls to the bottom. */
  async scrollDown(): Promise<void> {
    await this.pressKey('End');
  }

  /** TC01 step 13 (Size 8 / 12): waits until the scroll has settled, i.e. the last product item is on screen. */
  async expectScrolledToLastProduct(): Promise<void> {
    await this.expectInViewport(this.productItems.last());
  }
}
