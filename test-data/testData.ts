/**
 * Fixed test data taken from the Tosca scripts. Environment-specific values
 * (URL, credentials, country, region, product) live in .env; see utils/config.ts.
 */
export const GEP2_36899 = {
  tcId: 'GEP2-36899',
  title: 'Verify submitted order in My order page',
  // Tosca: PDP|QuantityInput > quantity-box ({SENDKEYS[50]})
  quantity: 50,
  // Tosca: Shipping & Billing | PO number > PO# value (non-GenX regions)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
} as const;

export const GEP2_18257 = {
  tcId: 'GEP2-18257',
  title: 'Verify user able to see the orders on Future & Recurring Tab',
  // Tosca: Shipping & Billing | PO number > PO# value (non-GenX regions)
  poNumber: '3787329720',
  // Tosca: Enter the Answer > Your answer* ({SENDKEYS["Test"]})
  securityAnswer: 'Test',
  // Tosca: IT Payment method > Payment method (GenZ, IT only)
  itPaymentMethod: 'Condizione di Pagamento Abituale',
  // Tosca: Generate Buffer > recurringOrderName ({RANDOMTEXT[7]})
  recurringOrderNameLength: 7,
  // Tosca: Generate Buffer > recurringOrderCount ({RND[1][52]})
  recurringOrderCount: { min: 1, max: 52 },
} as const;
