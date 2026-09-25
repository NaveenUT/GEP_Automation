import { test } from '../../fixtures/customFixtures';
import { GEP2_18230 } from '../../test-data/testData';

test.describe('GEP2-18230 | E2E of the Reorder option from an order on the Order History page', () => {
  // Full E2E (login, reorder, checkout, verify) takes longer than the default TIMEOUT.
  test.describe.configure({ timeout: 300000 });

  for (const flow of GEP2_18230.flows) {
    test(`[${flow.name}] Reorder a past order from Order History and place it @GEP @orders @reorder @regression`, async ({
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
      const { region, country, domain, baseUrl, username, password, expectedOrderStatus } = flow;
      let orderNumber = '';

      await test.step('Precondition: launch the HS website and clear launch popups', async () => {
        await homePage.launch(region, country, domain, baseUrl);
      });

      await test.step('Precondition: sign in', async () => {
        await homePage.clickSignIn();
        await loginPage.login(username, password);
        await loginPage.answerSecurityQuestionsIfShown(GEP2_18230.securityAnswer);
      });

      await test.step('Clear the cart if it is not empty', async () => {
        // Tosca: Clear Cart > If CartItemCount != 0
        if ((await homePage.getCartItemCount()) > 0) {
          await homePage.openMiniCart();
          await shoppingCartPage.openCartFromMiniCart();
          await shoppingCartPage.clearCart();
        }
      });

      await test.step('Open My Orders and open the first order with View & Track', async () => {
        await myOrdersPage.navigateToOrders();
        await myOrdersPage.openFirstOrderDetails();
      });

      await test.step('Reorder the order and close the reorder confirmation modal', async () => {
        await orderDetailsPage.reorder();
      });

      await test.step('Open the shopping cart and check the reordered items are in it', async () => {
        await homePage.openMiniCart();
        await shoppingCartPage.expectItemInMiniCart();
        await shoppingCartPage.openCartFromMiniCart();
      });

      await test.step('Proceed to Shipping & Billing', async () => {
        await shoppingCartPage.proceedToShippingAndBilling();
      });

      await test.step('Choose the payment method and enter the PO number', async () => {
        await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18230.itPaymentMethod);
        await shippingBillingPage.enterPoNumber(region, GEP2_18230.poNumber);
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

      await test.step('Search the new order in My Orders and open it', async () => {
        await myOrdersPage.navigateToOrders();
        // Tosca: Search the Order -My Orders Page > Orders & Returns close
        await popups.closeOrdersAndReturnsPopup();
        await myOrdersPage.searchOrder(orderNumber);
        await myOrdersPage.openFirstOrderDetails();
      });

      await test.step('Verify the order status on Order Details', async () => {
        await orderDetailsPage.expectOrderStatus(expectedOrderStatus);
      });

      await test.step('Post-condition: sign out', async () => {
        // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
        if (region === 'genz') await homePage.logout();
      });
    });
  }
});
