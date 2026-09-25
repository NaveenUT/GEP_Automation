# Locators to fill – GEP2-36899, GEP2-22324, GEP2-18559

Every locator below is a `this.todo(...)` placeholder. Fill them with `/tosca-to-pom fill <BASE_URL> [PageName]` once the site URL is confirmed.

Status: `TODO`, `Filled` or `Needs review`.

| Page | Getter | Tosca module > control | Hint | Status | Locator | Source |
|---|---|---|---|---|---|---|
| GEP_HomePage | signInButton | Sign In > Sign In Button | – | Filled | `#sign-in` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | headerUserMenuIcon | Header \| sign out > IMG | – | Filled | `getByRole('button', { name: 'Expand account menu' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | headerSignOutLink | Header \| sign out > Sign Out | seen in the expanded account menu; not clicked by GEP2-22324 | Filled | `getByRole('button', { name: 'Sign Out' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | logoutButton | HomePage \| Sign out > Logout | – | TODO | – | – |
| GEP_HomePage | domainBrowseButton | SignIn > Select Browse > Browse | UK only | Filled | dialog `label` filtered by `UK ${config.domain}` > `getByRole('link', { name: 'Browse' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | cartIcon | Header \|Cart > cart-icon | id "cart-icon"?; UK: opens /shoppingcart directly | Filled | `getByRole('button', { name: /^cart-icon/ })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | cartItemCount | Header \| CartItemCount > CartItemCount | id/class "CartItemCount"?; not rendered when the cart is empty | Filled | `[data-test-id="cart_image_qty"]` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | searchInput | GlobalSepdp_image_notfaviconarch > Search input box | – | Filled | `getByPlaceholder("Hello! Let's search together")` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_HomePage | searchButton | GlobalSepdp_image_notfaviconarch > Search Icon / basic-addon2 | id "basic-addon2"? | Filled | `getByRole('navigation', { name: 'Global Search' }).getByRole('button', { name: 'Search', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | launchConfirmButton | Launch popup - confirm button > Confirmar | from the Tosca label; not shown on UK (0 matches) | Needs review | `getByRole('button', { name: 'Confirmar' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | cookieAcceptAllButton | Cookie \| AcceptAll > Accept All | – | Filled | `getByRole('button', { name: 'Accept all' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | acceptCookiesAllButton | Accept Cookies > Accept All | may equal cookieAcceptAllButton; same element as cookieAcceptAllButton on UK | Filled | `getByRole('button', { name: 'Accept all' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | adPopupCloseIcon | Click on Close for Ad > Close icon | GenY | TODO | – | – |
| GEP_Popups | continueWithoutFreeItemButton | Shopping Cart \| Free Item Popup > Continue Without Free Item | from the Tosca label; not shown for DIS40302 (0 matches) | Needs review | `getByRole('button', { name: 'Continue Without Free Item' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | licenseSkipAndCompleteLaterButton | Shopping Cart \| License Skip > DIV > Skip And Complete Later | from the Tosca label; not shown for DIS40302 (0 matches) | Needs review | `getByText('Skip And Complete Later', { exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | controlledSubstancesConfirmSkipButton | Controlled Substances Form on Shopping Cart > Confirm Skip | from the Tosca label; not shown for DIS40302 (0 matches) | Needs review | `getByRole('button', { name: 'Confirm Skip' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | feedbackSurveyCloseButton | Close Customer FeedBack survey popup > Close Survey | GenX; from the Tosca label; survey not shown on UK QA | Needs review | `getByRole('button', { name: 'Close Survey' }).first()` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_Popups | feedbackSurveyCloseAltButton | Close Customer FeedBack survey popup > Close Survey_1 | GenX; from the Tosca label; survey not shown on UK QA | Needs review | `getByRole('button', { name: 'Close Survey' }).last()` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_LoginPage | usernameInput | Enter Valid creditionals > Username | – | Filled | dialog 'Sign in' > `getByRole('textbox', { name: 'Username', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_LoginPage | passwordInput | Enter Valid creditionals > Password | – | Filled | dialog 'Sign in' > `getByRole('textbox', { name: 'Password', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_LoginPage | signInSubmitButton | Login \| SignIn Button > Sign In | – | Filled | dialog 'Sign in' > `getByRole('button', { name: 'Sign In', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_LoginPage | securityQuestion1Dropdown | Click on the security question > Choose a security question* | from the Tosca label; not shown for this user (0 matches) | Needs review | `getByText('Choose a security question*', { exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_LoginPage | securityAnswer1Input | Enter the Answer > Your answer* | – | TODO | – | – |
| GEP_LoginPage | securityQuestion2Dropdown | Click on the security question > Choose second a security question* | – | TODO | – | – |
| GEP_LoginPage | securityAnswer2Input | Enter the Answer > Your answer*_1 | – | TODO | – | – |
| GEP_LoginPage | securityProceedButton | Click on proceed CTA > Proceed | – | TODO | – | – |
| GEP_SearchResultsPage | firstProductName | SRP \| Navigate to First Product > Product name | – | Filled | `[data-test-id="product-name"]` .first() | live site 2026-09-24 (UK Medical, GenX) |
| GEP_SearchResultsPage | firstProductId | SRP \| Navigate to First Product > Product ID | – | Filled | `[data-test-id="productdetails-standalone"]` .first() | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ProductDetailPage | quantityInput | PDP\|QuantityInput > quantity-box | id "quantity-box"? | TODO | – | – |
| GEP_ProductDetailPage | addToCartButton | Add to cart > PDP add to cart | – | Filled | `getByRole('button', { name: 'Add To Basket', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShoppingCartPage | miniCartItemCode | Waiton for ItemCode to display > Item code goes here | UK: field on the shopping basket page | Filled | `getByPlaceholder('Item code goes here')` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShoppingCartPage | guestViewCartButton | Shopping Cart\|GuestCartIcon > View Cart | – | TODO | – | – |
| GEP_ShoppingCartPage | loggedInViewCartButton | Shopping Cart\|LoggedInCartIcon > DIV | same element as GEP_HomePage.cartIcon | Filled | `getByRole('button', { name: /^cart-icon/ })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShoppingCartPage | clearCartButton | Shopping Cart \| Clear Cart > Clear Cart | no confirmation dialog | Filled | `getByText('Clear This Basket', { exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShoppingCartPage | proceedToShippingBillingButton | Checkout \| Proceed to Shipping and billing page > Shipping and billing button | – | Filled | `getByRole('button', { name: 'Proceed To Shipping & Billing' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShippingBillingPage | genXPaymentMethodArrow | GenX\|Shipping & Billing \| Payment method > downward arrow | GenX | Filled | `mat-select[formcontrolname="paymentformcontrolvalue"]` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShippingBillingPage | genXBillOnAccountOption | GenX\|Shipping & Billing \| Payment method > Bill on Account | GenX | Filled | `getByRole('option', { name: 'Bill On Account' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShippingBillingPage | genYPaymentMethodArrow | Shipping & Billing chose Payment > downward arrow | GenY | TODO | – | – |
| GEP_ShippingBillingPage | genYBillOnAccountOption | Shipping & Billing chose Payment > Bill on Account_GenY | GenY | TODO | – | – |
| GEP_ShippingBillingPage | genZPaymentMethodSelect | IT Payment method / Select 1st payment method > Payment method | GenZ; native select? | TODO | – | – |
| GEP_ShippingBillingPage | itCreditCardPopupCloseButton | Shipping and billing \| Credit Card pop up IT > Close | GenZ IT | TODO | – | – |
| GEP_ShippingBillingPage | poNumberInput | Shipping & Billing \| PO number > PO# value | – | TODO | – | – |
| GEP_ShippingBillingPage | poNumberAutomaticInput | Enter PO Number > PO# Automatic | GenX; empty on UK QA (not pre-filled) | Filled | `#poname` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShippingBillingPage | reviewOrderButton | Click on Review Order > Review Order | – | Filled | `getByRole('button', { name: 'Review Order' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ShippingBillingPage | budgetOverlaySubmitOrderButton | Shipping & Billing \| SubmitOrder > Submit Order | from the Tosca label; overlay not shown (0 matches) | Needs review | `getByRole('button', { name: 'Submit Order', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ReviewOrderPage | submitYourOrderButton | Review Order \| SubmitOrder > Submit Your Order | – | Filled | `getByRole('button', { name: 'Submit Your Order' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_OrderConfirmationPage | orderSubmittedMessage | Checkout \| Order Confirmation > Your order has been submitted ! | – | Filled | `getByRole('heading', { name: 'Your Order Has Been Submitted!' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_OrderConfirmationPage | orderNumberText | Order Number > Order Number | – | Filled | `[data-test-id="orderconfirmation_span_ordernumber"] + div` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | accountMenuButton | (not in Tosca export) | UK: Account Dashboard is inside the collapsed account menu | Filled | `getByRole('button', { name: 'Expand account menu' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | accountDashboardLink | Click on Account Dashboard > Account Dashboard | inside the account menu (accountMenuButton) | Filled | `getByRole('link', { name: 'Account Dashboard' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | ordersTab | Click on Orders > Orders | dashboard left menu | Filled | `getByRole('menuitem', { name: 'Orders & Returns' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | submittedOrderSearchInput | Orders \| Submitted order > Submitted order Search | – | TODO | – | – |
| GEP_MyOrdersPage | submittedOrderSearchButton | Orders \| Submitted order > Submitted order search-button | – | TODO | – | – |
| GEP_MyOrdersPage | firstRowOrderNumberCell | Orders \| Submitted order > Submitted order TABLE > $1 > $1 | row 1, col 1 | TODO | – | – |
| GEP_ProductDetailPage | uomUnitOption | PDP \| Unite | GEP2-22324; GenX/GenZ; no controls in export; UK: "Each" button; Tosca module has no controls | Filled | `[data-test-id="pdp_li_uom_value"]` .first() | live site 2026-09-24 (UK Medical, GenX) |
| GEP_ProductDetailPage | uomSelector | Verify Price Changes when UOM is changed_Reference > UOM selector | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GEP_ProductDetailPage | secondaryUomOption | Verify Price Changes when UOM is changed_Reference > secondary UOM option | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GEP_ProductDetailPage | productPrice | Verify Price Changes when UOM is changed_Reference > product price | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GEP_MyOrdersPage | ordersReturnsPopupCloseButton | Orders & Returns > close | GEP2-22324; optional overlay; from the Tosca label; overlay not shown (0 matches) | Needs review | `getByRole('dialog', { name: 'Orders & Returns' }).getByRole('button', { name: 'close' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | orderHistorySearchInput | My Account \| My Orders \| Search Orders > Search INput box | GEP2-22324; this account lists new orders under Pending Location Orders; other accounts may need the Submitted Orders search | Needs review | Pending Location Orders section > `getByRole('searchbox', { name: 'Search', exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | orderHistorySearchButton | My Account \| My Orders \| Search Orders > search_btn | GEP2-22324; id/class "search_btn"?; see orderHistorySearchInput | Needs review | Pending Location Orders section > `getByRole('button', { name: 'search-button' })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_MyOrdersPage | orderNumberLink(orderNumber) | Orders > OrderNumberPass in Buffer | GEP2-22324; dynamic, by order number | Filled | `getByRole('link', { name: orderNumber, exact: true })` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_OrderViewAndTrackPage | primaryUomForProduct(productId) | HenrySchein\| My Orders \| View&Track > Product In Order Page - Primary UOM | GEP2-22324; dynamic, by product ID | Filled | `.product-summary` filtered by productId > `[data-test-id="viewAndTrackMyOrders.UomText1"]` | live site 2026-09-24 (UK Medical, GenX) |
| GEP_OrderViewAndTrackPage | secondaryUomForProduct(productId) | Validate Presence of Primary&Secondary UOM_Reference > Secondary UOM | GEP2-22324; GenY; reusable block not in export | Needs review | – | – |
| GEP_ProductDetailPage | comDropdown | PDP\|COMDropdown > Dropdown Required* | GEP2-18559; optional | TODO | – | – |
| GEP_ProductDetailPage | comDropdownUsersOption | Select the dropdown value > users | GEP2-18559 | TODO | – | – |
| GEP_ProductDetailPage | rapideFixerTypeOption | Click FixerType > Rapide Fixer | GEP2-18559; FR only | TODO | – | – |
| GEP_ProductDetailPage | backorderModal | Verify the Backorder Modal is displayed > Modal | GEP2-18559; optional | TODO | – | – |
| GEP_ProductDetailPage | backorderModalAddToCartButton | Click Add to cart in Backorder Modal > Add To Cart | GEP2-18559 | TODO | – | – |
| GEP_ShoppingCartPage | cartSubtotalText | Fetch the cart subtotal after new product is added > SubTotal | GEP2-18559 | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrdersTab | Orders Page Tab > Unplaced Orders | GEP2-18559 | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderCreatedDateCell | Unplaced Orders Tab > TBODY > Created Date | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderCreatedByUserCell | Unplaced Orders Tab > TBODY > Created By User | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderShippingAccountNumberCell | Unplaced Orders Tab > TBODY > Shipping Account Number | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderSubtotalCell | Unplaced Orders Tab > TBODY > Subtotal Value | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderItemsCountCell | Unplaced Orders Tab > TBODY > Items Count | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderLocationAddressCell | Unplaced Orders Tab > TBODY > Location Address | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderLastModifiedDateCell | Unplaced Orders Tab > TBODY > Last Modified date | GEP2-18559; first row | TODO | – | – |
| GEP_MyOrdersPage | unplacedOrderViewAndModifyLink | Unplaced Orders Tab > TBODY > View & Modify | GEP2-18559; first row | TODO | – | – |
