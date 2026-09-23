import { test } from '../../fixtures/customFixtures';
import { config } from '../../utils/config';
import { GEP2_18559 } from '../../test-data/testData';
import { UnplacedOrderDetails } from '../../pages/GEP_MyOrdersPage';

test.describe('GEP2-18559 | Place Order from Unplaced Order section', () => {
  test('Unplaced order reopened with View & Modify can be submitted @GEP @orders @unplacedOrders @regression', async ({
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
    let unplacedOrder: UnplacedOrderDetails | undefined;

    await test.step('Precondition: launch the HS website and clear launch popups', async () => {
      await homePage.launch(region, country, config.domain);
    });

    await test.step('Precondition: sign in', async () => {
      await homePage.clickSignIn();
      await loginPage.login(config.username, config.password);
      await loginPage.answerSecurityQuestionsIfShown(GEP2_18559.securityAnswer);
    });

    await test.step('Clear the cart if it is not empty', async () => {
      if ((await homePage.getCartItemCount()) > 0) {
        await homePage.openMiniCart();
        await shoppingCartPage.openCartFromMiniCart();
        await shoppingCartPage.clearCart();
      }
    });

    await test.step('Search for the product and open its PDP', async () => {
      // Tosca: TDM Condition == 'Generic'
      await homePage.searchProduct(config.productId);
      await searchResultsPage.openProduct(config.productId);
    });

    await test.step('Select the PDP options and add the product to cart', async () => {
      await productDetailPage.selectComValueIfRequired();
      // Tosca: If Country is FR (ValidCountries = FR) > If fixertype exist
      if (country === 'FR') await productDetailPage.selectRapideFixerTypeIfShown();
      await productDetailPage.addToCart();
      await productDetailPage.confirmBackorderModalIfShown();
    });

    if (region === 'genx') {
      // Tosca: Verify if Country is genx then update values in genxcustomerData
      // (Country is UKQADental, UKQAMedical, IEQA or KTQA). Tosca runs checkout up to
      // Review Order without submitting, which saves the cart as an unplaced order.
      await test.step('GenX: go through checkout up to Review Order to create the unplaced order', async () => {
        await homePage.openMiniCart();
        await shoppingCartPage.openCartFromMiniCart();
        await shoppingCartPage.proceedToShippingAndBilling();
        await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18559.itPaymentMethod);
        await shippingBillingPage.enterPoNumber(region, GEP2_18559.poNumber);
        await shippingBillingPage.clickReviewOrder();
      });
    }

    await test.step('Open the Unplaced Orders tab in My Orders', async () => {
      await myOrdersPage.navigateToOrders();
      await myOrdersPage.openUnplacedOrdersTab();
    });

    await test.step('Verify the unplaced order details', async () => {
      unplacedOrder = await myOrdersPage.verifyFirstUnplacedOrderDetails();
    });

    await test.step('Open the unplaced order with View & Modify', async () => {
      await myOrdersPage.viewAndModifyFirstUnplacedOrder();
    });

    await test.step('Open the shopping cart and capture the subtotal and item count', async () => {
      await homePage.openMiniCart();
      await shoppingCartPage.expectItemInMiniCart();
      await shoppingCartPage.openCartFromMiniCart();
      const cartSubtotal = await shoppingCartPage.getCartSubtotal();
      const cartItemCount = await homePage.getCartItemCount();
      // Tosca stores these values in buffers but never compares them with the unplaced order.
      // They are recorded as an annotation until QA confirms whether they should be asserted.
      test.info().annotations.push({
        type: 'unplaced-order-vs-cart',
        description:
          `unplaced order: subtotal=${unplacedOrder?.subtotal}, items=${unplacedOrder?.itemsCount}; ` +
          `cart: subtotal=${cartSubtotal}, items=${cartItemCount}`,
      });
    });

    await test.step('Proceed to Shipping & Billing', async () => {
      await shoppingCartPage.proceedToShippingAndBilling();
    });

    await test.step('Choose the payment method and enter the PO number', async () => {
      await shippingBillingPage.selectPaymentMethod(region, country, GEP2_18559.itPaymentMethod);
      await shippingBillingPage.enterPoNumber(region, GEP2_18559.poNumber);
    });

    await test.step('Review and submit the order', async () => {
      await shippingBillingPage.clickReviewOrder();
      await shippingBillingPage.confirmBudgetOverlayIfShown();
      await reviewOrderPage.submitOrder();
    });

    await test.step('Verify the order confirmation', async () => {
      // Tosca: If GenX wait > Close Customer FeedBack survey popup
      if (region === 'genx') await popups.closeFeedbackSurvey();
      await orderConfirmationPage.expectOrderSubmitted();
    });

    await test.step('Post-condition: sign out', async () => {
      // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
      if (region === 'genz') await homePage.logout();
    });
  });
});
