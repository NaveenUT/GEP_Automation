import { Page, Locator } from '@playwright/test';

/** Shared helpers for page objects and components. */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Placeholder for a locator that hasn't been captured yet. Run `npm run locators` to list them. */
  protected todo(key: string, toscaRef: string): Locator {
    throw new Error(`Locator not filled yet: ${key} (Tosca: ${toscaRef}). See LOCATORS_TODO.md`);
  }

  /**
   * True if the element becomes visible within the timeout. Polls isVisible() instead of
   * waitFor() so an absent optional element isn't logged as an error step in the reports.
   */
  protected async isVisibleWithin(locator: Locator, timeout = 5000): Promise<boolean> {
    const deadline = Date.now() + timeout;
    do {
      if (await locator.first().isVisible()) return true;
      await this.page.waitForTimeout(250);
    } while (Date.now() < deadline);
    return false;
  }

  /** For optional popups: click only if the element appears within the timeout. */
  protected async clickIfVisible(locator: Locator, timeout = 5000): Promise<boolean> {
    if (!(await this.isVisibleWithin(locator, timeout))) return false;
    await locator.first().click();
    return true;
  }
}
