import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Region } from '../utils/config';
import { randomDigits } from '../utils/dataHelpers';

export class GEP_ShippingBillingPage extends BasePage {
  // Tosca: GenX|Shipping & Billing | Payment method > downward arrow
  get genXPaymentMethodArrow(): Locator {
    return this.todo('GEP_ShippingBillingPage.genXPaymentMethodArrow', 'GenX|Shipping & Billing | Payment method > downward arrow');
  }

  // Tosca: GenX|Shipping & Billing | Payment method > Bill on Account
  get genXBillOnAccountOption(): Locator {
    return this.todo('GEP_ShippingBillingPage.genXBillOnAccountOption', 'GenX|Shipping & Billing | Payment method > Bill on Account');
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
    return this.todo('GEP_ShippingBillingPage.poNumberInput', 'Shipping & Billing | PO number > PO# value');
  }

  // Tosca: Enter PO Number > PO# Automatic   | GenX only
  get poNumberAutomaticInput(): Locator {
    return this.todo('GEP_ShippingBillingPage.poNumberAutomaticInput', 'Enter PO Number > PO# Automatic');
  }

  // Tosca: Click on Review Order > Review Order
  get reviewOrderButton(): Locator {
    return this.todo('GEP_ShippingBillingPage.reviewOrderButton', 'Click on Review Order > Review Order');
  }

  // Tosca: Shipping & Billing | SubmitOrder > Submit Order   | budget notification overlay
  get budgetOverlaySubmitOrderButton(): Locator {
    return this.todo('GEP_ShippingBillingPage.budgetOverlaySubmitOrderButton', 'Shipping & Billing | SubmitOrder > Submit Order');
  }

  // Tosca: Select Recurring Tab > RECURRING
  get recurringCartTab(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringCartTab', 'Select Recurring Tab > RECURRING');
  }

  // Tosca: Shipping & Billing- Default shipping popup > Confirm
  get defaultShippingPopupConfirmButton(): Locator {
    return this.todo('GEP_ShippingBillingPage.defaultShippingPopupConfirmButton', 'Shipping & Billing- Default shipping popup > Confirm');
  }

  // Tosca: Enter the Order and order count > Order Name
  get recurringOrderNameInput(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringOrderNameInput', 'Enter the Order and order count > Order Name');
  }

  // Tosca: Enter the Order and order count > NumberOfOrders
  get recurringNumberOfOrdersInput(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringNumberOfOrdersInput', 'Enter the Order and order count > NumberOfOrders');
  }

  // Tosca: Click Frequency selector dropdown > Fre
  get recurringFrequencyDropdown(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringFrequencyDropdown', 'Click Frequency selector dropdown > Fre');
  }

  // Tosca: Select the frequency value > FrequencyValue   | option text should come from the frequency value (unverified)
  recurringFrequencyOption(frequency: string): Locator {
    return this.todo(
      'GEP_ShippingBillingPage.recurringFrequencyOption',
      `Select the frequency value > FrequencyValue ("${frequency}")`
    );
  }

  // Tosca: Open Calendar > Open calendar (also Recurring Order Date Picker - Calendar > Open calendar)
  get recurringStartDateCalendarButton(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringStartDateCalendarButton', 'Open Calendar > Open calendar');
  }

  // Tosca: Click on dateselector Body > TBODY (also Recurring Order Start Date Body Selector > TBODY)
  get recurringStartDateCalendarBody(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringStartDateCalendarBody', 'Click on dateselector Body > TBODY');
  }

  // Tosca: Click on Confirm Button > Confirm (also Recurring Order Start Date Confirm > Confirm)
  get recurringStartDateConfirmButton(): Locator {
    return this.todo('GEP_ShippingBillingPage.recurringStartDateConfirmButton', 'Click on Confirm Button > Confirm');
  }

  /** Tosca: Shipping & Billing | PO number (Ctrl+A, Delete). Clears the PO field before switching carts. */
  async clearPoNumber(): Promise<void> {
    await this.poNumberInput.clear();
  }

  /** Tosca: Navigate to Recurring cart in Checkout. Also confirms the default shipping popup if it appears. */
  async switchToRecurringCart(): Promise<void> {
    await expect(this.recurringCartTab).toBeVisible();
    await this.recurringCartTab.click();
    await this.clickIfVisible(this.defaultShippingPopupConfirmButton, 3000);
  }

  /** Tosca: EnterRecurringCartDetails > Enter the Order and order count, Recurring Order Frequency selection. */
  async enterRecurringOrderDetails(orderName: string, numberOfOrders: number, frequency: string): Promise<void> {
    await expect(this.recurringOrderNameInput).toBeVisible();
    await this.recurringOrderNameInput.fill(orderName);
    await this.recurringNumberOfOrdersInput.fill(String(numberOfOrders));

    await this.recurringFrequencyDropdown.click();
    const frequencyOption = this.recurringFrequencyOption(frequency);
    await expect(frequencyOption).toBeVisible();
    await frequencyOption.click();
  }

  /** Tosca: Chose a Date and click Confirm. Accepts the date the calendar highlights by default. */
  async selectDefaultRecurringStartDate(): Promise<void> {
    await this.recurringStartDateCalendarButton.click();
    // Tosca clicks the calendar body and presses Enter to pick the highlighted date.
    await this.recurringStartDateCalendarBody.click();
    await this.page.keyboard.press('Enter');
    await this.recurringStartDateConfirmButton.click();
  }

  /** Tosca: Choose payment method. */
  async selectPaymentMethod(region: Region, country: string, itPaymentMethod: string): Promise<void> {
    switch (region) {
      case 'genx':
        // Tosca: Run Only for Gen X Countries
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
    await this.reviewOrderButton.click();
  }

  /** Tosca: Shipping | BudgetNotification | Submit Overlay. Confirms the overlay if it appears. */
  async confirmBudgetOverlayIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.budgetOverlaySubmitOrderButton);
  }
}
