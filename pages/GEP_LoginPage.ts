import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GEP_LoginPage extends BasePage {
  // Tosca: Enter Valid creditionals > Username
  get usernameInput(): Locator {
    return this.page.locator('[data-test-id="SignInUserNameInput"]');
  }

  // Tosca: Enter Valid creditionals > Password
  get passwordInput(): Locator {
    return this.page.locator('[data-test-id="SignInPasswordInput"]');
  }

  // Tosca: Login | SignIn Button > Sign In
  get signInSubmitButton(): Locator {
    return this.page.locator('[data-test-id="sign-in-button"]');
  }

  // Tosca: Click on the security question > Choose a security question*
  get securityQuestion1Dropdown(): Locator {
    return this.page.getByText('Choose a security question', { exact: false }).first();
  }

  // Tosca: Enter the Answer > Your answer*
  get securityAnswer1Input(): Locator {
    return this.todo('GEP_LoginPage.securityAnswer1Input', 'Enter the Answer > Your answer*');
  }

  // Tosca: Click on the security question > Choose second a security question*
  get securityQuestion2Dropdown(): Locator {
    return this.todo(
      'GEP_LoginPage.securityQuestion2Dropdown',
      'Click on the security question > Choose second a security question*'
    );
  }

  // Tosca: Enter the Answer > Your answer*_1
  get securityAnswer2Input(): Locator {
    return this.todo('GEP_LoginPage.securityAnswer2Input', 'Enter the Answer > Your answer*_1');
  }

  // Tosca: Click on proceed CTA > Proceed
  get securityProceedButton(): Locator {
    return this.todo('GEP_LoginPage.securityProceedButton', 'Click on proceed CTA > Proceed');
  }

  /** Tosca: Enter Username And Password and click login. */
  async login(username: string, password: string): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInSubmitButton.click();
  }

  /** Tosca: If "Choose a security question*" exists, answer both questions and click Proceed. */
  async answerSecurityQuestionsIfShown(answer: string): Promise<boolean> {
    if (!(await this.isVisibleWithin(this.securityQuestion1Dropdown))) return false;

    // Tosca picks the first question in each dropdown by opening it and pressing Enter.
    await this.securityQuestion1Dropdown.click();
    await this.page.keyboard.press('Enter');
    await this.securityAnswer1Input.fill(answer);

    await this.securityQuestion2Dropdown.click();
    await this.page.keyboard.press('Enter');
    // Tosca only clicks "Your answer*_1" without typing; the same answer is entered so Proceed can succeed.
    await this.securityAnswer2Input.fill(answer);

    await this.securityProceedButton.click();
    return true;
  }
}
