import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/** Optional popups and overlays. Every action is safe to call when the popup is absent. */
export class GEP_Popups extends BasePage {
  // Tosca: Launch popup - confirm button > Confirmar
  get launchConfirmButton(): Locator {
    return this.page.getByRole('button', { name: 'Confirmar' });
  }

  // Tosca: Cookie | AcceptAll > Accept All
  get cookieAcceptAllButton(): Locator {
    return this.page.getByRole('button', { name: 'Accept all' });
  }

  // Tosca: Accept Cookies > Accept All   | may be the same element as cookieAcceptAllButton (unverified)
  get acceptCookiesAllButton(): Locator {
    return this.page.getByRole('button', { name: 'Accept all' });
  }

  // Tosca: Click on Close for Ad > Close icon
  get adPopupCloseIcon(): Locator {
    return this.todo('GEP_Popups.adPopupCloseIcon', 'Click on Close for Ad > Close icon');
  }

  // Tosca: Shopping Cart | Free Item Popup > Continue Without Free Item
  get continueWithoutFreeItemButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue Without Free Item' });
  }

  // Tosca: Shopping Cart | License Skip > DIV > Skip And Complete Later
  get licenseSkipAndCompleteLaterButton(): Locator {
    return this.page.getByText('Skip And Complete Later', { exact: true });
  }

  // Tosca: Controlled Substances Form on Shopping Cart > Confirm Skip
  get controlledSubstancesConfirmSkipButton(): Locator {
    return this.page.getByRole('button', { name: 'Confirm Skip' });
  }

  // Tosca: Close Customer FeedBack survey popup > Close Survey
  get feedbackSurveyCloseButton(): Locator {
    return this.page.getByRole('button', { name: 'Close Survey' }).first();
  }

  // Tosca: Close Customer FeedBack survey popup > Close Survey_1
  get feedbackSurveyCloseAltButton(): Locator {
    return this.page.getByRole('button', { name: 'Close Survey' }).last();
  }

  /** Tosca: FR popup / "Launch popup - confirm button" (Confirmar). */
  async confirmLaunchPopup(): Promise<boolean> {
    return this.clickIfVisible(this.launchConfirmButton);
  }

  /** Tosca: Accept the Cookie. The banner can match either cookie module, so both are tried. */
  async acceptCookies(): Promise<boolean> {
    if (await this.clickIfVisible(this.cookieAcceptAllButton, 10000)) return true;
    return this.clickIfVisible(this.acceptCookiesAllButton);
  }

  /** Tosca: Close the ad popup. */
  async closeAdPopup(): Promise<boolean> {
    return this.clickIfVisible(this.adPopupCloseIcon);
  }

  /** Tosca: Verify Free Item Visible then select. */
  async continueWithoutFreeItem(): Promise<boolean> {
    return this.clickIfVisible(this.continueWithoutFreeItemButton);
  }

  /** Tosca: If- License Popup Displayed. */
  async skipLicense(): Promise<boolean> {
    return this.clickIfVisible(this.licenseSkipAndCompleteLaterButton);
  }

  /** Tosca: Close Controlled Substances Form. */
  async skipControlledSubstancesForm(): Promise<boolean> {
    return this.clickIfVisible(this.controlledSubstancesConfirmSkipButton);
  }

  /** Tosca: Close Customer FeedBack survey popup (GenX order confirmation). */
  async closeFeedbackSurvey(): Promise<boolean> {
    if (await this.clickIfVisible(this.feedbackSurveyCloseAltButton, 3000)) return true;
    return this.clickIfVisible(this.feedbackSurveyCloseButton, 3000);
  }
}
