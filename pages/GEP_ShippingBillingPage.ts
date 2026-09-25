import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Region } from '../utils/config';
import { randomDigits } from '../utils/dataHelpers';

export class GEP_ShippingBillingPage extends BasePage {
  // Tosca: GenX|Shipping & Billing | Payment method > downward arrow
  get genXPaymentMethodArrow(): Locator {
    return this.page.locator('mat-select[formcontrolname="paymentformcontrolvalue"]');
  }

  // Tosca: GenX|Shipping & Billing | Payment method > Bill on Account
  get genXBillOnAccountOption(): Locator {
    return this.page.getByRole('option', { name: 'Bill On Account' });
  }

  // Tosca: Shipping & Billing chose Payment > downward arrow
  get genYPaymentMethodArrow(): Locator {
    return this.todo('GEP_ShippingBillingPage.genYPaymentMethodArrow', 'Shipping & Billing chose Payment > downward arrow');
  }

  // Tosca: Shipping & Billing chose Payment > Bill on Account_GenY
  get genYBillOnAccountOption(): Locator {
    return this.todo('GEP_ShippingBillingPage.genYBillOnAccountOption', 'Shipping & Billing chose Payment > Bill on Account_GenY');
  }

  // Tosca: IT Payment method / Select 1st payment method > Payment method   | GenZ; assumed to be a native <select> (unverified)
  get genZPaymentMethodSelect(): Locator {
    return this.todo('GEP_ShippingBillingPage.genZPaymentMethodSelect', 'IT Payment method / Select 1st payment method > Payment method');
  }

  // Tosca: Shipping and billing | Credit Card pop up IT > Close
  get itCreditCardPopupCloseButton(): Locator {
    return this.todo('GEP_ShippingBillingPage.itCreditCardPopupCloseButton', 'Shipping and billing | Credit Card pop up IT > Close');
  }

  // Tosca: Shipping & Billing | PO number > PO# value (also Enter PO Number > PO# value)
  get poNumberInput(): Locator {
    return this.page.locator('#poname');
  }

  // Tosca: Enter PO Number > PO# Automatic   | GenX only
  get poNumberAutomaticInput(): Locator {
    return this.page.locator('#poname');
  }

  // Tosca: Click on Review Order > Review Order
  get reviewOrderButton(): Locator {
    return this.page.locator('[data-test-id="shipping_button_revieworder"]');
  }

  // Tosca: Shipping & Billing | SubmitOrder > Submit Order   | budget notification overlay
  get budgetOverlaySubmitOrderButton(): Locator {
    return this.page.locator('ngb-modal-window').getByRole('button', { name: /submit order/i });
  }

  /** Tosca: Choose payment method. */
  async selectPaymentMethod(region: Region, country: string, itPaymentMethod: string): Promise<void> {
    switch (region) {
      case 'genx':
        // Tosca: Run Only for Gen X Countries. UK pre-selects Bill On Account.
        await expect(this.genXPaymentMethodArrow).toBeVisible();
        if (/bill on account/i.test(await this.genXPaymentMethodArrow.innerText())) break;
        await this.genXPaymentMethodArrow.click();
        await this.genXBillOnAccountOption.click();
        break;
      case 'geny':
        // Tosca: Else geny
        await this.genYPaymentMethodArrow.click();
        await this.genYBillOnAccountOption.click();
        break;
      case 'genz':
        if (country === 'IT') {
          // Tosca: If IT select Condizione di Pagamento Abituale (ValidCountries = IT)
          await this.clickIfVisible(this.itCreditCardPopupCloseButton);
          await this.genZPaymentMethodSelect.selectOption({ label: itPaymentMethod });
        } else {
          // Tosca: Select 1st payment method (#1)
          await this.genZPaymentMethodSelect.selectOption({ index: 0 });
        }
        break;
    }
  }

  /** Tosca: Enter the PO Number. Returns the PO number that was entered. */
  async enterPoNumber(region: Region, poNumber: string): Promise<string> {
    if (region === 'genx') {
      // Tosca: GenX replaces the pre-filled "PO# Automatic" value with a random 7-digit number ({RND[7]})
      const generatedPoNumber = randomDigits(7);
      await this.poNumberAutomaticInput.fill(generatedPoNumber);
      return generatedPoNumber;
    }
    await expect(this.poNumberInput).toBeEditable();
    await this.poNumberInput.fill(poNumber);
    return poNumber;
  }

  /** Tosca: Click on Review Order. */
  async clickReviewOrder(): Promise<void> {
    await expect(this.reviewOrderButton).toBeEnabled();
    await this.reviewOrderButton.click();
  }

  /** Tosca: Shipping | BudgetNotification | Submit Overlay. Confirms the overlay if it appears. */
  async confirmBudgetOverlayIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.budgetOverlaySubmitOrderButton);
  }
}
