import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/** Optional popups and overlays. Every action is safe to call when the popup is absent. */
export class GEP_Popups extends BasePage {
  // Tosca: Launch popup - confirm button > Confirmar
  // Not shown on the UK site; text-based and unverified for other countries.
  get launchConfirmButton(): Locator {
    return this.page.getByRole('button', { name: 'Confirmar', exact: true });
  }

  // Tosca: Cookie | AcceptAll > Accept All
  get cookieAcceptAllButton(): Locator {
    return this.page.getByTestId('uc-accept-all-button');
  }

  // Tosca: Accept Cookies > Accept All   | fallback if the banner has no data-testid
  get acceptCookiesAllButton(): Locator {
    return this.page.getByRole('button', { name: /^accept all$/i });
  }

  // Tosca: Click on Close for Ad > Close icon
  get adPopupCloseIcon(): Locator {
    return this.todo('GEP_Popups.adPopupCloseIcon', 'Click on Close for Ad > Close icon');
  }

  // Tosca: Shopping Cart | Free Item Popup > Continue Without Free Item
  get continueWithoutFreeItemButton(): Locator {
    return this.page.getByRole('button', { name: /continue without free item/i });
  }

  // US: "Important: The total shown may not include all applicable charges..." after Proceed To Shipping & Billing
  get inventoryWarehouseContinueButton(): Locator {
    return this.page.locator('[data-test-id="inventoryWHPopup.ContinueWithoutBtnText"]');
  }

  // Tosca: Shopping Cart | License Skip > DIV > Skip And Complete Later
  get licenseSkipAndCompleteLaterButton(): Locator {
    return this.page.getByText(/skip and complete later/i);
  }

  // Tosca: Controlled Substances Form on Shopping Cart > Confirm Skip
  get controlledSubstancesConfirmSkipButton(): Locator {
    return this.page.getByRole('button', { name: /confirm skip/i });
  }

  // Tosca: Close Customer FeedBack survey popup > Close Survey
  get feedbackSurveyCloseButton(): Locator {
    return this.page.getByRole('button', { name: /close survey/i });
  }

  // Tosca: Close Customer FeedBack survey popup > Close Survey_1
  get feedbackSurveyCloseAltButton(): Locator {
    return this.page.locator('[aria-label="Close Survey" i], [title="Close Survey" i]');
  }

  // Tosca: Orders & Returns > close   | overlay on the My Orders page
  get ordersAndReturnsCloseButton(): Locator {
    return this.page.locator('ngb-modal-window').getByRole('button', { name: /close/i });
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

  /** US: Continue past the "Important" extra-charges popup. */
  async continueInventoryWarehousePopup(): Promise<boolean> {
    return this.clickIfVisible(this.inventoryWarehouseContinueButton);
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

  /** Tosca: Search the Order -My Orders Page > If "Orders & Returns" close is visible, click it. */
  async closeOrdersAndReturnsPopup(): Promise<boolean> {
    return this.clickIfVisible(this.ordersAndReturnsCloseButton, 3000);
  }
}
