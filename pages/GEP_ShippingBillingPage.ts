import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Region } from '../utils/config';
import { formatDdMmYyyy, randomDigits } from '../utils/dataHelpers';

export type RecurringOrderDetails = {
  orderName: string;
  frequency: string;
  /** Picked from the "Begin Processing On" calendar. */
  startDate: Date;
  numberOfOrders: number;
};

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
    return this.todo('GEP_ShippingBillingPage.poNumberAutomaticInput', 'Enter PO Number > PO# Automatic');
  }

  // Tosca: Click on Review Order > Review Order
  get reviewOrderButton(): Locator {
    return this.page.locator('[data-test-id="shipping_button_revieworder"]');
  }

  // Tosca: Shipping & Billing | SubmitOrder > Submit Order   | budget notification overlay
  get budgetOverlaySubmitOrderButton(): Locator {
    return this.page.getByRole('dialog').getByRole('button', { name: 'Submit Order' });
  }

  // Shipping & Scheduling > "Immediate" radio (the site remembers the last schedule choice per account)
  get immediateScheduleOption(): Locator {
    return this.page.locator('input[type="radio"][value="IMMEDIATE"]');
  }

  // Tosca: Select Recurring Tab > RECURRING   | UK site: "Recurring" radio under Shipping & Scheduling
  get recurringScheduleOption(): Locator {
    return this.page.locator('input[name="scheduleOption"][value="RECURRING"]');
  }

  // Tosca: Shipping & Billing- Default shipping popup > Confirm   | not seen on UK site (unverified)
  get defaultShippingPopupConfirmButton(): Locator {
    return this.page.getByRole('dialog').getByRole('button', { name: 'Confirm' });
  }

  // Tosca: Enter the Order and order count > Order Name
  get recurringOrderNameInput(): Locator {
    return this.page.getByPlaceholder('Order Name');
  }

  // Tosca: Click Frequency selector dropdown > Fre   | data-test-id ends with the selected value, so match the prefix
  get recurringFrequencyDropdown(): Locator {
    return this.page.locator('mat-select[data-test-id^="shipping&billingpage_arrow_"]');
  }

  // Tosca: Select the frequency value > FrequencyValue   | options read e.g. "Bi-Weekly. Get it every 14 days ..."
  recurringFrequencyOption(frequency: string): Locator {
    return this.page.getByRole('option', { name: new RegExp(`^${escapeRegExp(frequency)}`) });
  }

  // Tosca: Recurring Order|InputDate > Click to pick a date   | "Begin Processing On"; shows the picked date as dd/mm/yyyy
  get recurringStartDateInput(): Locator {
    return this.page.getByPlaceholder('Pick a Date');
  }

  // Tosca: Open Calendar > Open calendar (also Recurring Order Date Picker - Calendar > Open calendar)
  get recurringStartDateCalendarButton(): Locator {
    return this.page
      .locator('mat-form-field')
      .filter({ has: this.recurringStartDateInput })
      .getByRole('button', { name: 'Open calendar' });
  }

  // Tosca: Click on dateselector Body > TBODY   | Angular Material calendar overlay (unverified)
  get recurringStartDateCalendar(): Locator {
    return this.page.locator('mat-calendar');
  }

  // Header button of the calendar showing the month on display, e.g. "SEP 2026" (unverified)
  get recurringStartDateCalendarPeriodButton(): Locator {
    return this.recurringStartDateCalendar.locator('.mat-calendar-period-button');
  }

  // Calendar "Next month" arrow (unverified)
  get recurringStartDateCalendarNextButton(): Locator {
    return this.recurringStartDateCalendar.locator('.mat-calendar-next-button');
  }

  // Enabled day cell in the month on display (unverified)
  recurringStartDateCalendarDay(day: number): Locator {
    return this.recurringStartDateCalendar
      .locator('.mat-calendar-body-cell:not(.mat-calendar-body-disabled)')
      .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) });
  }

  // Tosca: Click on Confirm Button > Confirm   | only if the calendar has action buttons (unverified)
  get recurringStartDateConfirmButton(): Locator {
    return this.page.locator('mat-datepicker-content').getByRole('button', { name: /^(Confirm|Apply)$/i });
  }

  // Tosca: Enter the Order and order count > NumberOfOrders   | "Total Number Of Orders"
  get recurringNumberOfOrdersInput(): Locator {
    return this.page.locator('#hsTotalOrderId');
  }

  /** The page renders before its cart data arrives; Review Order is enabled once it has loaded. */
  async waitForPageLoaded(): Promise<void> {
    await expect(this.reviewOrderButton).toBeEnabled({ timeout: 90000 });
  }

  /** Tosca: Shipping & Billing | PO number (Ctrl+A, Delete). Clears the PO field before switching carts. */
  async clearPoNumber(): Promise<void> {
    await this.poNumberInput.clear();
  }

  /** Makes sure a normal (Immediate) order is placed, in case the account still has Delayed/Recurring selected. */
  async selectImmediateOrderIfShown(): Promise<void> {
    if (await this.isVisibleWithin(this.immediateScheduleOption, 3000)) {
      await this.immediateScheduleOption.check();
    }
  }

  /** Tosca: Navigate to Recurring cart in Checkout. Also confirms the default shipping popup if it appears. */
  async switchToRecurringCart(): Promise<void> {
    await this.recurringScheduleOption.check();
    await this.clickIfVisible(this.defaultShippingPopupConfirmButton, 3000);
  }

  /** Tosca: EnterRecurringCartDetails (order name, frequency, start date, number of orders). */
  async enterRecurringOrderDetails(details: RecurringOrderDetails): Promise<void> {
    await expect(this.recurringOrderNameInput).toBeVisible();
    await this.typeAndBlur(this.recurringOrderNameInput, details.orderName);

    await this.recurringFrequencyDropdown.click();
    await this.recurringFrequencyOption(details.frequency).click();

    await this.pickRecurringStartDate(details.startDate);
    await this.typeAndBlur(this.recurringNumberOfOrdersInput, String(details.numberOfOrders));
  }

  /** Tosca: Chose a Date and click Confirm. Opens the calendar, moves to the date's month and clicks the day. */
  async pickRecurringStartDate(date: Date): Promise<void> {
    await this.recurringStartDateCalendarButton.click();
    await expect(this.recurringStartDateCalendar).toBeVisible();

    // The calendar opens on the month of the current value; step forward until the target month shows.
    // First three letters only: matches "SEP 2026" and "September 2026" (en-GB's short name is "Sept").
    const month = date.toLocaleString('en-GB', { month: 'long' }).slice(0, 3);
    const target = new RegExp(`${month}.*${date.getFullYear()}`, 'i');
    for (let i = 0; i < 24 && !target.test(await this.recurringStartDateCalendarPeriodButton.innerText()); i++) {
      await this.recurringStartDateCalendarNextButton.click();
    }
    await expect(this.recurringStartDateCalendarPeriodButton).toHaveText(target);

    await this.recurringStartDateCalendarDay(date.getDate()).click();
    await this.clickIfVisible(this.recurringStartDateConfirmButton, 2000);

    await expect(this.recurringStartDateCalendar).toBeHidden();
    await expect(this.recurringStartDateInput).toHaveValue(formatDdMmYyyy(date));
  }

  /** Types the PO number into "PO#" (the UK site has a single PO field). */
  async fillPoNumber(poNumber: string): Promise<void> {
    await this.typeAndBlur(this.poNumberInput, poNumber);
  }

  /**
   * Types like a user and leaves the field. fill() alone updated the field on screen but the
   * value was not carried to Review Order, so these inputs need key events and a blur.
   */
  private async typeAndBlur(input: Locator, value: string): Promise<void> {
    await input.focus();
    await input.press('Control+A');
    await input.press('Delete');
    await input.pressSequentially(value, { delay: 30 });
    await input.press('Tab');
    await expect(input).toHaveValue(value);
    //await input.fill(value)
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
    await expect(this.reviewOrderButton).toBeEnabled({ timeout: 50000 });
    //await this.reviewOrderButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(10000)
    await this.reviewOrderButton.click();
  }

  /** Tosca: Shipping | BudgetNotification | Submit Overlay. Confirms the overlay if it appears. */
  async confirmBudgetOverlayIfShown(): Promise<boolean> {
    return this.clickIfVisible(this.budgetOverlaySubmitOrderButton);
  }
}
