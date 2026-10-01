import { test, expect, DEMO_TEST_TIMEOUT } from '../../fixtures/demoFixtures';
import { DEMO_TC02, demoTc02DownloadFolder } from '../../data/demo/demoTestCases';
import { fileExists, readTextFile, saveDownload } from '../../src/demo/utils/downloadedFile';
import path from 'path';

/**
 * Manual test case TC02 (Product Management), from the Tosca execution report
 * "TC02_Demowebshop_Verfiy Digital Download" (14 steps; steps 10-12 need a download-event wait and the runner's
 * filesystem instead of the fixed Tosca folder D:\Tosca_Projects).
 *
 * @manual manual-test-cases/TC02_Demowebshop_Verify_Digital_Download.md
 */
test.describe.only('Demo Web Shop - Product Management', () => {
  test.describe.configure({ timeout: DEMO_TEST_TIMEOUT });

  test(`${DEMO_TC02.toscaName} @${DEMO_TC02.tcId} @demo @productManagement`, async ({ session, header, homePage, categoryPage, productPage }) => {
    // Step 1: Open Demowebshop.
    await test.step('Step 1: Open Demowebshop', () => session.openSite());

    // Step 2: Tosca Wait On Open for the window caption "Demo*"; openSite() already waits for a title beginning "Demo".
    await test.step('Step 2: Wait for page load', () => homePage.expectLoaded());

    // Step 3: Account Menu = Log in, Email = {PL[Email]}, Password = {PL[Password]}, UserLogin = {Click}. Login from .env.
    await test.step('Step 3: Click Login and enter credentials', () => session.login());

    // Step 4: Account Link = True (WaitOn).
    await test.step('Step 4: Wait for home page load', () => session.expectLoggedIn());

    // Step 5: Product Categories = DIGITAL DOWNLOADS.
    await test.step(`Step 5: Click ${DEMO_TC02.category.name}`, async () => {
      await header.openCategory(DEMO_TC02.category.slug);
      await categoryPage.expectDisplayed(DEMO_TC02.category.name);
    });

    // Step 6: evidence, attached to the report.
    await test.step('Step 6: Take screenshot', async () => {
      await test.info().attach('Step 6 - Digital downloads', { body: await categoryPage.takeScreenshot(), contentType: 'image/png' });
    });

    // Step 7: Tosca buffer Product Link = Music 2 (a script variable here).
    const productLink = await test.step(`Step 7: Set Product Link buffer to "${DEMO_TC02.productLink}"`, () => {
      const value = DEMO_TC02.productLink;
      expect(value, 'Product Link buffer').toBe(DEMO_TC02.productLink);
      test.info().annotations.push({ type: 'Product Link', description: value });
      return value;
    });

    // Step 8: #1 = {Click}: the first product with that name (the category lists two "Music 2").
    await test.step(`Step 8: Click product ${productLink}`, async () => {
      await categoryPage.openProduct(productLink, DEMO_TC02.productPosition);
      await productPage.expectDisplayed();
    });

    // Step 9: evidence, attached to the report.
    await test.step('Step 9: Take screenshot', async () => {
      await test.info().attach(`Step 9 - ${productLink}`, { body: await productPage.takeScreenshot(), contentType: 'image/png' });
    });

    // Step 10: Title = {B[Product Link]} (Verify), then DOWNLOAD SAMPLE = {Click}, wrapped in a download-event wait.
    const download = await test.step('Step 10: Verify the product title, then click Download Sample', async () => {
      await productPage.expectProductName(productLink);
      const started = await productPage.downloadSample();
      expect(started.suggestedFilename(), 'Sample download triggered').not.toBe('');
      return started;
    });

    // Step 11 [NOT PLAYWRIGHT-SUPPORTED]: Tosca checked D:\Tosca_Projects\Poker_Face_1.txt on its machine.
    // Alternate from the manual case: save the captured download to the test download folder and check it exists there.
    const filePath = await test.step(`Step 11: Verify the downloaded file ${DEMO_TC02.sampleFile.name} exists`, async () => {
      const saved = await saveDownload(download, demoTc02DownloadFolder(test.info().outputDir));
      expect(path.basename(saved), 'Downloaded file name').toBe(DEMO_TC02.sampleFile.name);
      expect(fileExists(saved), `${saved} exists`).toBe(true);
      return saved;
    });

    // Step 12 [NOT PLAYWRIGHT-SUPPORTED]: alternate from the manual case: read the saved file and compare its text exactly.
    await test.step('Step 12: Verify the downloaded file content', async () => {
      expect(await readTextFile(filePath), 'Downloaded file content').toBe(DEMO_TC02.sampleFile.expectedContent);
    });

    // Step 13: Log out = {Click}.
    await test.step('Step 13: Click Logout', () => session.logout());

    // @flow-deviation 14: the browser is closed by Playwright when the test ends
  });
});
