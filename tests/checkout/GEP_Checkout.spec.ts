import { test } from '../../fixtures/customFixtures';
import { config, configFor } from '../../utils/config';
import { daysFromToday } from '../../utils/dataHelpers';
import { GEP2_18257, GEP2_36899 } from '../../test-data/testData';

test.describe('GEP Checkout', () => {
  // Full checkout on the QA site is slow (the Shipping & Billing page alone can take a minute to load).
  test.describe.configure({ timeout: 10 * 60 * 1000 });

  test('GEP2-36899 | Verify submitted order in My order page @GEP @checkout @regression', async ({
    homePage,
    loginPage,
    popups,
    searchResultsPage,
    productDetailPage,
    shoppingCartPage,
    shippingBillingPage,
    reviewOrderPage,
    orderConfirmationPage,
    myOrdersPage,
  }) => {
    // User and product come from GEP2_36899_* in .env when set, otherwise the shared values.
    const testConfig = configFor(GEP2_36899.tcId);
    const region = config.region;
    const country = config.country;
    let orderNumber = '';

    await test.step('Precondition: launch the HS website and clear launch popups', async () => {
      await homePage.launch(region, country, config.domain);
    });

    await test.step('Precondition: sign in', async () => {
      await homePage.clickSignIn();
      await loginPage.login(testConfig.username, testConfig.password);
      await loginPage.answerSecurityQuestionsIfShown(GEP2_36899.securityAnswer);
      await homePage.expectLoggedIn();
    });

    await test.step('Clear the cart if it is not empty', async () => {
      if ((await homePage.getCartItemCount()) > 0) {
        // The header cart icon opens the shopping cart page directly.
        await homePage.openMiniCart();
        await shoppingCartPage.clearCart();
      }
    });

    await test.step('Search for the product and open its PDP', async () => {
      await homePage.searchProduct(testConfig.productId);
      await searchResultsPage.openProduct(testConfig.productId);
    });

    await test.step('Set the quantity and add to cart', async () => {
      await productDetailPage.setQuantity(GEP2_36899.quantity);
      await productDetailPage.addToCart();
      await homePage.expectCartNotEmpty();
    });

    await test.step('Open the shopping cart', async () => {
      await homePage.openMiniCart();
      await shoppingCartPage.expectItemInMiniCart();
    });

    await test.step('Proceed to Shipping & Billing', async () => {
      await shoppingCartPage.proceedToShippingAndBilling();
      await shippingBillingPage.waitForPageLoaded();
      await shippingBillingPage.selectImmediateOrderIfShown();
    });

    await test.step('Choose the payment method and enter the PO number', async () => {
      await shippingBillingPage.selectPaymentMethod(region, country, GEP2_36899.itPaymentMethod);
      // UK has a single PO# field; the provided test data uses a fixed PO for every region.
      await shippingBillingPage.fillPoNumber(GEP2_36899.poNumber);
    });

    await test.step('Review and submit the order', async () => {
      await shippingBillingPage.clickReviewOrder();
      await shippingBillingPage.confirmBudgetOverlayIfShown();
      await reviewOrderPage.submitOrder();
    });

    await test.step('Verify the order confirmation and capture the order number', async () => {
      // Tosca: If GenX wait > Close Customer FeedBack survey popup
      if (region === 'genx') await popups.closeFeedbackSurvey();
      await orderConfirmationPage.expectOrderSubmitted();
      orderNumber = await orderConfirmationPage.getOrderNumber();
      console.log(`GEP2-36899 | Submitted order number: ${orderNumber}`);
    });

    await test.step('Verify the order is listed in My Orders', async () => {
      await myOrdersPage.openMyOrdersFromHeader();
      await myOrdersPage.openSubmittedOrdersTab();
      await myOrdersPage.searchSubmittedOrder(orderNumber);
      await myOrdersPage.expectOrderInFirstRow(orderNumber);
    });

    await test.step('Post-condition: sign out', async () => {
      // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
      if (region === 'genz') await homePage.logout();
    });
  });

  test('GEP2-18257 | Verify user able to see the orders on Future & Recurring Tab @GEP @checkout @recurring @regression', async ({
    homePage,
    loginPage,
    popups,
    searchResultsPage,
    productDetailPage,
    shoppingCartPage,
    shippingBillingPage,
    reviewOrderPage,
    orderConfirmationPage,
    myOrdersPage,
  }) => {
    const region = config.region;
    const country = config.country;
    let orderNumber = '';

    await test.step('Precondition: launch the HS website and clear launch popups', async () => {
      await homePage.launch(region, country, config.domain);
    });

    await test.step('Precondition: sign in', async () => {
      await homePage.clickSignIn();
      await loginPage.login(config.username, config.password);
      await loginPage.answerSecurityQuestionsIfShown(GEP2_18257.securityAnswer);
      await homePage.expectLoggedIn();
    });

    await test.step('Clear the cart if it is not empty', async () => {
      if ((await homePage.getCartItemCount()) > 0) {
        // The header cart icon opens the shopping cart page directly.
        await homePage.openMiniCart();
        await shoppingCartPage.clearCart();
      }
    });

    await test.step('Search for the product and open its PDP', async () => {
      await homePage.searchProduct(config.productId);
      await searchResultsPage.openProduct(config.productId);
    });

    await test.step('Select PDP options and add to cart', async () => {
      await productDetailPage.selectComValueIfRequired();
      await productDetailPage.selectFixerTypeIfRequired(country);
      await productDetailPage.addToCart();
      await productDetailPage.confirmBackorderIfShown();
      await homePage.expectCartNotEmpty();
    });

    await test.step('Open the shopping cart', async () => {
      await homePage.openMiniCart();
      await shoppingCartPage.expectItemInMiniCart();
    });

    await test.step('Proceed to Shipping & Billing', async () => {
      await shoppingCartPage.proceedToShippingAndBilling();
      await shippingBillingPage.waitForPageLoaded();
    });

    await test.step('Switch to a Recurring order', async () => {
      await shippingBillingPage.clearPoNumber();
      await shippingBillingPage.switchToRecurringCart();
    });

    await test.step('Choose the payment method and enter the PO number', async () => {
      await shippingBillingPage.fillPoNumber(GEP2_18257.poNumber);
     // await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18257.itPaymentMethod);
    });

    await test.step('Enter the recurring order details', async () => {
      await shippingBillingPage.enterRecurringOrderDetails({
        orderName: GEP2_18257.recurringOrderName,
        frequency: config.recurringFrequency,
        startDate: daysFromToday(GEP2_18257.recurringStartInDays),
        numberOfOrders: GEP2_18257.recurringOrderCount,
      });
    });

    // await test.step('Choose the payment method and enter the PO number', async () => {
    //   await shippingBillingPage.fillPoNumber(GEP2_18257.poNumber);
    //  // await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18257.itPaymentMethod);
    // });

    await test.step('Review and submit the order', async () => {
      await shippingBillingPage.clickReviewOrder();
      await shippingBillingPage.confirmBudgetOverlayIfShown();
      await reviewOrderPage.submitOrder();
    });

    await test.step('Verify the order confirmation and capture the order number', async () => {
      // Tosca: If GenX wait > Close Customer FeedBack survey popup
      if (region === 'genx') await popups.closeFeedbackSurvey();
      await orderConfirmationPage.expectOrderSubmitted();
      orderNumber = await orderConfirmationPage.getOrderNumber();
    });

    await test.step('Open the Future & Recurring tab in My Orders', async () => {
      await myOrdersPage.openMyOrdersFromHeader();
      await myOrdersPage.openFutureAndRecurringTab();
    });

    await test.step('Verify the recurring order is listed with Manage Upcoming', async () => {
      await myOrdersPage.searchRecurringOrder(orderNumber);
      await myOrdersPage.expectRecurringOrderInFirstRow(orderNumber);
      await myOrdersPage.expectManageUpcomingVisible();
    });

    await test.step('Post-condition: sign out', async () => {
      // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
      if (region === 'genz') await homePage.logout();
    });
  });
});
