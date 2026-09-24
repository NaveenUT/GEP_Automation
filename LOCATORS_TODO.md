# Locators to fill – GEP2-36899, GEP2-18257

Every locator below is a `this.todo(...)` placeholder. Fill them with `/tosca-to-pom fill <BASE_URL> [PageName]` once the site URL is confirmed.

Status: `TODO`, `Filled` or `Needs review`.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GEP_HomePage | signInButton | Sign In > Sign In Button | – | Filled | `[data-test-id="user-login-click"]` | live site 2026-09-24 |
| GEP_HomePage | headerUserMenuIcon | Header \| sign out > IMG | – | Filled | `role button "Expand account menu"` | live site 2026-09-24 |
| GEP_HomePage | headerSignOutLink | Header \| sign out > Sign Out | not seen yet | Needs review | `role button/link "Sign Out"` | live site 2026-09-24 |
| GEP_HomePage | logoutButton | HomePage \| Sign out > Logout | – | TODO | – | – |
| GEP_HomePage | domainBrowseButton | SignIn > Select Browse > Browse | UK only | Filled | `domain dialog > label "UK {DOMAIN}" > link "Browse"` | live site 2026-09-24 |
| GEP_HomePage | cartIcon | Header \|Cart > cart-icon | logged-in icon; opens cart page directly | Filled | `[data-test-id="cart_image_icon"]` | live site 2026-09-24 |
| GEP_HomePage | cartItemCount | Header \| CartItemCount > CartItemCount | absent when basket is empty | Filled | `[data-test-id="cart_image_qty"]` | live site 2026-09-24 |
| GEP_HomePage | searchInput | GlobalSepdp_image_notfaviconarch > Search input box | – | Filled | `[data-test-id="RecipientUsername"]` | live site 2026-09-24 |
| GEP_HomePage | searchButton | GlobalSepdp_image_notfaviconarch > Search Icon / basic-addon2 | id "basic-addon2"? | Filled | `[data-test-id="basic-addon2"]` | live site 2026-09-24 |
| GEP_Popups | launchConfirmButton | Launch popup - confirm button > Confirmar | FR only, not on UK | Needs review | `role button "Confirmar"` | live site 2026-09-24 |
| GEP_Popups | cookieAcceptAllButton | Cookie \| AcceptAll > Accept All | – | Filled | `dialog "Cookie Settings" > button "Accept all"` | live site 2026-09-24 |
| GEP_Popups | acceptCookiesAllButton | Accept Cookies > Accept All | fallback | Filled | `role button "Accept all"` | live site 2026-09-24 |
| GEP_Popups | adPopupCloseIcon | Click on Close for Ad > Close icon | GenY | TODO | – | – |
| GEP_Popups | continueWithoutFreeItemButton | Shopping Cart \| Free Item Popup > Continue Without Free Item | – | Filled | `[data-test-id="expressCheckoutPopup.ContinueWithoutBtnText4"]` | live site 2026-09-24 |
| GEP_Popups | licenseSkipAndCompleteLaterButton | Shopping Cart \| License Skip > DIV > Skip And Complete Later | not seen yet | Needs review | `role button /Skip And Complete Later/` | live site 2026-09-24 |
| GEP_Popups | controlledSubstancesConfirmSkipButton | Controlled Substances Form on Shopping Cart > Confirm Skip | not seen yet | Needs review | `role button /Confirm Skip/` | live site 2026-09-24 |
| GEP_Popups | feedbackSurveyCloseButton | Close Customer FeedBack survey popup > Close Survey | guess; confirmation page not seen yet | Needs review | `role button /close survey/` | live site 2026-09-24 |
| GEP_Popups | feedbackSurveyCloseAltButton | Close Customer FeedBack survey popup > Close Survey_1 | guess | Needs review | `dialog /survey\|feedback/ > button /close/` | live site 2026-09-24 |
| GEP_LoginPage | usernameInput | Enter Valid creditionals > Username | – | Filled | `[data-test-id="SignInUserNameInput"]` | live site 2026-09-24 |
| GEP_LoginPage | passwordInput | Enter Valid creditionals > Password | – | Filled | `[data-test-id="SignInPasswordInput"]` | live site 2026-09-24 |
| GEP_LoginPage | signInSubmitButton | Login \| SignIn Button > Sign In | – | Filled | `[data-test-id="sign-in-button"]` | live site 2026-09-24 |
| GEP_LoginPage | securityQuestion1Dropdown | Click on the security question > Choose a security question* | not shown for ukdental2 | Needs review | `text "Choose a security question"` | live site 2026-09-24 |
| GEP_LoginPage | securityAnswer1Input | Enter the Answer > Your answer* | – | TODO | – | – |
| GEP_LoginPage | securityQuestion2Dropdown | Click on the security question > Choose second a security question* | – | TODO | – | – |
| GEP_LoginPage | securityAnswer2Input | Enter the Answer > Your answer*_1 | – | TODO | – | – |
| GEP_LoginPage | securityProceedButton | Click on proceed CTA > Proceed | – | TODO | – | – |
| GEP_SearchResultsPage | firstProductName | SRP \| Navigate to First Product > Product name | – | Filled | `[data-test-id="product-name"] (first)` | live site 2026-09-24 |
| GEP_SearchResultsPage | firstProductId | SRP \| Navigate to First Product > Product ID | – | Filled | `[data-test-id="srp_listview_text_productid"] (first)` | live site 2026-09-24 |
| GEP_ProductDetailPage | quantityInput | PDP\|QuantityInput > quantity-box | id "quantity-box"? | Filled | `[data-test-id="pdp_input_quantityinput"]` | live site 2026-09-24 |
| GEP_ProductDetailPage | addToCartButton | Add to cart > PDP add to cart (also PDP \| Add To Cart > Add To Cart) | carousels reuse pdp_button_addcart | Filled | `[data-test-id="pdp_button_additemtocart"] [data-test-id="pdp_button_addcart"]` | live site 2026-09-24 |
| GEP_ProductDetailPage | comDropdown | PDP\|COMDropdown > Dropdown Required* | not on product 143513 | Needs review | `role combobox /Required/` | live site 2026-09-24 |
| GEP_ProductDetailPage | comDropdownUsersOption | Select the dropdown value > users | GEP2-18257 | TODO | – | – |
| GEP_ProductDetailPage | rapideFixerTypeOption | Click FixerType > Rapide Fixer | GEP2-18257; FR only | TODO | – | – |
| GEP_ProductDetailPage | backorderModal | Verify the Backorder Modal is displayed > Modal | not seen yet | Needs review | `dialog /back ?order/` | live site 2026-09-24 |
| GEP_ProductDetailPage | backorderModalAddToCartButton | Click Add to cart in Backorder Modal > Add To Cart | not seen yet | Needs review | `backorderModal > button /Add To (Basket\|Cart)/` | live site 2026-09-24 |
| GEP_ShoppingCartPage | miniCartItemCode | Waiton for ItemCode to display > Item code goes here | cart page quick-order box | Filled | `placeholder "Item code goes here"` | live site 2026-09-24 |
| GEP_ShoppingCartPage | guestViewCartButton | Shopping Cart\|GuestCartIcon > View Cart | no mini cart on UK site | TODO | – | – |
| GEP_ShoppingCartPage | loggedInViewCartButton | Shopping Cart\|LoggedInCartIcon > DIV | no mini cart on UK site | TODO | – | – |
| GEP_ShoppingCartPage | clearCartButton | Shopping Cart \| Clear Cart > Clear Cart | "Clear This Basket", no confirm | Filled | `[data-test-id="shoppingCart.RemoveCartText46"]` | live site 2026-09-24 |
| GEP_ShoppingCartPage | proceedToShippingBillingButton | Checkout \| Proceed to Shipping and billing page > Shipping and billing button | – | Filled | `[data-test-id="cart_button_shippingbilling"]` | live site 2026-09-24 |
| GEP_ShippingBillingPage | genXPaymentMethodArrow | GenX\|Shipping & Billing \| Payment method > downward arrow | GenX | Filled | `mat-select[formcontrolname="paymentformcontrolvalue"]` | live site 2026-09-24 |
| GEP_ShippingBillingPage | genXBillOnAccountOption | GenX\|Shipping & Billing \| Payment method > Bill on Account | GenX | Filled | `role option "Bill On Account"` | live site 2026-09-24 |
| GEP_ShippingBillingPage | genYPaymentMethodArrow | Shipping & Billing chose Payment > downward arrow | GenY | TODO | – | – |
| GEP_ShippingBillingPage | genYBillOnAccountOption | Shipping & Billing chose Payment > Bill on Account_GenY | GenY | TODO | – | – |
| GEP_ShippingBillingPage | genZPaymentMethodSelect | IT Payment method / Select 1st payment method > Payment method | GenZ; native select? | TODO | – | – |
| GEP_ShippingBillingPage | itCreditCardPopupCloseButton | Shipping and billing \| Credit Card pop up IT > Close | GenZ IT | TODO | – | – |
| GEP_ShippingBillingPage | poNumberInput | Shipping & Billing \| PO number > PO# value | – | Filled | `#poname` | live site 2026-09-24 |
| GEP_ShippingBillingPage | poNumberAutomaticInput | Enter PO Number > PO# Automatic | no separate field on UK site | TODO | – | – |
| GEP_ShippingBillingPage | reviewOrderButton | Click on Review Order > Review Order | – | Filled | `[data-test-id="shipping_button_revieworder"]` | live site 2026-09-24 |
| GEP_ShippingBillingPage | budgetOverlaySubmitOrderButton | Shipping & Billing \| SubmitOrder > Submit Order | not seen yet | Needs review | `dialog > button "Submit Order"` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringScheduleOption | Select Recurring Tab > RECURRING | UK: radio, not a tab | Filled | `input[name="scheduleOption"][value="RECURRING"]` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringStartDateInput | Recurring Order\|InputDate > Click to pick a date | shows picked date dd/mm/yyyy | Filled | `placeholder "Pick a Date"` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringStartDateCalendarButton | Open Calendar > Open calendar | "Open calendar" seen in ARIA snapshot | Needs review | `mat-form-field:has(Pick a Date) > button "Open calendar"` | – |
| GEP_ShippingBillingPage | recurringStartDateCalendar | Click on dateselector Body > TBODY | Material calendar overlay | Needs review | `mat-calendar` | – |
| GEP_ShippingBillingPage | recurringStartDateCalendarPeriodButton | – | month header, e.g. "SEP 2026" | Needs review | `mat-calendar .mat-calendar-period-button` | – |
| GEP_ShippingBillingPage | recurringStartDateCalendarNextButton | – | next-month arrow | Needs review | `mat-calendar .mat-calendar-next-button` | – |
| GEP_ShippingBillingPage | recurringStartDateCalendarDay(day) | – | enabled day cell | Needs review | `mat-calendar .mat-calendar-body-cell:not(.mat-calendar-body-disabled)` + day text | – |
| GEP_ShippingBillingPage | recurringStartDateConfirmButton | Click on Confirm Button > Confirm | only if the calendar has action buttons | Needs review | `mat-datepicker-content button /^(Confirm\|Apply)$/` | – |
| GEP_ShippingBillingPage | defaultShippingPopupConfirmButton | Shipping & Billing- Default shipping popup > Confirm | not seen yet | Needs review | `dialog > button "Confirm"` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringOrderNameInput | Enter the Order and order count > Order Name | GEP2-18257 | Filled | `placeholder "Order Name"` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringNumberOfOrdersInput | Enter the Order and order count > NumberOfOrders | GEP2-18257 | Filled | `#hsTotalOrderId` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringFrequencyDropdown | Click Frequency selector dropdown > Fre | id suffix is the selected value | Filled | `mat-select[data-test-id^="shipping&billingpage_arrow_"]` | live site 2026-09-24 |
| GEP_ShippingBillingPage | recurringFrequencyOption(frequency) | Select the frequency value > FrequencyValue | GEP2-18257; parameterised by RECURRING_FREQUENCY | Filled | `role option /^{frequency}/` | live site 2026-09-24 |
| GEP_ReviewOrderPage | submitYourOrderButton | Review Order \| SubmitOrder > Submit Your Order | – | Filled | `[data-test-id="shipping_button_submit"] (first)` | live site 2026-09-24 |
| GEP_OrderConfirmationPage | orderSubmittedMessage | Checkout \| Order Confirmation > Your order has been submitted ! | page not seen yet | Needs review | `text /Your order has been submitted/` | live site 2026-09-24 |
| GEP_OrderConfirmationPage | orderNumberText | Order Number > Order Number | guess; page not seen yet | Needs review | `[data-test-id*="ordernumber" i] (first)` | live site 2026-09-24 |
| GEP_MyOrdersPage | accountDashboardLink | Click on Account Dashboard > Account Dashboard | – | TODO | – | – |
| GEP_MyOrdersPage | ordersTab | Click on Orders > Orders | – | TODO | – | – |
| GEP_MyOrdersPage | submittedOrderSearchInput | Orders \| Submitted order > Submitted order Search | – | TODO | – | – |
| GEP_MyOrdersPage | submittedOrderSearchButton | Orders \| Submitted order > Submitted order search-button | – | TODO | – | – |
| GEP_MyOrdersPage | firstRowOrderNumberCell | Orders \| Submitted order > Submitted order TABLE > $1 > $1 | row 1, col 1 | TODO | – | – |
| GEP_MyOrdersPage | headerOrdersAndReturnsButton | Navigate to My Orders Page | UK: header button | Filled | `role button /Orders & Returns/` | live site 2026-09-24 |
| GEP_MyOrdersPage | futureAndRecurringTab | Recurring Orders > Future & Recurring | GEP2-18257 | Filled | `[data-test-id="orders_tab_futureandrecurring"]` | live site 2026-09-24 |
| GEP_MyOrdersPage | recurringOrderSearchInput | Search the Order -RecurringOrderTab_GenZ_Reference > (search input) | GEP2-18257; reusable block not in export | Filled | `#future-recurring-tab-panel input[name="searchTerm"]` | live site 2026-09-24 |
| GEP_MyOrdersPage | recurringOrderSearchButton | Search the Order -RecurringOrderTab_GenZ_Reference > (search button) | GEP2-18257; reusable block not in export | Filled | `#future-recurring-tab-panel #search_btn` | live site 2026-09-24 |
| GEP_MyOrdersPage | recurringOrderFirstRowOrderNumberCell | Search the Order -RecurringOrderTab_GenZ_Reference > (row 1, order number) | holds "Nickname 0xxxxxxx" | Filled | `first data row > td (first)` | live site 2026-09-24 |
| GEP_MyOrdersPage | manageUpcomingButton | RecurringOrder\|ManageUpcoming > Manage Upcoming | GEP2-18257 | Filled | `first data row > text "Manage Upcoming"` | live site 2026-09-24 |
