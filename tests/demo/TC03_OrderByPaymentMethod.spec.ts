import { test, expect, DEMO_TEST_TIMEOUT } from '../../fixtures/demoFixtures';
import { DEMO_TC03, demoTc03PaymentDetails } from '../../data/demo/demoTestCases';

/**
 * Manual test case TC03 (Product Management), from the Tosca execution report: four test cases
 * "TC03_Demowebshop_Order By Cashon Delivery / Credit Card / Check Money Order / Purchase Order" (25 steps each).
 * The variants differ only at step 17 (Payments Option) and step 19 (payment details); one test per variant.
 * Every run places one real order per variant on the demo shop.
 *
 * @manual manual-test-cases/TC03_Demowebshop_Order_By_Payment_Method.md
 */
test.describe('Demo Web Shop - Product Management', () => {
  test.describe.configure({ timeout: DEMO_TEST_TIMEOUT });

  for (const variant of DEMO_TC03.variants) {
    test(`${variant.toscaName} @${DEMO_TC03.tcId} @demo @productManagement`, async ({
      session, header, homePage, categoryPage, productPage, cartPage, checkoutPage, orderCompletedPage,
    }) => {
      // Step 1: Open Demowebshop.
      await test.step('Step 1: Open Demowebshop', () => session.openSite());

      // Step 2: Tosca Wait On Open for the window caption "Demo*".
      await test.step('Step 2: Wait for PageLoad', () => homePage.expectLoaded());

      // Step 3: Account Menu = Log in, Email = {PL[Email]}, Password = {PL[Password]}, UserLogin = {Click}. Login from .env.
      await test.step('Step 3: Click on Login', () => session.login());

      // Step 4: Account Link = True (WaitOn).
      await test.step('Step 4: Wait for HomePage Load', () => session.expectLoggedIn());

      // Step 5: Product Categories = BOOKS.
      await test.step(`Step 5: Click on ${DEMO_TC03.category.name}`, async () => {
        await header.openCategory(DEMO_TC03.category.slug);
        await categoryPage.expectDisplayed(DEMO_TC03.category.name);
      });

      // Step 6: Tosca buffer Product Link = Fiction (a script variable here).
      const productLink = await test.step(`Step 6: Set ProductLink Buffer to "${DEMO_TC03.productLink}"`, () => {
        const value = DEMO_TC03.productLink;
        expect(value, 'Product Link buffer').toBe(DEMO_TC03.productLink);
        test.info().annotations.push({ type: 'Product Link', description: value });
        return value;
      });

      // Step 7: #1 = {Click}: the first product with that name (Books also lists "Fiction EX").
      await test.step(`Step 7: Click on ${productLink}`, async () => {
        await categoryPage.openProduct(productLink, DEMO_TC03.productPosition);
        await productPage.expectProductName(productLink);
      });

      // Step 8: evidence, attached to the report.
      await test.step('Step 8: Take Screenshot', async () => {
        await test.info().attach(`Step 8 - ${productLink}`, { body: await productPage.takeScreenshot(), contentType: 'image/png' });
      });

      // Step 9: Add to Cart #1 = {Click}.
      await test.step('Step 9: Click on Add to Cart', async () => {
        await productPage.addToCart(DEMO_TC03.addToCartPosition);
        await header.expectAddedToCartNotification();
      });

      // Step 10: evidence, attached to the report.
      await test.step('Step 10: Take Screenshot', async () => {
        await test.info().attach('Step 10 - Added to cart', { body: await productPage.takeScreenshot(), contentType: 'image/png' });
      });

      // Step 11: shopping cart = {Click}.
      await test.step('Step 11: Click on Shopping cart link', () => header.openShoppingCart());

      // Step 12: Shopping Cart #1 Remove = {Click}, Agree Terms = True, Checkout = {Click} (as in the Tosca run).
      await test.step('Step 12: Perform Checkout', () => cartPage.performCheckout(DEMO_TC03.cartRowPosition));

      // Step 13: evidence, attached to the report.
      await test.step('Step 13: Take Screenshot', async () => {
        await test.info().attach('Step 13 - Checkout', { body: await checkoutPage.takeScreenshot(), contentType: 'image/png' });
      });

      // Step 14: Billing Address Continue = {Click}.
      await test.step('Step 14: Click on Continue in Billing Address', () => checkoutPage.continueBillingAddress());

      // Step 15: Shipping Address Continue = {Click}.
      await test.step('Step 15: Click on Continue in shipping Address', () => checkoutPage.continueShippingAddress());

      // Step 16: Shipping Method Continue = {Click}.
      await test.step('Step 16: Click on Continue in Shipping Method', () => checkoutPage.continueShippingMethod());

      // Step 17: Payments Option = the variant's option (the site's radio value), Payment Method Continue = {Click}.
      await test.step(`Step 17: Select Payment Method ${variant.paymentOption}`, () => checkoutPage.selectPaymentMethod(variant.sitePaymentValue));

      // Step 18: evidence, attached to the report.
      await test.step('Step 18: Take Screenshot', async () => {
        await test.info().attach('Step 18 - Payment method', { body: await checkoutPage.takeScreenshot(), contentType: 'image/png' });
      });

      // Step 19: payment details for the variant (none for Cash on Delivery / Check Money Order), then Continue.
      await test.step('Step 19: Provide Payment Details', () => checkoutPage.providePaymentDetails(demoTc03PaymentDetails(variant)));

      // Step 20: evidence, attached to the report.
      await test.step('Step 20: Take Screenshot', async () => {
        await test.info().attach('Step 20 - Payment information', { body: await checkoutPage.takeScreenshot(), contentType: 'image/png' });
      });

      // Step 21: Confirm = {Click}.
      await test.step('Step 21: Click on Continue in confirm order', () => checkoutPage.confirmOrder());

      // Step 22: Success Message = "Your order has been successfully processed!" (Verify), Continue = {Click}.
      await test.step('Step 22: Verify for Order Confirmation', async () => {
        await orderCompletedPage.expectSuccessMessage(DEMO_TC03.successMessage);
        test.info().annotations.push({ type: 'Order number', description: await orderCompletedPage.getOrderNumber() });
        await orderCompletedPage.clickContinue();
      });

      // Step 23: evidence, attached to the report.
      await test.step('Step 23: Take Screenshot', async () => {
        await test.info().attach('Step 23 - Home page', { body: await homePage.takeScreenshot(), contentType: 'image/png' });
      });

      // Step 24: Log out = {Click}.
      await test.step('Step 24: Click on Logout', () => session.logout());

      // @flow-deviation 25: the browser is closed by Playwright when the test ends
    });
  }
});
