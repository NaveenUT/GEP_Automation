import { Download, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Demo Web Shop product detail page. */
export class DemoProductPage extends BasePage {
  // Tosca TC02 step 10: Title   | product name heading on the product page
  private get productNameHeading(): Locator {
    return this.page.locator('.product-essential h1');
  }

  // Tosca TC02 step 10: DOWNLOAD SAMPLE   | link of a downloadable product, e.g. /download/sample/51
  private get downloadSampleLink(): Locator {
    return this.page.locator('.product-essential .download-sample a');
  }

  // Tosca TC03 step 9: Add to Cart #1   | "Add to cart" button on the product page (the first one)
  private get addToCartButtons(): Locator {
    return this.page.locator('.product-essential input.add-to-cart-button');
  }

  /** TC03 step 9: clicks "Add to cart"; `position` picks the button (1 = first, Tosca #1). */
  async addToCart(position = 1): Promise<void> {
    await this.click(this.addToCartButtons.nth(position - 1));
  }

  /** TC02 step 8 expected result: a product detail page is open. */
  async expectDisplayed(): Promise<void> {
    await this.expectVisible(this.productNameHeading);
  }

  /** TC02 step 10: the product title is exactly this name. */
  async expectProductName(productName: string): Promise<void> {
    await this.expectText(this.productNameHeading, productName);
  }

  /** TC02 step 10: clicks DOWNLOAD SAMPLE and returns the started download (Tosca could not observe it). */
  async downloadSample(): Promise<Download> {
    return this.clickAndWaitForDownload(this.downloadSampleLink);
  }
}
