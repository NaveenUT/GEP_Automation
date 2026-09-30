import { Page, Locator, expect } from '@playwright/test';

/**
 * Shared helpers for page objects and components. Pages build their actions and checks from these
 * methods instead of calling Playwright directly, so every interaction is written in one place.
 * Locators stay private to each page; only its public methods are used by flows and tests.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Placeholder for a locator that hasn't been captured yet. Run `npm run locators` to list them. */
  protected todo(key: string, toscaRef: string): Locator {
    throw new Error(`Locator not filled yet: ${key} (Tosca: ${toscaRef}). See LOCATORS_TODO.md`);
  }

  // ---------------------------------------------------------------- Optional elements

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

  // ---------------------------------------------------------------- Browser

  /** Opens a URL in the current tab. */
  protected async openUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /** Reloads the current page. */
  protected async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  /** The address of the current page. */
  protected currentUrl(): string {
    return this.page.url();
  }

  /** Presses a key on the keyboard (for example "Enter"), wherever the focus is. */
  protected async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  // ---------------------------------------------------------------- Actions on an element

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async clear(locator: Locator): Promise<void> {
    await locator.clear();
  }

  protected async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  protected async selectOption(locator: Locator, option: { label: string } | { index: number }): Promise<void> {
    await locator.selectOption(option);
  }

  /**
   * Types like a user and leaves the field. fill() alone updated the field on screen but the
   * value was not carried to the next page, so these inputs need key events and a blur.
   */
  protected async typeLikeUser(locator: Locator, value: string): Promise<void> {
    await locator.focus();
    await locator.press('Control+A');
    await locator.press('Delete');
    await locator.pressSequentially(value, { delay: 30 });
    await locator.press('Tab');
    await expect(locator).toHaveValue(value);
  }

  /** The element's visible text, trimmed. */
  protected async readText(locator: Locator): Promise<string> {
    return (await locator.innerText()).trim();
  }

  // ---------------------------------------------------------------- Waits and checks (web-first, they retry)

  protected async expectVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible(timeoutOption(timeout));
  }

  protected async expectHidden(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeHidden(timeoutOption(timeout));
  }

  protected async expectEnabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEnabled(timeoutOption(timeout));
  }

  protected async expectText(locator: Locator, expected: string | RegExp, timeout?: number): Promise<void> {
    await expect(locator).toHaveText(expected, timeoutOption(timeout));
  }

  protected async expectNotText(locator: Locator, unexpected: string | RegExp, timeout?: number): Promise<void> {
    await expect(locator).not.toHaveText(unexpected, timeoutOption(timeout));
  }

  protected async expectContainsText(locator: Locator, expected: string, timeout?: number): Promise<void> {
    await expect(locator).toContainText(expected, timeoutOption(timeout));
  }

  protected async expectValue(locator: Locator, value: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveValue(value, timeoutOption(timeout));
  }

  /** Waits until the page address matches, e.g. /revieworder/. */
  protected async expectUrl(pattern: RegExp, timeout?: number): Promise<void> {
    await expect(this.page).toHaveURL(pattern, timeoutOption(timeout));
  }

  /** Runs the block again (after a short pause) until it passes or the timeout is reached. */
  protected async retryUntilPasses(block: () => Promise<void>, timeout: number): Promise<void> {
    await expect(block).toPass({ timeout });
  }
}

/** Passes a timeout only when one is given, so the configured default applies otherwise. */
function timeoutOption(timeout?: number): { timeout: number } | undefined {
  return timeout === undefined ? undefined : { timeout };
}
