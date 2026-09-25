# Locators to fill – GEP2-36899, GEP2-18257, GEP2-22324, GEP2-18559, GEP2-18230

Every locator below is a `this.todo(...)` placeholder. Fill them with `/tosca-to-pom fill <BASE_URL> [PageName]` once the site URL is confirmed.

Status: `TODO`, `Filled` or `Needs review`.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GepHomePage | headerSignInButton | Sign In > Sign In Button | – | Filled | `[data-test-id="user-login-click"]` | live site 2026-09-24 |
| GepHomePage | headerAccountMenuButton | Header \| sign out > IMG | – | Filled | `role button "Expand account menu"` | live site 2026-09-24 |
| GepHomePage | headerSignOutLink | Header \| sign out > Sign Out | not seen yet | Needs review | `role button/link "Sign Out"` | live site 2026-09-24 |
| GepHomePage | headerLogoutButton | HomePage \| Sign out > Logout | – | TODO | – | – |
| GepHomePage | domainSelectorBrowseLink | SignIn > Select Browse > Browse | UK only | Filled | `domain dialog > label "UK {DOMAIN}" > link "Browse"` | live site 2026-09-24 |
| GepHomePage | headerCartIcon | Header \|Cart > cart-icon | logged-in icon; opens cart page directly | Filled | `[data-test-id="cart_image_icon"]` | live site 2026-09-24 |
| GepHomePage | headerCartCountText | Header \| CartItemCount > CartItemCount | absent when basket is empty | Filled | `[data-test-id="cart_image_qty"]` | live site 2026-09-24 |
| GepHomePage | headerSearchInput | GlobalSepdp_image_notfaviconarch > Search input box | – | Filled | `[data-test-id="RecipientUsername"]` | live site 2026-09-24 |
| GepHomePage | headerSearchButton | GlobalSepdp_image_notfaviconarch > Search Icon / basic-addon2 | id "basic-addon2"? | Filled | `[data-test-id="basic-addon2"]` | live site 2026-09-24 |
| GepPopups | inventoryNoticeContinueButton | (not in Tosca export) | US only: "Important: The total shown may not include all applicable charges" notice after Proceed To Shipping & Billing | Filled | `[data-test-id="inventoryWHPopup.ContinueWithoutBtnText"]` | live site 2026-09-25 (US) |
| GepPopups | launchPopupConfirmButton | Launch popup - confirm button > Confirmar | FR only, not on UK | Needs review | `role button "Confirmar"` | live site 2026-09-24 |
| GepPopups | cookieDialogAcceptAllButton | Cookie \| AcceptAll > Accept All | – | Filled | `dialog "Cookie Settings" > button "Accept all"` | live site 2026-09-24 |
| GepPopups | cookieAcceptAllFallbackButton | Accept Cookies > Accept All | fallback | Filled | `role button "Accept all"` | live site 2026-09-24 |
| GepPopups | adPopupCloseIcon | Click on Close for Ad > Close icon | GenY | TODO | – | – |
| GepPopups | freeItemContinueWithoutButton | Shopping Cart \| Free Item Popup > Continue Without Free Item | – | Filled | `[data-test-id="expressCheckoutPopup.ContinueWithoutBtnText4"]` | live site 2026-09-24 |
| GepPopups | licenseSkipAndCompleteLaterButton | Shopping Cart \| License Skip > DIV > Skip And Complete Later | not seen yet | Needs review | `role button /Skip And Complete Later/` | live site 2026-09-24 |
| GepPopups | controlledSubstancesConfirmSkipButton | Controlled Substances Form on Shopping Cart > Confirm Skip | not seen yet | Needs review | `role button /Confirm Skip/` | live site 2026-09-24 |
| GepPopups | feedbackSurveyCloseButton | Close Customer FeedBack survey popup > Close Survey | guess; confirmation page not seen yet | Needs review | `role button /close survey/` | live site 2026-09-24 |
| GepPopups | feedbackSurveyCloseAltButton | Close Customer FeedBack survey popup > Close Survey_1 | guess | Needs review | `dialog /survey\|feedback/ > button /close/` | live site 2026-09-24 |
| GepLoginPage | loginUsernameInput | Enter Valid creditionals > Username | – | Filled | `[data-test-id="SignInUserNameInput"]` | live site 2026-09-24 |
| GepLoginPage | loginPasswordInput | Enter Valid creditionals > Password | – | Filled | `[data-test-id="SignInPasswordInput"]` | live site 2026-09-24 |
| GepLoginPage | loginSignInButton | Login \| SignIn Button > Sign In | – | Filled | `[data-test-id="sign-in-button"]` | live site 2026-09-24 |
| GepLoginPage | securityQuestion1Dropdown | Click on the security question > Choose a security question* | not shown for ukdental2 | Needs review | `text "Choose a security question"` | live site 2026-09-24 |
| GepLoginPage | securityAnswer1Input | Enter the Answer > Your answer* | – | TODO | – | – |
| GepLoginPage | securityQuestion2Dropdown | Click on the security question > Choose second a security question* | – | TODO | – | – |
| GepLoginPage | securityAnswer2Input | Enter the Answer > Your answer*_1 | – | TODO | – | – |
| GepLoginPage | securityProceedButton | Click on proceed CTA > Proceed | – | TODO | – | – |
| GepSearchResultsPage | firstResultProductNameText | SRP \| Navigate to First Product > Product name | – | Filled | `[data-test-id="product-name"] (first)` | live site 2026-09-24 |
| GepSearchResultsPage | firstResultProductIdText | SRP \| Navigate to First Product > Product ID | – | Filled | `[data-test-id="srp_listview_text_productid"] (first)` | live site 2026-09-24 |
| GepProductDetailPage | pdpQuantityInput | PDP\|QuantityInput > quantity-box | id "quantity-box"? | Filled | `[data-test-id="pdp_input_quantityinput"]` | live site 2026-09-24 |
| GepProductDetailPage | pdpAddToCartButton | Add to cart > PDP add to cart (also PDP \| Add To Cart > Add To Cart) | carousels reuse pdp_button_addcart | Filled | `[data-test-id="pdp_button_additemtocart"] [data-test-id="pdp_button_addcart"]` | live site 2026-09-24 |
| GepProductDetailPage | pdpComDropdown | PDP\|COMDropdown > Dropdown Required* | not on product 143513 | Needs review | `role combobox /Required/` | live site 2026-09-24 |
| GepProductDetailPage | pdpComUsersOption | Select the dropdown value > users | GEP2-18257 | TODO | – | – |
| GepProductDetailPage | pdpRapideFixerOption | Click FixerType > Rapide Fixer | GEP2-18257; FR only | TODO | – | – |
| GepProductDetailPage | backorderDialog | Verify the Backorder Modal is displayed > Modal | not seen yet | Needs review | `dialog /back ?order/` | live site 2026-09-24 |
| GepProductDetailPage | backorderDialogAddToCartButton | Click Add to cart in Backorder Modal > Add To Cart | not seen yet | Needs review | `backorderDialog > button /Add To (Basket\|Cart)/` | live site 2026-09-24 |
| GepShoppingCartPage | cartItemCodeInput | Waiton for ItemCode to display > Item code goes here | cart page quick-order box | Filled | `placeholder "Item code goes here"` | live site 2026-09-24 |
| GepShoppingCartPage | miniCartGuestViewCartButton | Shopping Cart\|GuestCartIcon > View Cart | no mini cart on UK site | TODO | – | – |
| GepShoppingCartPage | miniCartLoggedInViewCartButton | Shopping Cart\|LoggedInCartIcon > DIV | no mini cart on UK site; UK: the header cart DIV (role=button) | Filled | `getByRole('button', { name: /^cart-icon/ })` | live site 2026-09-24 (UK Medical, GenX) |
| GepShoppingCartPage | cartClearBasketLink | Shopping Cart \| Clear Cart > Clear Cart | "Clear This Basket", no confirm | Filled | `[data-test-id="shoppingCart.RemoveCartText46"]` | live site 2026-09-24 |
| GepShoppingCartPage | cartProceedToShippingBillingButton | Checkout \| Proceed to Shipping and billing page > Shipping and billing button | – | Filled | `[data-test-id="cart_button_shippingbilling"]` | live site 2026-09-24 |
| GepShippingBillingPage | paymentMethodDropdown | GenX\|Shipping & Billing \| Payment method > downward arrow | GenX | Filled | `mat-select[formcontrolname="paymentformcontrolvalue"]` | live site 2026-09-24 |
| GepShippingBillingPage | paymentMethodBillOnAccountOption | GenX\|Shipping & Billing \| Payment method > Bill on Account | GenX | Filled | `role option "Bill On Account"` | live site 2026-09-24 |
| GepShippingBillingPage | paymentMethodDropdownGenY | Shipping & Billing chose Payment > downward arrow | GenY | TODO | – | – |
| GepShippingBillingPage | paymentMethodBillOnAccountOptionGenY | Shipping & Billing chose Payment > Bill on Account_GenY | GenY | TODO | – | – |
| GepShippingBillingPage | paymentMethodDropdownGenZ | IT Payment method / Select 1st payment method > Payment method | GenZ; native select? | TODO | – | – |
| GepShippingBillingPage | creditCardDialogCloseButtonIT | Shipping and billing \| Credit Card pop up IT > Close | GenZ IT | TODO | – | – |
| GepShippingBillingPage | poNumberInput | Shipping & Billing \| PO number > PO# value | – | Filled | `#poname` | live site 2026-09-24 |
| GepShippingBillingPage | poNumberAutomaticInputGenX | Enter PO Number > PO# Automatic | no separate field on UK site; same "PO#" field, empty | Filled | `#poname` | live site 2026-09-24 (UK Medical, GenX) |
| GepShippingBillingPage | reviewOrderButton | Click on Review Order > Review Order | – | Filled | `[data-test-id="shipping_button_revieworder"]` | live site 2026-09-24 |
| GepShippingBillingPage | budgetDialogSubmitOrderButton | Shipping & Billing \| SubmitOrder > Submit Order | not seen yet | Needs review | `dialog > button "Submit Order"` | live site 2026-09-24 |
| GepShippingBillingPage | recurringScheduleRadio | Select Recurring Tab > RECURRING | UK: radio, not a tab | Filled | `input[name="scheduleOption"][value="RECURRING"]` | live site 2026-09-24 |
| GepShippingBillingPage | recurringStartDateInput | Recurring Order\|InputDate > Click to pick a date | shows picked date dd/mm/yyyy | Filled | `placeholder "Pick a Date"` | live site 2026-09-24 |
| GepShippingBillingPage | recurringStartDateCalendarButton | Open Calendar > Open calendar | "Open calendar" seen in ARIA snapshot | Needs review | `mat-form-field:has(Pick a Date) > button "Open calendar"` | – |
| GepShippingBillingPage | recurringStartDateCalendarDialog | Click on dateselector Body > TBODY | Material calendar overlay | Needs review | `mat-calendar` | – |
| GepShippingBillingPage | recurringStartDateCalendarPeriodButton | – | month header, e.g. "SEP 2026" | Needs review | `mat-calendar .mat-calendar-period-button` | – |
| GepShippingBillingPage | recurringStartDateCalendarNextButton | – | next-month arrow | Needs review | `mat-calendar .mat-calendar-next-button` | – |
| GepShippingBillingPage | recurringStartDateDayButton(day) | – | enabled day cell | Needs review | `mat-calendar .mat-calendar-body-cell:not(.mat-calendar-body-disabled)` + day text | – |
| GepShippingBillingPage | recurringStartDateConfirmButton | Click on Confirm Button > Confirm | only if the calendar has action buttons | Needs review | `mat-datepicker-content button /^(Confirm\|Apply)$/` | – |
| GepShippingBillingPage | defaultShippingDialogConfirmButton | Shipping & Billing- Default shipping popup > Confirm | not seen yet | Needs review | `dialog > button "Confirm"` | live site 2026-09-24 |
| GepShippingBillingPage | recurringOrderNameInput | Enter the Order and order count > Order Name | GEP2-18257 | Filled | `placeholder "Order Name"` | live site 2026-09-24 |
| GepShippingBillingPage | recurringNumberOfOrdersInput | Enter the Order and order count > NumberOfOrders | GEP2-18257 | Filled | `#hsTotalOrderId` | live site 2026-09-24 |
| GepShippingBillingPage | recurringFrequencyDropdown | Click Frequency selector dropdown > Fre | id suffix is the selected value | Filled | `mat-select[data-test-id^="shipping&billingpage_arrow_"]` | live site 2026-09-24 |
| GepShippingBillingPage | recurringFrequencyOption(frequency) | Select the frequency value > FrequencyValue | GEP2-18257; parameterised by RECURRING_FREQUENCY | Filled | `role option /^{frequency}/` | live site 2026-09-24 |
| GepReviewOrderPage | submitYourOrderButton | Review Order \| SubmitOrder > Submit Your Order | – | Filled | `[data-test-id="shipping_button_submit"] (first)` | live site 2026-09-24 |
| GepOrderConfirmationPage | orderSubmittedText | Checkout \| Order Confirmation > Your order has been submitted ! | page not seen yet | Needs review | `text /Your order has been submitted/` | live site 2026-09-24 |
| GepOrderConfirmationPage | orderNumberText | Order Number > Order Number | guess; page not seen yet | Needs review | `[data-test-id*="ordernumber" i] (first)` | live site 2026-09-24 |
| GepMyOrdersPage | accountDashboardLink | Click on Account Dashboard > Account Dashboard | UK: inside the account menu (accountMenuButton) | Filled | `getByRole('link', { name: 'Account Dashboard' })` | live site 2026-09-24 (UK Medical, GenX) |
| GepMyOrdersPage | submittedOrdersTab | Click on Orders > Orders | – | TODO | – | – |
| GepMyOrdersPage | submittedOrdersSearchInput | Orders \| Submitted order > Submitted order Search | – | TODO | – | – |
| GepMyOrdersPage | submittedOrdersSearchButton | Orders \| Submitted order > Submitted order search-button | – | TODO | – | – |
| GepMyOrdersPage | submittedOrdersFirstRowOrderCell | Orders \| Submitted order > Submitted order TABLE > $1 > $1 | row 1, col 1 | TODO | – | – |
| GepMyOrdersPage | headerOrdersAndReturnsButton | Navigate to My Orders Page | UK: header button | Filled | `role button /Orders & Returns/` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringTab | Recurring Orders > Future & Recurring | GEP2-18257 | Filled | `[data-test-id="orders_tab_futureandrecurring"]` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringSearchInput | Search the Order -RecurringOrderTab_GenZ_Reference > (search input) | GEP2-18257; reusable block not in export | Filled | `#future-recurring-tab-panel input[name="searchTerm"]` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringSearchButton | Search the Order -RecurringOrderTab_GenZ_Reference > (search button) | GEP2-18257; reusable block not in export | Filled | `#future-recurring-tab-panel #search_btn` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringFirstRowOrderCell | Search the Order -RecurringOrderTab_GenZ_Reference > (row 1, order number) | holds "Nickname 0xxxxxxx" | Filled | `first data row > td (first)` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringManageUpcomingLink | RecurringOrder\|ManageUpcoming > Manage Upcoming | GEP2-18257 | Filled | `first data row > text "Manage Upcoming"` | live site 2026-09-24 |
| GepProductDetailPage | uomUnitOption | PDP \| Unite | GEP2-22324; GenX/GenZ; UK: "Each" button, Tosca module has no controls | Filled | `[data-test-id="pdp_li_uom_value"]` .first() | live site 2026-09-24 (UK Medical, GenX) |
| GepProductDetailPage | uomSelector | Verify Price Changes when UOM is changed_Reference > UOM selector | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GepProductDetailPage | secondaryUomOption | Verify Price Changes when UOM is changed_Reference > secondary UOM option | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GepProductDetailPage | productPrice | Verify Price Changes when UOM is changed_Reference > product price | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GepShoppingCartPage | cartSubtotalText | Fetch the cart subtotal after new product is added > SubTotal | GEP2-18559 | TODO | – | – |
| GepMyOrdersPage | accountMenuButton | (not in Tosca export) | GEP2-22324; UK: Account Dashboard is inside the collapsed account menu | Filled | `getByRole('button', { name: 'Expand account menu' })` | live site 2026-09-24 (UK Medical, GenX) |
| GepMyOrdersPage | ordersTab | Click on Orders > Orders | GEP2-22324; Account Dashboard left menu: UK "Orders & Returns", US "Orders" | Filled | `getByRole('menuitem', { name: /^My Orders Left Menu Icon Orders/ })` | live site 2026-09-25 (UK + US, GenX) |
| GepMyOrdersPage | ordersReturnsPopupCloseButton | Orders & Returns > close | GEP2-22324; from the Tosca label; overlay not shown (0 matches) | Needs review | `getByRole('dialog', { name: 'Orders & Returns' }).getByRole('button', { name: 'close' })` | live site 2026-09-24 (UK Medical, GenX) |
| GepMyOrdersPage | orderHistorySearchInput | My Account \| My Orders \| Search Orders > Search INput box | GEP2-22324; this account lists new orders under Pending Location Orders; other accounts may need the Submitted Orders search | Needs review | Pending Location Orders section > `getByRole('searchbox', { name: 'Search', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GepMyOrdersPage | orderHistorySearchButton | My Account \| My Orders \| Search Orders > search_btn | GEP2-22324; see orderHistorySearchInput | Needs review | Pending Location Orders section > `getByRole('button', { name: 'search-button' })` | live site 2026-09-24 (UK Medical, GenX) |
| GepMyOrdersPage | orderNumberLink(orderNumber) | Orders > OrderNumberPass in Buffer | GEP2-22324 | Filled | `getByRole('link', { name: orderNumber, exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GepMyOrdersPage | unplacedOrdersTab | Orders Page Tab > Unplaced Orders | GEP2-18559 | TODO | – | – |
| GepMyOrdersPage | unplacedOrderCreatedDateCell | Unplaced Orders Tab > TBODY > Created Date | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderCreatedByUserCell | Unplaced Orders Tab > TBODY > Created By User | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderShippingAccountNumberCell | Unplaced Orders Tab > TBODY > Shipping Account Number | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderSubtotalCell | Unplaced Orders Tab > TBODY > Subtotal Value | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderItemsCountCell | Unplaced Orders Tab > TBODY > Items Count | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderLocationAddressCell | Unplaced Orders Tab > TBODY > Location Address | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderLastModifiedDateCell | Unplaced Orders Tab > TBODY > Last Modified date | GEP2-18559; first row | TODO | – | – |
| GepMyOrdersPage | unplacedOrderViewAndModifyLink | Unplaced Orders Tab > TBODY > View & Modify | GEP2-18559; first row | TODO | – | – |
| GepOrderViewAndTrackPage | primaryUomForProduct(productId) | HenrySchein\| My Orders \| View&Track > Product In Order Page - Primary UOM | GEP2-22324; by product ID | Filled | `.product-summary` filtered by productId > `[data-test-id="viewAndTrackMyOrders.UomText1"]` | live site 2026-09-24 (UK Medical, GenX) |
| GepOrderViewAndTrackPage | secondaryUomForProduct(productId) | Validate Presence of Primary&Secondary UOM_Reference > Secondary UOM | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |


## GEP_* page objects (Gopika branch, used by GEP2-18230 via fixtures/legacyFixtures.ts)

Rows as they were on Branch_GEP. Several of these getters already have real locators in pages/GEP_*.ts; the statuses below were not updated there.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GEP_HomePage | signInButton | Sign In > Sign In Button | – | TODO | – | – |
| GEP_HomePage | headerUserMenuIcon | Header \| sign out > IMG | – | TODO | – | – |
| GEP_HomePage | headerSignOutLink | Header \| sign out > Sign Out | – | TODO | – | – |
| GEP_HomePage | logoutButton | HomePage \| Sign out > Logout | – | TODO | – | – |
| GEP_HomePage | domainBrowseButton | SignIn > Select Browse > Browse | UK only | TODO | – | – |
| GEP_HomePage | cartIcon | Header \|Cart > cart-icon | id "cart-icon"? | TODO | – | – |
| GEP_HomePage | cartItemCount | Header \| CartItemCount > CartItemCount | id/class "CartItemCount"? | TODO | – | – |
| GEP_HomePage | searchInput | GlobalSepdp_image_notfaviconarch > Search input box | – | TODO | – | – |
| GEP_HomePage | searchButton | GlobalSepdp_image_notfaviconarch > Search Icon / basic-addon2 | id "basic-addon2"? | TODO | – | – |
| GEP_Popups | launchConfirmButton | Launch popup - confirm button > Confirmar | – | TODO | – | – |
| GEP_Popups | cookieAcceptAllButton | Cookie \| AcceptAll > Accept All | – | TODO | – | – |
| GEP_Popups | acceptCookiesAllButton | Accept Cookies > Accept All | may equal cookieAcceptAllButton | TODO | – | – |
| GEP_Popups | adPopupCloseIcon | Click on Close for Ad > Close icon | GenY | TODO | – | – |
| GEP_Popups | continueWithoutFreeItemButton | Shopping Cart \| Free Item Popup > Continue Without Free Item | – | TODO | – | – |
| GEP_Popups | licenseSkipAndCompleteLaterButton | Shopping Cart \| License Skip > DIV > Skip And Complete Later | – | TODO | – | – |
| GEP_Popups | controlledSubstancesConfirmSkipButton | Controlled Substances Form on Shopping Cart > Confirm Skip | – | TODO | – | – |
| GEP_Popups | feedbackSurveyCloseButton | Close Customer FeedBack survey popup > Close Survey | GenX | TODO | – | – |
| GEP_Popups | feedbackSurveyCloseAltButton | Close Customer FeedBack survey popup > Close Survey_1 | GenX | TODO | – | – |
| GEP_LoginPage | usernameInput | Enter Valid creditionals > Username | – | TODO | – | – |
| GEP_LoginPage | passwordInput | Enter Valid creditionals > Password | – | TODO | – | – |
| GEP_LoginPage | signInSubmitButton | Login \| SignIn Button > Sign In | – | TODO | – | – |
| GEP_LoginPage | securityQuestion1Dropdown | Click on the security question > Choose a security question* | – | TODO | – | – |
| GEP_LoginPage | securityAnswer1Input | Enter the Answer > Your answer* | – | TODO | – | – |
| GEP_LoginPage | securityQuestion2Dropdown | Click on the security question > Choose second a security question* | – | TODO | – | – |
| GEP_LoginPage | securityAnswer2Input | Enter the Answer > Your answer*_1 | – | TODO | – | – |
| GEP_LoginPage | securityProceedButton | Click on proceed CTA > Proceed | – | TODO | – | – |
| GEP_SearchResultsPage | firstProductName | SRP \| Navigate to First Product > Product name | – | TODO | – | – |
| GEP_SearchResultsPage | firstProductId | SRP \| Navigate to First Product > Product ID | – | TODO | – | – |
| GEP_ProductDetailPage | quantityInput | PDP\|QuantityInput > quantity-box | id "quantity-box"? | TODO | – | – |
| GEP_ProductDetailPage | addToCartButton | Add to cart > PDP add to cart | – | TODO | – | – |
| GEP_ShoppingCartPage | miniCartItemCode | Waiton for ItemCode to display > Item code goes here | – | TODO | – | – |
| GEP_ShoppingCartPage | guestViewCartButton | Shopping Cart\|GuestCartIcon > View Cart | – | TODO | – | – |
| GEP_ShoppingCartPage | loggedInViewCartButton | Shopping Cart\|LoggedInCartIcon > DIV | – | TODO | – | – |
| GEP_ShoppingCartPage | clearCartButton | Shopping Cart \| Clear Cart > Clear Cart | – | TODO | – | – |
| GEP_ShoppingCartPage | proceedToShippingBillingButton | Checkout \| Proceed to Shipping and billing page > Shipping and billing button | – | TODO | – | – |
| GEP_ShippingBillingPage | genXPaymentMethodArrow | GenX\|Shipping & Billing \| Payment method > downward arrow | GenX | TODO | – | – |
| GEP_ShippingBillingPage | genXBillOnAccountOption | GenX\|Shipping & Billing \| Payment method > Bill on Account | GenX | TODO | – | – |
| GEP_ShippingBillingPage | genYPaymentMethodArrow | Shipping & Billing chose Payment > downward arrow | GenY | TODO | – | – |
| GEP_ShippingBillingPage | genYBillOnAccountOption | Shipping & Billing chose Payment > Bill on Account_GenY | GenY | TODO | – | – |
| GEP_ShippingBillingPage | genZPaymentMethodSelect | IT Payment method / Select 1st payment method > Payment method | GenZ; native select? | TODO | – | – |
| GEP_ShippingBillingPage | itCreditCardPopupCloseButton | Shipping and billing \| Credit Card pop up IT > Close | GenZ IT | TODO | – | – |
| GEP_ShippingBillingPage | poNumberInput | Shipping & Billing \| PO number > PO# value | – | TODO | – | – |
| GEP_ShippingBillingPage | poNumberAutomaticInput | Enter PO Number > PO# Automatic | GenX | TODO | – | – |
| GEP_ShippingBillingPage | reviewOrderButton | Click on Review Order > Review Order | – | TODO | – | – |
| GEP_ShippingBillingPage | budgetOverlaySubmitOrderButton | Shipping & Billing \| SubmitOrder > Submit Order | – | TODO | – | – |
| GEP_ReviewOrderPage | submitYourOrderButton | Review Order \| SubmitOrder > Submit Your Order | – | TODO | – | – |
| GEP_OrderConfirmationPage | orderSubmittedMessage | Checkout \| Order Confirmation > Your order has been submitted ! | – | TODO | – | – |
| GEP_OrderConfirmationPage | orderNumberText | Order Number > Order Number | – | TODO | – | – |
| GEP_MyOrdersPage | accountDashboardLink | Click on Account Dashboard > Account Dashboard | – | TODO | – | – |
| GEP_MyOrdersPage | ordersTab | Click on Orders > Orders | – | TODO | – | – |
| GEP_MyOrdersPage | submittedOrderSearchInput | Orders \| Submitted order > Submitted order Search | – | TODO | – | – |
| GEP_MyOrdersPage | submittedOrderSearchButton | Orders \| Submitted order > Submitted order search-button | – | TODO | – | – |
| GEP_MyOrdersPage | firstRowOrderNumberCell | Orders \| Submitted order > Submitted order TABLE > $1 > $1 | row 1, col 1 | TODO | – | – |
