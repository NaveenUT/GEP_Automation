import { test, expect, DEMO_TEST_TIMEOUT } from '../../fixtures/demoFixtures';
import { DEMO_TC01 } from '../../data/demo/demoTestCases';

/**
 * Manual test case TC01 (Product Management), from the Tosca execution report
 * "TC01_Demowebshop_Verify Displayby Size 4 / 8 / 12" (Size 4: 13 steps; Size 8 and 12: 16 steps, with an extra
 * scroll, wait and screenshot as steps 12-14). One test per size in data/demo/tc01.json.
 *
 * @manual manual-test-cases/TC01_Demowebshop_Verify_Displayby_Size.md
 */
test.describe('Demo Web Shop - Product Management', () => {
  test.describe.configure({ timeout: DEMO_TEST_TIMEOUT });

  for (const size of DEMO_TC01.displaySizes) {
    test(`${DEMO_TC01.toscaName} ${size} @${DEMO_TC01.tcId} @demo @productManagement`, async ({ session, header, categoryPage }) => {
      // Tosca: Open Demowebshop, then Wait On Open for the window caption "Demo*" (here: title begins with "Demo").
      // @flow-deviation 1-2: Tosca's Wait On Open (window caption Demo*) is the title check inside openSite()
      await test.step('Steps 1-2: Open Demowebshop and wait for the page to load', () => session.openSite());

      // Tosca: Account Menu = Log in, Email = {PL[Email]}, Password = {PL[Password]}, UserLogin = {Click}. Login from .env.
      await test.step('Step 3: Click Login and enter the credentials', () => session.login());

      // Tosca: Account Link = True (WaitOn).
      await test.step('Step 4: Wait for the home page to load (account link shown)', () => session.expectLoggedIn());

      // Tosca: Product Categories = APPAREL & SHOES.
      await test.step(`Step 5: Click ${DEMO_TC01.category.name}`, async () => {
        await header.openCategory(DEMO_TC01.category.slug);
        await categoryPage.expectDisplayed(DEMO_TC01.category.name);
      });

      // Tosca: DisplayBy = 4.
      await test.step(`Step 6: Set Display by size to ${size}`, () => categoryPage.selectDisplayPerPage(size));

      // Tosca: Wait On Open. The site reloads the category with ?pagesize=<size>.
      await test.step('Step 7: Wait for the page to load', () => categoryPage.expectDisplayPerPageApplied(size));

      // Tosca: ItemCount = 1, then a While loop "item #ItemCount exists → ItemCount + 1" until an item is missing
      // (the last repetition is the designed exit). Here the items are counted once and each position is checked.
      // @flow-deviation 8-9: Tosca's ItemCount counter loop is replaced by one count of the items and a check of each position
      const itemCount = await test.step('Steps 8-9: Count the product items and verify each one exists', async () => {
        const count = await categoryPage.getProductCount();
        for (let position = 1; position <= count; position++) {
          await categoryPage.expectProductAt(position);
        }
        test.info().annotations.push({ type: 'ItemCount', description: String(count) });
        return count;
      });

      // Tosca: {CALC[{B[ItemCount]}-1]} <= 4, i.e. the number of items shown is at most the chosen size.
      await test.step(`Step 10: Verify the item count (${itemCount}) is at most ${size}`, () => {
        expect(itemCount, 'Product items shown').toBeGreaterThan(0);
        expect(itemCount, `Product items shown with Display by ${size}`).toBeLessThanOrEqual(size);
      });

      await test.step('Step 11: Take a screenshot', async () => {
        await test.info().attach(`Step 11 - ${DEMO_TC01.category.name}, ${size} per page`, {
          body: await categoryPage.takeScreenshot(),
          contentType: 'image/png',
        });
      });

      // Steps 12-14 are only in the Size 8 and Size 12 runs (tc01.json scrollScreenshotSizes): with 8 or 12 items the
      // lower rows are below the screen, so Tosca scrolls down and takes a second screenshot.
      if (DEMO_TC01.scrollScreenshotSizes.includes(size)) {
        // Tosca: Send Keys to scroll down the page.
        await test.step('Step 12: Send keys to scroll down the page', () => categoryPage.scrollDown());

        // Tosca: a fixed wait of 2000 ms; here the test waits until the last product is on screen (scroll settled).
        await test.step('Step 13: Wait for page load', () => categoryPage.expectScrolledToLastProduct());

        await test.step('Step 14: Take a screenshot', async () => {
          await test.info().attach(`Step 14 - ${DEMO_TC01.category.name}, ${size} per page, scrolled down`, {
            body: await categoryPage.takeScreenshot(),
            contentType: 'image/png',
          });
        });
      }

      await test.step('Step 15: Click Logout', () => session.logout());

      // @flow-deviation 16: the browser is closed by Playwright when the test ends
    });
  }
});
