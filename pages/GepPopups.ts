import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/** Optional popups and overlays. Every action is safe to call when the popup is absent. */
export class GepPopups extends BasePage {
  // Tosca: Launch popup - confirm button > Confirmar
  get launchPopupConfirmButton(): Locator {
    return this.page.getByRole('button', { name: 'Confirmar' });
  }

  // Tosca: Cookie | AcceptAll > Accept All
  get cookieDialogAcceptAllButton(): Locator {
    return this.page.getByRole('dialog', { name: 'Cookie Settings' }).getByRole('button', { name: 'Accept all' });
  }

  // Tosca: Accept Cookies > Accept All   | may be the same element as cookieDialogAcceptAllButton (unverified)
  get cookieAcceptAllFallbackButton(): Locator {
    return this.page.getByRole('button', { name: 'Accept all' });
  }

  // Tosca: Click on Close for Ad > Close icon
  get adPopupCloseIcon(): Locator {
    return this.todo('GepPopups.adPopupCloseIcon', 'Click on Close for Ad > Close icon');
  }

  // Tosca: Shopping Cart | Free Item Popup > Continue Without Free Item
  get freeItemContinueWithoutButton(): Locator {
    return this.page.locator('[data-test-id="expressCheckoutPopup.ContinueWithoutBtnText4"]');
  }

  // Tosca: Shopping Cart | License Skip > DIV > Skip And Complete Later
  get licenseSkipAndCompleteLaterButton(): Locator {
    return this.page.getByRole('button', { name: /Skip And Complete Later/i });
  }

  // Tosca: Controlled Substances Form on Shopping Cart > Confirm Skip
  get controlledSubstancesConfirmSkipButton(): Locator {
    return this.page.getByRole('button', { name: /Confirm Skip/i });
  }

  // Tosca: Close Customer FeedBack survey popup > Close Survey
  get feedbackSurveyCloseButton(): Locator {
    return this.page.getByRole('button', { name: /close survey/i });
  }

  // Tosca: Close Customer FeedBack survey popup > Close Survey_1
  get feedbackSurveyCloseAltButton(): Locator {
    return this.page.getByRole('dialog').filter({ hasText: /survey|feedback/i }).getByRole('button', { name: /close/i });
  }

  /** Tosca: FR popup / "Launch popup - confirm button" (Confirmar). */
  async confirmLaunchPopupIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.launchPopupConfirmButton);
  }

  /** Tosca: Accept the Cookie. The banner can match either cookie module, so both are tried. */
  async acceptCookiesIfShown(): Promise<boolean> {
    if (await this.clickIfVisible(this.cookieDialogAcceptAllButton, 10000)) return true;
    return this.clickIfVisible(this.cookieAcceptAllFallbackButton);
  }

  /** Tosca: Close the ad popup. */
  async closeAdPopupIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.adPopupCloseIcon);
  }

  /** Tosca: Verify Free Item Visible then select. */
  async continueWithoutFreeItemIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.freeItemContinueWithoutButton);
  }

  /** Tosca: If- License Popup Displayed. */
  async skipLicenseIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.licenseSkipAndCompleteLaterButton);
  }

  /** Tosca: Close Controlled Substances Form. */
  async skipControlledSubstancesIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.controlledSubstancesConfirmSkipButton);
  }

  /** Tosca: Close Customer FeedBack survey popup (GenX order confirmation). */
  async closeFeedbackSurveyIfShown(): Promise<boolean> {
    if (await this.clickIfVisible(this.feedbackSurveyCloseAltButton, 3000)) return true;
    return this.clickIfVisible(this.feedbackSurveyCloseButton, 3000);
  }
}
