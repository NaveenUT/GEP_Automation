import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Demo Web Shop "Welcome, Please Sign In!" page. */
export class DemoLoginPage extends BasePage {
  // Demo site: login page heading "Welcome, Please Sign In!"
  private get loginPageHeading(): Locator {
    return this.page.locator('.page-title h1');
  }

  // Tosca TC04 step 3: Enter the email address   | {PL[Email]}
  private get loginEmailInput(): Locator {
    return this.page.locator('#Email');
  }

  // Tosca TC04 step 4: Enter the password   | {PL[Password]}
  private get loginPasswordInput(): Locator {
    return this.page.locator('#Password');
  }

  // Tosca TC04 step 5: Click Log in
  private get loginSubmitButton(): Locator {
    return this.page.locator('input.login-button');
  }

  /** Step 2 expected result: the login page is displayed. */
  async expectDisplayed(): Promise<void> {
    await this.expectUrl(/\/login/);
    await this.expectText(this.loginPageHeading, 'Welcome, Please Sign In!');
  }

  /** Step 3: Enter the email address. */
  async enterEmail(email: string): Promise<void> {
    await this.fill(this.loginEmailInput, email);
    await this.expectValue(this.loginEmailInput, email);
  }

  /** Step 4: Enter the password (the field masks it). */
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.loginPasswordInput, password);
  }

  /** Step 5: Click Log in. */
  async submit(): Promise<void> {
    await this.click(this.loginSubmitButton);
  }
}
