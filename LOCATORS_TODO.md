# Locators to fill – GEP2-36899, GEP2-18257, GEP2-18230

Every locator below is a `this.todo(...)` placeholder. Fill them with `/tosca-to-pom fill <BASE_URL> [PageName]` once the site URL is confirmed.

Status: `TODO`, `Filled` or `Needs review`.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GepHomePage | headerSignInButton | Sign In > Sign In Button | – | Filled | `[data-test-id="user-login-click"]` | live site 2026-09-24 |
| GepHomePage | headerAccountMenuButton | Header \| sign out > IMG | "Hi, name" menu; hover shows Sign Out | Filled | `div.user-info` | GEP2-18230 branch |
| GepHomePage | headerSignOutLink | Header \| sign out > Sign Out | shown on hover | Filled | `button.signOut__link` | GEP2-18230 branch |
| GepHomePage | headerLogoutButton | HomePage \| Sign out > Logout | – | TODO | – | – |
| GepHomePage | domainSelectorBrowseLink(country, domain) | SignIn > Select Browse > Browse | UK only | Filled | `div.newdomain:has("<country> <domain>") a[data-test-id^="selectDomain.BrowseText"]` | GEP2-18230 branch |
| GepHomePage | headerCartIcon | Header \|Cart > cart-icon | logged-in icon; opens cart page directly | Filled | `[data-test-id="cart_image_icon"]` | live site 2026-09-24 |
| GepHomePage | headerCartCountText | Header \| CartItemCount > CartItemCount | absent when basket is empty | Filled | `[data-test-id="cart_image_qty"]` | live site 2026-09-24 |
| GepHomePage | headerSearchInput | GlobalSepdp_image_notfaviconarch > Search input box | – | Filled | `[data-test-id="RecipientUsername"]` | live site 2026-09-24 |
| GepHomePage | headerSearchButton | GlobalSepdp_image_notfaviconarch > Search Icon / basic-addon2 | id "basic-addon2"? | Filled | `[data-test-id="basic-addon2"]` | live site 2026-09-24 |
| GepPopups | launchPopupConfirmButton | Launch popup - confirm button > Confirmar | FR only, not on UK | Needs review | `role button "Confirmar"` | live site 2026-09-24 |
| GepPopups | cookieDialogAcceptAllButton | Cookie \| AcceptAll > Accept All | – | Filled | `dialog "Cookie Settings" > button "Accept all"` | live site 2026-09-24 |
| GepPopups | cookieAcceptAllFallbackButton | Accept Cookies > Accept All | fallback | Filled | `role button "Accept all"` | live site 2026-09-24 |
| GepPopups | adPopupCloseIcon | Click on Close for Ad > Close icon | GenY | TODO | – | – |
| GepPopups | freeItemContinueWithoutButton | Shopping Cart \| Free Item Popup > Continue Without Free Item | – | Filled | `[data-test-id="expressCheckoutPopup.ContinueWithoutBtnText4"]` | live site 2026-09-24 |
| GepPopups | inventoryNoticeContinueButton | – (not in Tosca) | US cart "Important:" notice | Filled | `[data-test-id="inventoryWHPopup.ContinueWithoutBtnText"]` | live site 2026-09-25 (US) |
| GepPopups | ordersAndReturnsDialogCloseButton | Orders & Returns > close | My Orders overlay | Needs review | `ngb-modal-window button /close/` | GEP2-18230 branch |
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
| GepShoppingCartPage | cartFirstItemCodeText | Waiton for ItemCode to display > Item code goes here | first cart item code | Filled | `[data-test-id="cart_textbox_itemcode"] (first)` | GEP2-18230 branch |
| GepShoppingCartPage | miniCartGuestViewCartButton | Shopping Cart\|GuestCartIcon > View Cart | no mini cart on UK site | TODO | – | – |
| GepShoppingCartPage | miniCartLoggedInViewCartButton | Shopping Cart\|LoggedInCartIcon > DIV | no mini cart on UK site | TODO | – | – |
| GepShoppingCartPage | cartClearBasketLink | Shopping Cart \| Clear Cart > Clear Cart | "Clear This Basket", no confirm | Filled | `[data-test-id="shoppingCart.RemoveCartText46"]` | live site 2026-09-24 |
| GepShoppingCartPage | cartProceedToShippingBillingButton | Checkout \| Proceed to Shipping and billing page > Shipping and billing button | – | Filled | `[data-test-id="cart_button_shippingbilling"]` | live site 2026-09-24 |
| GepShippingBillingPage | paymentMethodDropdown | GenX\|Shipping & Billing \| Payment method > downward arrow | GenX | Filled | `mat-select[formcontrolname="paymentformcontrolvalue"]` | live site 2026-09-24 |
| GepShippingBillingPage | paymentMethodBillOnAccountOption | GenX\|Shipping & Billing \| Payment method > Bill on Account | GenX | Filled | `role option "Bill On Account"` | live site 2026-09-24 |
| GepShippingBillingPage | paymentMethodDropdownGenY | Shipping & Billing chose Payment > downward arrow | GenY | TODO | – | – |
| GepShippingBillingPage | paymentMethodBillOnAccountOptionGenY | Shipping & Billing chose Payment > Bill on Account_GenY | GenY | TODO | – | – |
| GepShippingBillingPage | paymentMethodDropdownGenZ | IT Payment method / Select 1st payment method > Payment method | GenZ; native select? | TODO | – | – |
| GepShippingBillingPage | creditCardDialogCloseButtonIT | Shipping and billing \| Credit Card pop up IT > Close | GenZ IT | TODO | – | – |
| GepShippingBillingPage | poNumberInput | Shipping & Billing \| PO number > PO# value | – | Filled | `#poname` | live site 2026-09-24 |
| GepShippingBillingPage | poNumberAutomaticInputGenX | Enter PO Number > PO# Automatic | UK/US: same PO# field | Filled | `#poname` | GEP2-18230 branch |
| GepShippingBillingPage | reviewOrderButton | Click on Review Order > Review Order | – | Filled | `[data-test-id="shipping_button_revieworder"]` | live site 2026-09-24 |
| GepShippingBillingPage | budgetDialogSubmitOrderButton | Shipping & Billing \| SubmitOrder > Submit Order | not seen yet | Needs review | `ngb-modal-window button /submit order/` | GEP2-18230 branch |
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
| GepMyOrdersPage | accountDashboardLink | Click on Account Dashboard > Account Dashboard | header Orders & Returns button | Filled | `[data-test-id="user_details_component_button_13"]` | GEP2-18230 branch |
| GepMyOrdersPage | submittedOrdersTab | Click on Orders > Orders | – | TODO | – | – |
| GepMyOrdersPage | submittedOrdersSearchInput | Orders \| Submitted order > Submitted order Search | – | TODO | – | – |
| GepMyOrdersPage | submittedOrdersSearchButton | Orders \| Submitted order > Submitted order search-button | – | TODO | – | – |
| GepMyOrdersPage | submittedOrdersFirstRowOrderCell | Orders \| Submitted order > Submitted order TABLE > $1 > $1 | row 1, col 1 | TODO | – | – |
| GepMyOrdersPage | headerOrdersAndReturnsButton | Navigate to My Orders Page | UK: header button | Filled | `role button /Orders & Returns/` | live site 2026-09-24 |
| GepMyOrdersPage | submittedOrdersViewAndTrackLinks | Orders \| View&Track > View & Track | one per row | Filled | `a[data-test-id="submitted_orders_component_a_13"]:visible` | GEP2-18230 branch |
| GepMyOrdersPage | futureRecurringTab | Recurring Orders > Future & Recurring | GEP2-18257 | Filled | `[data-test-id="orders_tab_futureandrecurring"]` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringSearchInput | Search the Order -RecurringOrderTab_GenZ_Reference > (search input) | GEP2-18257; reusable block not in export | Filled | `#future-recurring-tab-panel input[name="searchTerm"]` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringSearchButton | Search the Order -RecurringOrderTab_GenZ_Reference > (search button) | GEP2-18257; reusable block not in export | Filled | `#future-recurring-tab-panel #search_btn` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringFirstRowOrderCell | Search the Order -RecurringOrderTab_GenZ_Reference > (row 1, order number) | holds "Nickname 0xxxxxxx" | Filled | `first data row > td (first)` | live site 2026-09-24 |
| GepMyOrdersPage | futureRecurringManageUpcomingLink | RecurringOrder\|ManageUpcoming > Manage Upcoming | GEP2-18257 | Filled | `first data row > text "Manage Upcoming"` | live site 2026-09-24 |
| GepOrderDetailsPage | reorderLink | OrderDetails\|Reorder > Reorder | – | Filled | `text "Reorder" (exact)` | GEP2-18230 branch |
| GepOrderDetailsPage | reorderDialogCloseButton | OrderDetails\|ReorderConfirmModal > close | – | Filled | `[data-test-id="view_and_track_my_orders_component_button_1"]` | GEP2-18230 branch |
| GepOrderDetailsPage | orderStatusText | Fetch the order status in order details page > Status | – | Filled | `[data-test-id="viewAndTrackMyOrders.OrderStatusText18"] + *` | GEP2-18230 branch |
