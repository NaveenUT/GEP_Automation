import type { Region } from '../utils/config';
import { ORDER_STATUS } from './orderStatus';

/**
 * Fixed test data taken from the Tosca scripts. Environment-specific values
 * (URL, credentials, country, region, product) live in .env; see utils/config.ts,
 * unless a test case defines its own environment below (e.g. the UK QA flows).
 */

/** UK QA site. Tosca: Country UK uses the GenX UI with a Medical/Dental domain. */
export const UK_QA = {
  baseUrl: 'https://www.uk.qa.eschein.com/',
  country: 'UK',
  region: 'genx' as Region,
} as const;

export const US_QA = {
  baseUrl: 'https://www.us.qa.eschein.com/en-us',
  country: 'US',
  region: 'genx' as Region,
} as const;


export const GEP2_36899 = {
  tcId: 'GEP2-36899',
  title: 'Verify submitted order in My order page',
  // Tosca: PDP|QuantityInput > quantity-box ({SENDKEYS[50]})
  quantity: 50,
  // Tosca: Shipping & Billing | PO number > PO# value (also used for UK, per the provided test data)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
} as const;

export const GEP2_18230 = {
  tcId: 'GEP2-18230',
  title: 'E2E of The Reorder option from an order on the Order History page',
  // Tosca: Shipping & Billing | PO number > PO# value ({SENDKEYS["3787329720"]}, non-GenX regions)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
  // One test runs per flow. Tosca: {CP[Domain]} + TDM user for that domain.
  flows: [
    {
      name: 'UK Medical',
      ...UK_QA,
      domain: 'Medical',
      username: 'MedicalTest123',
      password: 'Password@123',
      // Tosca: TDM Condition == 'OCOrderStatus' (status of the newly submitted order)
      expectedOrderStatus: ORDER_STATUS.PENDING_LOCATION_VERIFICATION,
    },
    {
      name: 'UK Dental',
      ...UK_QA,
      domain: 'Dental',
      username: 'ukdental2',
      password: 'Password@123',
      // Tosca: TDM Condition == 'OCOrderStatus' (status of the newly submitted order)
      expectedOrderStatus: ORDER_STATUS.PROCESSING,
    },
    {
      name: 'US Medical',
      ...US_QA,
      // No Medical/Dental domain picker on the US site
      domain: '',
      username: 'momani',
      password: 'support10',
      // Tosca: TDM Condition == 'OCOrderStatus' (status of the newly submitted order)
      expectedOrderStatus: ORDER_STATUS.PENDING_LOCATION_VERIFICATION,
    }
  ],
} as const;

export const GEP2_18257 = {
  tcId: 'GEP2-18257',
  title: 'Verify user able to see the orders on Future & Recurring Tab',
  // Tosca: Shipping & Billing | PO number > PO# value (also used for UK, per the provided test data)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
  // Tosca: Generate Buffer > recurringOrderName (Tosca used {RANDOMTEXT[7]}; fixed value from the provided test data)
  recurringOrderName: 'NewOrder',
  // Tosca: Generate Buffer > recurringOrderCount (Tosca used {RND[1][52]}; fixed value from the provided test data)
  recurringOrderCount: 1,
  // "Begin Processing On" = today + this many days (the site's earliest allowed date is tomorrow)
  recurringStartInDays: 1,
} as const;

export const GEP2_18559 = {
  tcId: 'GEP2-18559',
  title: 'Place Order from Unplaced Order section',
  // Tosca: Shipping & Billing | PO number > PO# value (non-GenX regions)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
} as const;

export const GEP2_22324 = {
  tcId: 'GEP2-22324',
  title: 'End-to-End flow for UOM display on Order History page',
  // Tosca: Shipping & Billing | PO number > PO# value (non-GenX regions)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
} as const;
