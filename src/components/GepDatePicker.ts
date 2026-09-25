import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from '../core/BaseComponent';
import type { DateFormat } from '../config/markets';
import { formatDate } from '../utils/dataHelpers';

/** Angular Material date field: the input, its "Open calendar" button and the calendar overlay. */
export class GepDatePicker extends BaseComponent {
  constructor(
    page: Page,
    private readonly input: Locator
  ) {
    super(page);
  }

  protected get root(): Locator {
    return this.page.locator('mat-form-field').filter({ has: this.input });
  }

  // Tosca: Open Calendar > Open calendar (also Recurring Order Date Picker - Calendar > Open calendar)
  get openCalendarButton(): Locator {
    return this.root.getByRole('button', { name: 'Open calendar' });
  }

  // Tosca: Click on dateselector Body > TBODY   | the calendar opens as an overlay outside the field
  get calendarDialog(): Locator {
    return this.page.locator('mat-calendar');
  }

  // Calendar header showing the month on display, e.g. "SEPTEMBER 2026"
  get calendarPeriodButton(): Locator {
    return this.calendarDialog.locator('.mat-calendar-period-button');
  }

  // Calendar "Next month" arrow
  get calendarNextMonthButton(): Locator {
    return this.calendarDialog.locator('.mat-calendar-next-button');
  }

  // Enabled day cell in the month on display
  calendarDayButton(day: number): Locator {
    return this.calendarDialog
      .locator('.mat-calendar-body-cell:not(.mat-calendar-body-disabled)')
      .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) });
  }

  // Tosca: Click on Confirm Button > Confirm   | US calendar has Cancel / Confirm; UK has none
  get calendarConfirmButton(): Locator {
    return this.page.locator('mat-datepicker-content').getByRole('button', { name: /^(Confirm|Apply)$/i });
  }

  /** Tosca: Chose a Date and click Confirm. Opens the calendar, moves to the date's month, clicks the day. */
  async pickDate(date: Date, format: DateFormat): Promise<void> {
    await this.openCalendarButton.click();
    await expect(this.calendarDialog).toBeVisible();

    // The calendar opens on the month of the current value; step forward until the target month shows.
    // First three letters only: matches "SEP 2026" and "September 2026" (en-GB's short name is "Sept").
    const month = date.toLocaleString('en-GB', { month: 'long' }).slice(0, 3);
    const target = new RegExp(`${month}.*${date.getFullYear()}`, 'i');
    for (let i = 0; i < 24 && !target.test(await this.calendarPeriodButton.innerText()); i++) {
      await this.calendarNextMonthButton.click();
    }
    await expect(this.calendarPeriodButton).toHaveText(target);

    await this.calendarDayButton(date.getDate()).click();
    await this.clickIfVisible(this.calendarConfirmButton, 2000);

    await expect(this.calendarDialog).toBeHidden();
    await expect(this.input).toHaveValue(formatDate(date, format));
  }
}
