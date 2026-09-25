import { test } from '../../fixtures/customFixtures';
import { config, configFor } from '../../utils/config';
import { GEP2_18230 } from '../../test-data/testData';

test.describe('GEP2-18230 | E2E of the Reorder option from an order on the Order History page', () => {
  // Full E2E (login, reorder, checkout, verify) takes longer than the default TIMEOUT.
  test.describe.configure({ timeout: 300000 });

  test.only('GEP2-18230 | E2E of the Reorder option from an order on the Order History page @GEP2-18230 @GEP @orders @reorder @regression', async ({
    homePage,
    loginPage,
    popups,
    shoppingCartPage,
    shippingBillingPage,
    reviewOrderPage,
    orderConfirmationPage,
    myOrdersPage,
    orderDetailsPage,
  }) => {
    // Site, country, region and domain come from .env. The login uses GEP2_18230_* in .env when set,
    // otherwise the shared APP_USERNAME / APP_PASSWORD.
    const testConfig = configFor(GEP2_18230.tcId);
    const region = config.region;
    const country = config.country;
    let orderNumber = '';

    await test.step('Precondition: launch the HS website and clear launch popups', async () => {
      await homePage.launchSite(region, country, config.domain);
    });

    await test.step('Precondition: sign in', async () => {
      await homePage.clickSignIn();
      await loginPage.login(testConfig.username, testConfig.password);
      await loginPage.answerSecurityQuestionsIfShown(GEP2_18230.securityAnswer);
    });

    await test.step('Clear the cart if it is not empty', async () => {
      // Tosca: Clear Cart > If CartItemCount != 0
      if ((await homePage.getCartItemCount()) > 0) {
        await homePage.openCartFromHeader();
        await shoppingCartPage.openCartFromMiniCartPopup();
        await shoppingCartPage.clearCart();
      }
    });

    await test.step('Open My Orders and open the first order with View & Track', async () => {
      await myOrdersPage.openMyOrdersViaAccountDashboard();
      await myOrdersPage.openFirstSubmittedOrderDetails();
    });

    await test.step('Reorder the order and close the reorder confirmation modal', async () => {
      await orderDetailsPage.reorder();
    });

    await test.step('Open the shopping cart and check the reordered items are in it', async () => {
      await homePage.openCartFromHeader();
      await shoppingCartPage.expectItemInCart();
      await shoppingCartPage.openCartFromMiniCartPopup();
    });

    await test.step('Proceed to Shipping & Billing', async () => {
      await shoppingCartPage.proceedToShippingAndBilling();
    });

    await test.step('Choose the payment method and enter the PO number', async () => {
      await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18230.itPaymentMethod);
      await shippingBillingPage.enterPoNumberForRegion(region, GEP2_18230.poNumber);
    });

    await test.step('Review and submit the order', async () => {
      await shippingBillingPage.clickReviewOrder();
      await shippingBillingPage.confirmBudgetDialogIfShown();
      await reviewOrderPage.submitOrder();
    });

    await test.step('Verify the order confirmation and capture the order number', async () => {
      // Tosca: If GenX wait > Close Customer FeedBack survey popup
      if (region === 'genx') await popups.closeFeedbackSurveyIfShown();
      await orderConfirmationPage.expectOrderSubmitted();
      orderNumber = await orderConfirmationPage.getOrderNumber();
    });

    await test.step('Search the new order in My Orders and open it', async () => {
      await myOrdersPage.openMyOrdersViaAccountDashboard();
      // Tosca: Search the Order -My Orders Page > Orders & Returns close
      await popups.closeOrdersAndReturnsDialogIfShown();
      await myOrdersPage.searchSubmittedOrderUntilFound(orderNumber);
      await myOrdersPage.openFirstSubmittedOrderDetails();
    });

    await test.step('Verify the order status on Order Details', async () => {
      // Tosca: TDM Condition == 'OCOrderStatus' (EXPECTED_ORDER_STATUS in .env)
      await orderDetailsPage.expectOrderStatus(config.expectedOrderStatus);
    });

    await test.step('Post-condition: sign out', async () => {
      // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
      if (region === 'genz') await homePage.logout();
    });
  });
});
