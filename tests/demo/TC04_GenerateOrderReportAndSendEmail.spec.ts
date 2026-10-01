import { test, expect, DEMO_TEST_TIMEOUT } from '../../fixtures/demoFixtures';
import { DEMO_TC04, demoTc04ReportPath } from '../../data/demo/demoTestCases';
import { demoMailSettings, demoWebshopCredentials } from '../../src/config/env';
import { readOrderReport, writeOrderReport } from '../../src/demo/utils/orderReportWorkbook';
import { countReportMails, sendOrderReportMail } from '../../src/demo/utils/orderReportMail';

/**
 * Manual test case TC04 (Order Management), from the Tosca execution report
 * "TC04_Demowebshop Generate Order Report in Excel and Send Email".
 * Steps 1-11, 13-15 and 26 run in the browser; 16-19 (Excel) and 22-25 (mail) use helper modules.
 *
 * @manual manual-test-cases/TC04_Generate_Order_Report_Excel_Send_Email.md
 */
test.describe('Demo Web Shop - Order Management', () => {
  test.describe.configure({ timeout: DEMO_TEST_TIMEOUT });

  test(`TC04 | ${DEMO_TC04.title} @TC04 @demo @orderManagement`, async ({ session, header, loginPage, myAccountPage, ordersPage }) => {
    const { username, password } = demoWebshopCredentials();

    // Launch the browser and open the Demo Web Shop home page; the window title begins with "Demo".
    await test.step('Step 1: Open the Demo Web Shop home page', () => session.openSite());

    // Click "Log in" in the header; the login page is displayed.
    await test.step('Step 2: Click Log in', async () => {
      await header.clickLogin();
      await loginPage.expectDisplayed();
    });

    // Tosca {PL[Email]}: the user from .env.
    await test.step('Step 3: Enter the email address', () => loginPage.enterEmail(username));

    // Tosca {PL[Password]}: from .env; the field masks it.
    await test.step('Step 4: Enter the password', () => loginPage.enterPassword(password));

    await test.step('Step 5: Click Log in', () => loginPage.submit());

    // The account link in the header is present and shows the user: the session is logged in.
    await test.step('Step 6: Wait for the home page after login', () => header.expectLoggedInAs(username));

    // Evidence, attached to the report.
    await test.step('Step 7: Capture a screenshot of the logged-in home page', async () => {
      await test.info().attach('Step 7 - logged-in home page', { body: await header.takeScreenshot(), contentType: 'image/png' });
    });

    // The account link opens "My account - Customer info".
    await test.step('Step 8: Click the account link in the header', async () => {
      await header.openMyAccount();
      await myAccountPage.expectDisplayed();
    });

    // "Orders" in the My account side menu opens /customer/orders.
    await test.step('Step 9: Click Orders in the My Account side menu', async () => {
      await myAccountPage.openOrders();
      await ordersPage.expectDisplayed();
    });

    // Tosca buffer OrderCount.
    const orderCount = await test.step('Step 10: Read and store the number of orders listed', async () => {
      const count = await ordersPage.getOrderCount();
      test.info().annotations.push({ type: 'OrderCount', description: String(count) });
      return count;
    });

    await test.step('Step 11: Capture a screenshot of the orders list', async () => {
      await test.info().attach('Step 11 - orders list', { body: await ordersPage.takeScreenshot(), contentType: 'image/png' });
    });

    // Tosca loops with a counter and an existence check (steps 12, 13, 20, 21); here every order item is read once.
    // @flow-deviation 12-15: Tosca's Count counter and existence check are replaced by one read of all order items (manual notes: Loop)
    const orders = await test.step(`Steps 12-15: Read order number, status and total of each order; status is "${DEMO_TC04.expectedOrderStatus}"`, async () => {
      const list = await ordersPage.readOrders();
      expect(list, 'Every listed order is read').toHaveLength(orderCount);
      for (const order of list) {
        expect(order.status, `Order ${order.orderNumber} status`).toBe(DEMO_TC04.expectedOrderStatus);
      }
      return list;
    });

    // Build the rows in memory and write the workbook once (Tosca opened and saved it on every pass).
    // Report folder and file name come from data/demo/tc04.json.
    const reportPath = demoTc04ReportPath(test.info().outputDir);
    // @flow-deviation 16-21: the workbook is written once after the loop instead of opened and saved per order (manual notes: Workbook handling); 20-21 are the loop control
    await test.step(`Steps 16-21: Write every order to ${DEMO_TC04.report.fileName}, worksheet ${DEMO_TC04.report.worksheetName}`, async () => {
      await writeOrderReport(
        reportPath,
        DEMO_TC04.report.worksheetName,
        DEMO_TC04.report.headers,
        orders.map((order) => ({ orderNumber: order.orderNumber, total: order.total }))
      );

      // Post-condition 1: header row plus one row per listed order, with matching number and total.
      const saved = await readOrderReport(reportPath, DEMO_TC04.report.worksheetName);
      expect(saved.headers, 'Header row').toEqual([...DEMO_TC04.report.headers]);
      expect(saved.rows, 'One data row per order, same number and total').toEqual(
        orders.map((order) => ({ orderNumber: order.orderNumber, total: order.total }))
      );
      await test.info().attach(DEMO_TC04.report.fileName, {
        path: reportPath,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
    });

    // Steps 22-25 need a sender and a receiver mailbox in .env; without them the test stops here as skipped.
    const mail = demoMailSettings();
    test.skip(!mail, 'Mail steps 22-25 need DEMO_MAIL_SMTP_* (sender) and DEMO_MAIL_IMAP_* (receiver) in .env');
    if (!mail) return;

    // A unique subject per run, so the receiver-side count starts at zero every time.
    const subject = `${DEMO_TC04.mail.subjectPrefix} ${new Date().toISOString()}`;

    // @flow-deviation 22-23: connecting to the sender mailbox and sending are one SMTP call
    await test.step('Steps 22-23: Connect to the sender mailbox and send the order report', () =>
      sendOrderReportMail(mail, subject, `Order report for ${username}: ${orders.length} orders attached.`, reportPath)
    );

    // @flow-deviation 24-25: connecting to the receiver mailbox and searching are one IMAP call
    await test.step(`Steps 24-25: Connect to the receiver mailbox and find exactly ${DEMO_TC04.mail.expectedMatches} report mail`, async () => {
      expect(await countReportMails(mail, subject), 'Report mails in the receiver inbox').toBe(DEMO_TC04.mail.expectedMatches);
    });

    await test.step('Step 26: Click Log out', () => session.logout());

    // @flow-deviation 27: the browser is closed by Playwright when the test ends
  });
});
