import { Page, Locator } from '@playwright/test';
import { config } from '../utils/config';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigates to BASE_URL, or to the given URL. */
  async setup(url: string = config.baseUrl): Promise<void> {
    if (!url) {
      throw new Error('BASE_URL is not set. Add it to .env (see .env.example).');
    }
    await this.page.goto(url);
  }

  /** Placeholder for a locator that hasn't been captured yet. Replace it in fill mode. */
  protected todo(key: string, toscaRef: string): Locator {
    throw new Error(`Locator not filled yet: ${key} (Tosca: ${toscaRef}). See LOCATORS_TODO.md`);
  }

  /** True if the element becomes visible within the timeout. */
  protected async isVisibleWithin(locator: Locator, timeout = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /** For optional popups: click only if the element appears within the timeout. */
  protected async clickIfVisible(locator: Locator, timeout = 5000): Promise<boolean> {
    if (!(await this.isVisibleWithin(locator, timeout))) return false;
    await locator.click();
    return true;
  }
}
