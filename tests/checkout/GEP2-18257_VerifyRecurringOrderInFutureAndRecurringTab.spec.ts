import { test } from '../../fixtures/customFixtures';
import { config } from '../../utils/config';
import { randomInt, randomText } from '../../utils/dataHelpers';
import { GEP2_18257 } from '../../test-data/testData';

test.describe('GEP2-18257 | Verify user able to see the orders on Future & Recurring Tab', () => {
  test('Submitted recurring order is listed in Future & Recurring tab @GEP @checkout @recurring @regression', async ({
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
    // Tosca: Generate Buffer > recurringOrderName / recurringOrderCount
    const recurringOrderName = randomText(GEP2_18257.recurringOrderNameLength);
    const recurringOrderCount = randomInt(GEP2_18257.recurringOrderCount.min, GEP2_18257.recurringOrderCount.max);
    let orderNumber = '';

    await test.step('Precondition: launch the HS website and clear launch popups', async () => {
      await homePage.launch(region, country, config.domain);
    });

    await test.step('Precondition: sign in', async () => {
      await homePage.clickSignIn();
      await loginPage.login(config.username, config.password);
      await loginPage.answerSecurityQuestionsIfShown(GEP2_18257.securityAnswer);
    });

    await test.step('Clear the cart if it is not empty', async () => {
      if ((await homePage.getCartItemCount()) > 0) {
        await homePage.openMiniCart();
        await shoppingCartPage.openCartFromMiniCart();
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
    });

    await test.step('Open the shopping cart', async () => {
      await homePage.openMiniCart();
      await shoppingCartPage.expectItemInMiniCart();
      await shoppingCartPage.openCartFromMiniCart();
    });

    await test.step('Proceed to Shipping & Billing', async () => {
      await shoppingCartPage.proceedToShippingAndBilling();
    });

    await test.step('Switch to the Recurring cart', async () => {
      await shippingBillingPage.clearPoNumber();
      await shippingBillingPage.switchToRecurringCart();
    });

    await test.step('Enter the recurring order details', async () => {
      await shippingBillingPage.enterRecurringOrderDetails(recurringOrderName, recurringOrderCount, config.recurringFrequency);
      await shippingBillingPage.selectDefaultRecurringStartDate();
    });

    await test.step('Choose the payment method and enter the PO number', async () => {
      await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18257.itPaymentMethod);
      await shippingBillingPage.enterPoNumber(region, GEP2_18257.poNumber);
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
    });

    await test.step('Open the Future & Recurring tab in My Orders', async () => {
      await myOrdersPage.navigateToOrders();
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
