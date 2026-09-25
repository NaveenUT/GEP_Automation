import { Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { GepDatePicker } from '../components/GepDatePicker';
import type { DateFormat } from '../config/markets';
import { escapeRegExp } from '../utils/dataHelpers';

export type RecurringOrderDetails = {
  orderName: string;
  frequency: string;
  /** Picked from the "Begin Processing On" calendar. */
  startDate: Date;
  numberOfOrders: number;
};

/** Shipping & Billing: PO number, Shipping & Scheduling (immediate / recurring) and Payment Method. */
export class GepShippingBillingPage extends BasePage {
  // ---------------------------------------------------------------- PO number

  // Tosca: Shipping & Billing | PO number > PO# value (also Enter PO Number > PO# value / PO# Automatic)   | one PO# field on UK and US
  get poNumberInput(): Locator {
    return this.page.locator('#poname');
  }

  // ---------------------------------------------------------------- Shipping & Scheduling

  // Shipping & Scheduling > "Immediate" radio (the site remembers the last schedule choice per account)
  get immediateScheduleRadio(): Locator {
    return this.page.locator('input[type="radio"][value="IMMEDIATE"]');
  }

  // Tosca: Select Recurring Tab > RECURRING   | "Recurring" radio under Shipping & Scheduling
  get recurringScheduleRadio(): Locator {
    return this.page.locator('input[name="scheduleOption"][value="RECURRING"]');
  }

  // Tosca: Shipping & Billing- Default shipping popup > Confirm   | not seen on UK/US
  get defaultShippingDialogConfirmButton(): Locator {
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

  // Tosca: Recurring Order|InputDate > Click to pick a date   | "Begin Processing On"
  get recurringStartDateInput(): Locator {
    return this.page.getByPlaceholder('Pick a Date');
  }

  // Tosca: Enter the Order and order count > NumberOfOrders   | "Total Number Of Orders"
  get recurringNumberOfOrdersInput(): Locator {
    return this.page.locator('#hsTotalOrderId');
  }

  /** Calendar of the "Begin Processing On" field. */
  readonly recurringStartDatePicker = new GepDatePicker(this.page, this.page.getByPlaceholder('Pick a Date'));

  // ---------------------------------------------------------------- Payment Method

  // Tosca: GenX|Shipping & Billing | Payment method > downward arrow
  get paymentMethodDropdown(): Locator {
    return this.page.locator('mat-select[formcontrolname="paymentformcontrolvalue"]');
  }

  // Tosca: GenX|Shipping & Billing | Payment method > Bill on Account   | "Bill On Account" (UK), "Bill on Account" (US)
  get paymentMethodBillOnAccountOption(): Locator {
    return this.page.getByRole('option', { name: 'Bill On Account' });
  }

  // Tosca: Shipping & Billing chose Payment > downward arrow
  get paymentMethodDropdownGenY(): Locator {
    return this.todo('GepShippingBillingPage.paymentMethodDropdownGenY', 'Shipping & Billing chose Payment > downward arrow');
  }

  // Tosca: Shipping & Billing chose Payment > Bill on Account_GenY
  get paymentMethodBillOnAccountOptionGenY(): Locator {
    return this.todo('GepShippingBillingPage.paymentMethodBillOnAccountOptionGenY', 'Shipping & Billing chose Payment > Bill on Account_GenY');
  }

  // Tosca: IT Payment method / Select 1st payment method > Payment method   | GenZ; assumed to be a native <select> (unverified)
  get paymentMethodDropdownGenZ(): Locator {
    return this.todo('GepShippingBillingPage.paymentMethodDropdownGenZ', 'IT Payment method / Select 1st payment method > Payment method');
  }

  // Tosca: Shipping and billing | Credit Card pop up IT > Close
  get creditCardDialogCloseButtonIT(): Locator {
    return this.todo('GepShippingBillingPage.creditCardDialogCloseButtonIT', 'Shipping and billing | Credit Card pop up IT > Close');
  }

  // ---------------------------------------------------------------- Review Order

  // Tosca: Click on Review Order > Review Order
  get reviewOrderButton(): Locator {
    return this.page.locator('[data-test-id="shipping_button_revieworder"]');
  }

  // Tosca: Shipping & Billing | SubmitOrder > Submit Order   | budget notification overlay (not seen on UK/US)
  get budgetDialogSubmitOrderButton(): Locator {
    return this.page.locator('ngb-modal-window').getByRole('button', { name: /submit order/i });
  }

  /** The page renders before its cart data arrives; Review Order is enabled once it has loaded. */
  async expectPageLoaded(): Promise<void> {
    await expect(this.reviewOrderButton).toBeEnabled({ timeout: 90000 });
  }

  /** Tosca: Shipping & Billing | PO number (Ctrl+A, Delete). */
  async clearPoNumber(): Promise<void> {
    await this.poNumberInput.clear();
  }

  /** Types the PO number into "PO#". */
  async enterPoNumber(poNumber: string): Promise<void> {
    await this.typeAndBlur(this.poNumberInput, poNumber);
  }

  /** Makes sure a normal (Immediate) order is placed, in case the account still has Delayed/Recurring selected. */
  async selectImmediateScheduleIfShown(): Promise<void> {
    if (await this.isVisibleWithin(this.immediateScheduleRadio, 3000)) {
      await this.immediateScheduleRadio.check();
    }
  }

  /** Tosca: Navigate to Recurring cart in Checkout. Also confirms the default shipping popup if it appears. */
  async selectRecurringSchedule(): Promise<void> {
    await this.recurringScheduleRadio.check();
    await this.clickIfVisible(this.defaultShippingDialogConfirmButton, 3000);
  }

  /** Tosca: EnterRecurringCartDetails (order name, frequency, start date, number of orders). */
  async enterRecurringOrderDetails(details: RecurringOrderDetails, dateFormat: DateFormat): Promise<void> {
    await expect(this.recurringOrderNameInput).toBeVisible();
    await this.typeAndBlur(this.recurringOrderNameInput, details.orderName);

    await this.recurringFrequencyDropdown.click();
    await this.recurringFrequencyOption(details.frequency).click();

    await this.recurringStartDatePicker.pickDate(details.startDate, dateFormat);
    await this.typeAndBlur(this.recurringNumberOfOrdersInput, String(details.numberOfOrders));
  }

  /** Tosca: Run Only for Gen X Countries > Bill on Account. UK pre-selects it, so it is only chosen when needed. */
  async selectBillOnAccount(): Promise<void> {
    await expect(this.paymentMethodDropdown).toBeVisible();
    if (/bill on account/i.test(await this.paymentMethodDropdown.innerText())) return;
    await this.paymentMethodDropdown.click();
    await this.paymentMethodBillOnAccountOption.click();
  }

  /** Tosca: Else geny > Shipping & Billing chose Payment (Bill on Account_GenY). */
  async selectBillOnAccountGenY(): Promise<void> {
    await this.paymentMethodDropdownGenY.click();
    await this.paymentMethodBillOnAccountOptionGenY.click();
  }

  /** Tosca: GenZ IT Payment method (by label) or Select 1st payment method (#1). */
  async selectPaymentMethodGenZ(option: { label: string } | { index: number }): Promise<void> {
    await this.paymentMethodDropdownGenZ.selectOption(option);
  }

  /** Tosca: If Credit card popup exist (GenZ, IT) > Close. */
  async closeCreditCardDialogIfShownIT(): Promise<void> {
    await this.clickIfVisible(this.creditCardDialogCloseButtonIT);
  }

  /**
   * Tosca: Click on Review Order, then Shipping | BudgetNotification | Submit Overlay if it appears.
   * The first click can be ignored while the page is still settling, so it is retried until Review Order opens.
   */
  async goToReviewOrder(): Promise<void> {
    await expect(this.reviewOrderButton).toBeEnabled({ timeout: 50000 });
    await expect(async () => {
      if (!/revieworder/i.test(this.page.url())) {
        await this.reviewOrderButton.click();
        await this.clickIfVisible(this.budgetDialogSubmitOrderButton, 30000);
      }
      await expect(this.page).toHaveURL(/revieworder/i, { timeout: 15000 });
    }).toPass({ timeout: 90000 });
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
  }
}
