/**
 * Fixed test data taken from the Tosca scripts. Environment-specific values
 * (URL, credentials, country, region, product, expected order status) live in .env; see utils/config.ts.
 */

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
