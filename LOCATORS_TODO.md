# Locators to fill – GEP2-36899, GEP2-18230

Every locator below is a `this.todo(...)` placeholder. Fill them with `/tosca-to-pom fill <BASE_URL> [PageName]` once the site URL is confirmed.

Status: `TODO`, `Filled` or `Needs review`.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GEP_HomePage | signInButton | Sign In > Sign In Button | – | Filled | `#sign-in` | uk.qa.eschein.com |
| GEP_HomePage | headerUserMenuIcon | Header \| sign out > IMG | – | Filled | `div.user-info` (hover) | uk.qa.eschein.com |
| GEP_HomePage | headerSignOutLink | Header \| sign out > Sign Out | – | Filled | `button.signOut__link` | uk.qa.eschein.com |
| GEP_HomePage | logoutButton | HomePage \| Sign out > Logout | – | TODO | – | – |
| GEP_HomePage | domainBrowseButton | SignIn > Select Browse > Browse | UK only | Filled | `div.newdomain` with text `UK <domain>` > `a[data-test-id^="selectDomain.BrowseText"]` | uk.qa.eschein.com |
| GEP_HomePage | cartIcon | Header \|Cart > cart-icon | id "cart-icon"? | TODO | – | – |
| GEP_HomePage | cartItemCount | Header \| CartItemCount > CartItemCount | id/class "CartItemCount"? | TODO | – | – |
| GEP_HomePage | searchInput | GlobalSepdp_image_notfaviconarch > Search input box | – | TODO | – | – |
| GEP_HomePage | searchButton | GlobalSepdp_image_notfaviconarch > Search Icon / basic-addon2 | id "basic-addon2"? | TODO | – | – |
| GEP_Popups | launchConfirmButton | Launch popup - confirm button > Confirmar | – | Needs review | `getByRole('button', { name: 'Confirmar' })` (not on UK) | uk.qa.eschein.com |
| GEP_Popups | cookieAcceptAllButton | Cookie \| AcceptAll > Accept All | – | Filled | `getByTestId('uc-accept-all-button')` | uk.qa.eschein.com |
| GEP_Popups | acceptCookiesAllButton | Accept Cookies > Accept All | may equal cookieAcceptAllButton | Needs review | `getByRole('button', { name: /^accept all$/i })` | uk.qa.eschein.com |
| GEP_Popups | adPopupCloseIcon | Click on Close for Ad > Close icon | GenY | TODO | – | – |
| GEP_Popups | continueWithoutFreeItemButton | Shopping Cart \| Free Item Popup > Continue Without Free Item | – | TODO | – | – |
| GEP_Popups | licenseSkipAndCompleteLaterButton | Shopping Cart \| License Skip > DIV > Skip And Complete Later | – | TODO | – | – |
| GEP_Popups | controlledSubstancesConfirmSkipButton | Controlled Substances Form on Shopping Cart > Confirm Skip | – | TODO | – | – |
| GEP_Popups | feedbackSurveyCloseButton | Close Customer FeedBack survey popup > Close Survey | GenX | TODO | – | – |
| GEP_Popups | feedbackSurveyCloseAltButton | Close Customer FeedBack survey popup > Close Survey_1 | GenX | TODO | – | – |
| GEP_LoginPage | usernameInput | Enter Valid creditionals > Username | – | Filled | `[data-test-id="SignInUserNameInput"]` | uk.qa.eschein.com |
| GEP_LoginPage | passwordInput | Enter Valid creditionals > Password | – | Filled | `[data-test-id="SignInPasswordInput"]` | uk.qa.eschein.com |
| GEP_LoginPage | signInSubmitButton | Login \| SignIn Button > Sign In | – | Filled | `[data-test-id="sign-in-button"]` | uk.qa.eschein.com |
| GEP_LoginPage | securityQuestion1Dropdown | Click on the security question > Choose a security question* | – | Needs review | `getByText('Choose a security question')` (not shown for UK users) | uk.qa.eschein.com |
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

## Added for GEP2-18230 (Reorder from Order History)

The GEP2-18230 flow also uses the locators above for the header, login, popups, cart, checkout and order confirmation.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GEP_MyOrdersPage | myOrdersSearchInput | My Account \| My Orders \| Search Orders > Search INput box | may equal submittedOrderSearchInput | TODO | – | – |
| GEP_MyOrdersPage | myOrdersSearchButton | My Account \| My Orders \| Search Orders > search_btn | id/class "search_btn"? | TODO | – | – |
| GEP_MyOrdersPage | viewAndTrackButtons | Orders \| View&Track > View & Track | should match every row; spec uses `.first()` | TODO | – | – |
| GEP_OrderDetailsPage | reorderLink | OrderDetails\|Reorder > Reorder | – | TODO | – | – |
| GEP_OrderDetailsPage | reorderConfirmModalCloseButton | OrderDetails\|ReorderConfirmModal > close | – | TODO | – | – |
| GEP_OrderDetailsPage | orderStatusText | Fetch the order status in order details page > Status | – | TODO | – | – |
| GEP_Popups | ordersAndReturnsCloseButton | Orders & Returns > close | My Orders overlay | TODO | – | – |
