import { test } from '../../fixtures/customFixtures';
import { config } from '../../utils/config';
import { GEP2_22324 } from '../../test-data/testData';

test.describe('GEP2-22324 | End-to-End flow for UOM display on Order History page', () => {
  test('Ordered product shows its UOM on the Order History View & Track page @GEP @orders @uom @regression', async ({
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
    orderViewAndTrackPage,
  }) => {
    const region = config.region;
    const country = config.country;
    // Tosca: TDM Condition == 'Productwith2UOM', stored as UOMProductID
    const uomProductId = config.uomProductId;
    let orderNumber = '';

    await test.step('Precondition: launch the HS website and clear launch popups', async () => {
      await homePage.launch(region, country, config.domain);
    });

    await test.step('Precondition: sign in', async () => {
      await homePage.clickSignIn();
      await loginPage.login(config.username, config.password);
      await loginPage.answerSecurityQuestionsIfShown(GEP2_22324.securityAnswer);
    });

    await test.step('Clear the cart if it is not empty', async () => {
      if ((await homePage.getCartItemCount()) > 0) {
        await homePage.openMiniCart();
        await shoppingCartPage.openCartFromMiniCart();
        await shoppingCartPage.clearCart();
      }
    });

    await test.step('Search for the 2-UOM product and open its PDP', async () => {
      await homePage.searchProduct(uomProductId);
      await searchResultsPage.openProduct(uomProductId);
    });

    await test.step('Select the UOM and add the product to cart', async () => {
      if (region === 'geny') {
        // Tosca: Else > Verify Price Changes when UOM is changed_Reference
        await productDetailPage.verifyPriceChangesWhenUomChanged();
      } else {
        // Tosca: If Country = GenZ / Run Only for Gen X Countries > PDP | Unite
        await productDetailPage.selectUnitUom();
      }
      // Tosca: Add to cart_Reference (GenX/GenZ). GenY has no explicit add step in the export; see summary.
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
      await shippingBillingPage.selectPaymentMethod(region, country, GEP2_22324.itPaymentMethod);
      await shippingBillingPage.enterPoNumber(region, GEP2_22324.poNumber);
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

    await test.step('Search the order in My Orders and open View & Track', async () => {
      await myOrdersPage.navigateToOrders();
      await myOrdersPage.searchOrderHistory(orderNumber);
      await myOrdersPage.openOrderViewAndTrack(orderNumber);
    });

    await test.step('Verify the UOM is displayed for the ordered product', async () => {
      if (region === 'geny') {
        // Tosca: Else > Validate Presence of Primary&Secondary UOM_Reference (ProductID = UOMProductID)
        await orderViewAndTrackPage.expectPrimaryAndSecondaryUomDisplayed(uomProductId);
      } else {
        // Tosca: GenZ / Gen X > HenrySchein| My Orders | View&Track > Product In Order Page - Primary UOM
        await orderViewAndTrackPage.expectPrimaryUomDisplayed(uomProductId);
      }
    });

    await test.step('Post-condition: sign out', async () => {
      // Tosca: Post condition CloseBrowser signs out only for Gen Z countries
      if (region === 'genz') await homePage.logout();
    });
  });
});
