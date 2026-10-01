# TC03_Demowebshop_Order By Payment Method (Cashon Delivery / Credit Card / Check Money Order / Purchase Order)

| Field | Value |
| --- | --- |
| Test Case ID | TC03 (4 variants: TC03_Demowebshop_Order By Cashon Delivery, TC03_Demowebshop_Order By Credit Card, TC03_Demowebshop_Order By Check Money Order, TC03_Demowebshop_Order By Purchase Order) |
| Title | Order a book (Fiction) through the one-page checkout with each payment method |
| Source Tosca execution reference | Tosca Execution Test Report "TOSCA_Exec_Result_Demowebshop Product Management", Product Management, created 09.03.2021, Tricentis Tosca 13.4 P3 |
| Execution result | PASSED (all 4 variants). Cashon Delivery 09-03-2021 07:03:40-07:04:42 PM (order 882857); Credit Card 07:04:43-07:05:37 PM (order 882858); Check Money Order 07:05:38-07:06:26 PM (order 882859); Purchase Order 07:06:26-07:07:17 PM (order 882860); executed by Admin |
| Pre-conditions | Demowebshop reachable; login account available in the Tosca TestSheet; the account has a saved billing and shipping address (the billing / shipping steps only click Continue) |

## Test data

| Value | Source |
| --- | --- |
| Log in (Account Menu) | Report step data |
| {PL[Email]} | TestSheet parameter, literal value not in the report |
| {PL[Password]} | TestSheet parameter, literal value not in the report |
| BOOKS | Report step data (Product Categories) |
| Fiction | Buffer Product Link, set in the report |
| #1 | Positional reference: product link (step 7), Add to cart (step 9), shopping cart row (step 12) |
| Agree Terms = True | Report step data |
| Payments.CashOnDelivery | Payments Option, Cashon Delivery variant |
| Payments.Credit Card | Payments Option, Credit Card variant |
| Payments.CheckMoneyOrder | Payments Option, Check Money Order variant |
| Payments.PurchaseOrder | Payments Option, Purchase Order variant |
| CreditCardType = Visa | Credit Card variant, step 19 |
| Cardholder name = Barbara Gordon | Credit Card variant, step 19 |
| Card number = 4485564059489345 | Credit Card variant, step 19 |
| Expiration date = 04 | Credit Card variant, step 19 |
| ExpireYear = 2022 | Credit Card variant, step 19 |
| Card code = 123 | Credit Card variant, step 19 |
| PO Number = {RND[6]} | Purchase Order variant, step 19: random 6-digit number generated at run time (the recorded run used 404058) |
| Your order has been successfully processed! | Expected value of the order confirmation verification |

## Steps

| # | Action | Test data | Expected result | Playwright Supported (Y/N) | Notes/Tag |
| --- | --- | --- | --- | --- | --- |
| 1 | Open Demowebshop | — | Demowebshop opens | Y | |
| 2 | Wait for PageLoad | Operation = Wait On Open | Operation 'Wait On Open' performed successfully on window with caption 'Demo*' | Y | Window-caption wait |
| 3 | Click on Login | Account Menu = Log in; Email = {PL[Email]}; Password = {PL[Password]}; UserLogin = {Click} | Credentials submitted | Y | Values not in the report |
| 4 | Wait for HomePage Load | Account Link = True (WaitOn) | WaitOn successful; expected == True, actual True | Y | |
| 5 | Click on Books | Product Categories = BOOKS | Books category opens | Y | |
| 6 | Set ProductLink Buffer | Product Link = Fiction | Buffer "Product Link" set to "Fiction" | Y | Captured here, consumed in step 7 |
| 7 | Click on Fiction | #1 = {Click} | Product Fiction opens | Y | Positional reference; consumes {B[Product Link]} |
| 8 | Take Screenshot | — | Screenshot created successfully | Y | |
| 9 | Click on Add to Cart | #1 = {Click} | Product added to the cart | Y | Positional reference |
| 10 | Take Screenshot | — | Screenshot created successfully | Y | |
| 11 | Click on Shopping cart link | shopping cart = {Click} | Shopping cart opens | Y | |
| 12 | Perform Checkout | Shopping Cart = {NULL} (Select); #1 = {NULL} (Select); Remove = {Click}; Agree Terms = True; Checkout = {Click} | Checkout started | Y | Selects cart row #1, clicks its Remove control, agrees to the terms, clicks Checkout |
| 13 | Take Screenshot | — | Screenshot created successfully | Y | |
| 14 | Click on Continue in Billing Address | Billing Address Continue = {Click} | Billing address accepted | Y | |
| 15 | Click on Continue in shipping Address | Shipping Address Continue = {Click} | Shipping address accepted | Y | |
| 16 | Click on Continue in Shipping Method | Shipping Method Continue = {Click} | Shipping method accepted | Y | |
| 17 | Select Payment Method | Payments Option = (variant: Payments.CashOnDelivery / Payments.Credit Card / Payments.CheckMoneyOrder / Payments.PurchaseOrder); Payment Method Continue = {Click} | Payment method selected | Y | Variant-specific value |
| 18 | Take Screenshot | — | Screenshot created successfully | Y | |
| 19 | Provide Payment Details | Cashon Delivery and Check Money Order: Continue = {Click}. Credit Card: CreditCardType = Visa; Cardholder name = Barbara Gordon; Card number = 4485564059489345; Expiration date = 04; ExpireYear = 2022; Card code = 123; Continue = {Click}. Purchase Order: PO Number = {RND[6]}; Continue = {Click} | Payment details accepted | Y | Variant-specific inputs |
| 20 | Take Screenshot | — | Screenshot created successfully | Y | |
| 21 | Click on Continue in confirm order | Confirm = {Click} | Order confirmed | Y | |
| 22 | Verify for Order Confirmation | Success Message = "Your order has been successfully processed!" (Verify); Continue = {Click} | Verification successful: expected == "Your order has been successfully processed!", actual "Your order has been successfully processed!" | Y | |
| 23 | Take Screenshot | — | Screenshot created successfully | Y | |
| 24 | Click on Logout | Log out = {Click} | User logged out | Y | |
| 25 | CloseBrowser | — | Browser closed | Y | |

## Exceptions summary

- None. All 25 steps of all 4 variants PASSED; no [BLOCKER], [NEW FLOW] or [NOT PLAYWRIGHT-SUPPORTED] step.

## Traceability check

- Tosca top-level steps per variant: 25 (Open Demowebshop … CloseBrowser). Manual steps: 25. They match.
- The 4 variants have the same 25 steps; they differ only in the data of step 17 (Payments Option) and step 19 (payment details).

## Open questions

- Login credentials are TestSheet parameters; the literal email and password are not in the report. The screenshots show Sandhiya001@test.com as the logged-in account (observed from an image, not step data).
- The report gives positional references (#1) rather than element identifiers, so real locators still have to be supplied for the page object.
- Step 12 clicks "Remove" on cart row #1 before Checkout. The COD screenshot shows a cart Sub-Total of 50.00 with Fiction at 24.00, so the cart held other items; whether Remove was meant to drop an earlier item or the Fiction row is not stated.
- Credit Card: ExpireYear 2022 and the card number are values from the 2021 run; the year may no longer be selectable on the site.
- "Payments.Credit Card" is the report's value for the Credit Card option; the report does not show how it maps to the page element.
