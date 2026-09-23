import { test } from '../../fixtures/customFixtures';
import { config } from '../../utils/config';
import { GEP2_36899 } from '../../test-data/testData';

test.describe('GEP2-36899 | Verify submitted order in My order page', () => {
  test('Submitted order is listed in My Orders @GEP @checkout @regression', async ({
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
      await loginPage.answerSecurityQuestionsIfShown(GEP2_36899.securityAnswer);
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

    await test.step('Set the quantity and add to cart', async () => {
      await productDetailPage.setQuantity(GEP2_36899.quantity);
      await productDetailPage.addToCart();
    });

    await test.step('Open the shopping cart', async () => {
      await homePage.openMiniCart();
      await shoppingCartPage.expectItemInMiniCart();
      await shoppingCartPage.openCartFromMiniCart();
    });

    await test.step('Proceed to Shipping & Billing', async () => {
      await shoppingCartPage.proceedToShippingAndBilling();
    });

    await test.step('Choose the payment method and enter the PO number', async () => {
      await shippingBillingPage.selectPaymentMethod(region, country, GEP2_36899.itPaymentMethod);
      await shippingBillingPage.enterPoNumber(region, GEP2_36899.poNumber);
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

    await test.step('Verify the order is listed in My Orders', async () => {
      await myOrdersPage.navigateToOrders();
      await myOrdersPage.searchSubmittedOrder(orderNumber);
      await myOrdersPage.expectOrderInFirstRow(orderNumber);
    });

    await test.step('Post-condition: sign out', async () => {
      // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
      if (region === 'genz') await homePage.logout();
    });
  });
});
