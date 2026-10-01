import { Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

/** Payment details entered at TC03 step 19, per payment method (see data/demo/tc03.json). */
export type DemoPaymentDetails =
  | { type: 'none' }
  | {
      type: 'creditCard';
      creditCardType: string;
      cardholderName: string;
      cardNumber: string;
      /** Two digits, e.g. "04" */
      expireMonth: string;
      /** Four digits, e.g. "2022" */
      expireYear: string;
      cardCode: string;
    }
  | { type: 'purchaseOrder'; poNumber: string };

/**
 * Demo Web Shop one-page checkout. The steps open one after another on the same page: Billing address,
 * Shipping address, Shipping method, Payment method, Payment information, Confirm order.
 */
export class DemoCheckoutPage extends BasePage {
  // Tosca TC03 step 14: Billing Address Continue
  private get billingAddressContinueButton(): Locator {
    return this.page.locator('#billing-buttons-container input.new-address-next-step-button');
  }

  // Tosca TC03 step 15: Shipping Address Continue
  private get shippingAddressContinueButton(): Locator {
    return this.page.locator('#shipping-buttons-container input.new-address-next-step-button');
  }

  // Tosca TC03 step 16: Shipping Method Continue
  private get shippingMethodContinueButton(): Locator {
    return this.page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');
  }

  // Tosca TC03 step 17: Payments Option   | payment method radio, found by its value on the site
  private paymentMethodRadio(siteValue: string): Locator {
    return this.page.locator(`#checkout-step-payment-method input[name="paymentmethod"][value="${siteValue}"]`);
  }

  // Tosca TC03 step 17: Payment Method Continue
  private get paymentMethodContinueButton(): Locator {
    return this.page.locator('#payment-method-buttons-container input.payment-method-next-step-button');
  }

  // Tosca TC03 step 19: CreditCardType
  private get creditCardTypeDropdown(): Locator {
    return this.page.locator('#CreditCardType');
  }

  // Tosca TC03 step 19: Cardholder name
  private get cardholderNameInput(): Locator {
    return this.page.locator('#CardholderName');
  }

  // Tosca TC03 step 19: Card number
  private get cardNumberInput(): Locator {
    return this.page.locator('#CardNumber');
  }

  // Tosca TC03 step 19: Expiration date (month)
  private get expireMonthDropdown(): Locator {
    return this.page.locator('#ExpireMonth');
  }

  // Tosca TC03 step 19: ExpireYear
  private get expireYearDropdown(): Locator {
    return this.page.locator('#ExpireYear');
  }

  // Tosca TC03 step 19: Card code
  private get cardCodeInput(): Locator {
    return this.page.locator('#CardCode');
  }

  // Tosca TC03 step 19: PO Number
  private get purchaseOrderNumberInput(): Locator {
    return this.page.locator('#PurchaseOrderNumber');
  }

  // Tosca TC03 step 19: Continue   | Payment information > Continue
  private get paymentInfoContinueButton(): Locator {
    return this.page.locator('#payment-info-buttons-container input.payment-info-next-step-button');
  }

  // Tosca TC03 step 21: Confirm
  private get confirmOrderButton(): Locator {
    return this.page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');
  }

  /** TC03 step 14: Continue in Billing Address; the shipping address step opens. */
  async continueBillingAddress(): Promise<void> {
    await this.click(this.billingAddressContinueButton);
    await this.expectVisible(this.shippingAddressContinueButton, 60000);
  }

  /** TC03 step 15: Continue in Shipping Address; the shipping method step opens. */
  async continueShippingAddress(): Promise<void> {
    await this.click(this.shippingAddressContinueButton);
    await this.expectVisible(this.shippingMethodContinueButton, 60000);
  }

  /** TC03 step 16: Continue in Shipping Method; the payment method step opens. */
  async continueShippingMethod(): Promise<void> {
    await this.click(this.shippingMethodContinueButton);
    await this.expectVisible(this.paymentMethodContinueButton, 60000);
  }

  /** TC03 step 17: selects the payment method and clicks Continue; the payment information step opens. */
  async selectPaymentMethod(siteValue: string): Promise<void> {
    await this.check(this.paymentMethodRadio(siteValue));
    await this.click(this.paymentMethodContinueButton);
    await this.expectVisible(this.paymentInfoContinueButton, 60000);
  }

  /** TC03 step 19: enters the payment details for the method (none for COD / Check / Money Order), then Continue. */
  async providePaymentDetails(details: DemoPaymentDetails): Promise<void> {
    if (details.type === 'creditCard') {
      await this.selectOption(this.creditCardTypeDropdown, { label: details.creditCardType });
      await this.fill(this.cardholderNameInput, details.cardholderName);
      await this.fill(this.cardNumberInput, details.cardNumber);
      await this.selectOption(this.expireMonthDropdown, { label: details.expireMonth });
      await this.selectOption(this.expireYearDropdown, { label: details.expireYear });
      await this.fill(this.cardCodeInput, details.cardCode);
    } else if (details.type === 'purchaseOrder') {
      await this.fill(this.purchaseOrderNumberInput, details.poNumber);
    }
    await this.click(this.paymentInfoContinueButton);
    await this.expectVisible(this.confirmOrderButton, 60000);
  }

  /** TC03 step 21: Continue in confirm order (Confirm); the order completed page opens. */
  async confirmOrder(): Promise<void> {
    await this.click(this.confirmOrderButton);
    await this.expectUrl(/checkout\/completed/, 60000);
  }
}
