# GEP Automation

Playwright + TypeScript end-to-end tests for the Henry Schein GEP web shops (US and UK QA sites).
The test cases were converted from Tosca, and the framework keeps Tosca's structure so each test
can be traced back to its source.

## How it maps to Tosca

| Tosca | Here | Folder |
|---|---|---|
| Modules (controls) | Page objects and components: locators plus small actions | `src/pages`, `src/components` |
| Reusable TestStepBlocks | Flows: login, cart, checkout, order history | `src/flows` |
| TestCases | Specs: short, readable test cases | `tests/` |
| TDM / test sheets | Test data per test case and per market | `data/` |
| Test configuration (`{CP[Country]}`, Gen, Domain) | Markets, each run as a Playwright project | `src/config/markets.ts` |

Every locator keeps a `// Tosca: <module> > <control>` comment, and every test title starts with its Jira ID.

## Project structure

```
src/
  config/      markets.ts (US / UK Dental / UK Medical profiles), env.ts (reads .env)
  core/        BasePage (every action and check a page uses: click, fill, readText, expectVisible, ...), BaseComponent
  components/  GepHeader, GepPopups (one entry point for popups/), orders/ (Submitted, Unplaced, Future & Recurring tabs)
    popups/    one class per popup: GepCookieBanner, GepLaunchPopup, GepAdPopup, GepFreeItemPopup,
               GepInventoryNoticePopup, GepLicensePopup, GepControlledSubstancesPopup, GepFeedbackSurveyPopup,
               GepOrdersAndReturnsPopup
  pages/       one page object per page, e.g. GepShippingBillingPage, GepMyOrdersPage
  regions/     GEN_X / GEN_Y / GEN_Z differences (launch popups, payment, PO rule, UOM, sign out)
  flows/       GepSessionFlow, GepCartFlow, GepCheckoutFlow, GepOrderHistoryFlow
  utils/       dataHelpers (random data, dates, cache-buster), GepDatePicker (picks a date in any calendar field)
data/          testCases.ts, marketData.ts (products, expected status), common.ts, orderStatus.ts
fixtures/      gepFixtures.ts: gives each test its market, pages and flows
tests/         orders/GEP_Orders.spec.ts (order placement + order history)
scripts/       generate-locators-report.js (builds LOCATORS_TODO.md)
```

A test only talks to flows (and a page for a step unique to that test). Every line is a numbered
`test.step` with a comment explaining it, so the test reads like the Tosca test case and the HTML report
shows the same step names:

```ts
test('GEP2-36899 | Verify submitted order in My order page @GEP2-36899 ...', async ({ session, cart, checkout, orderHistory, marketData }) => {
  // Open the site for the selected market and close the cookie / domain / launch popups.
  await test.step('Step 1: Launch the website and clear the launch popups', () => session.openSite());

  // Sign in with the user from .env and wait until the account menu shows.
  await test.step('Step 2: Sign in', () => session.login(GEP2_36899.tcId));
  ...
  // Click "Submit Your Order", check "Your order has been submitted" and read the order number.
  const orderNumber = await test.step('Step 10: Submit the order and capture the order number', () => checkout.submitOrder());
  ...
});
```

Flows don't create report steps themselves; the Playwright actions (click, fill, expect) appear under each test step.

## Test cases

| Jira | Test | Spec |
|---|---|---|
| GEP2-36899 | Submitted order is listed in My Orders | `tests/orders/GEP_Orders.spec.ts` |
| GEP2-18257 | Recurring order is listed in Future & Recurring (Manage Upcoming) | `tests/orders/GEP_Orders.spec.ts` |
| GEP2-18230 | Reorder from Order History and check the order status | `tests/orders/GEP_Orders.spec.ts` |
| GEP2-18559 | Place an order from Unplaced Orders | `tests/orders/GEP_Orders.spec.ts` |
| GEP2-22324 | UOM is shown on the order's View & Track page | `tests/orders/GEP_Orders.spec.ts` |

All five are in one feature file: each places an order and verifies it in My Orders / Order History.
Every test places a real order on the QA site (tag `@placesOrder`). A future group that checks checkout
itself (payment options, PO validation, totals) without My Orders would get its own file, e.g. `tests/checkout/`.

## Second application: Demo Web Shop

Manual test cases from Tosca execution reports for https://demowebshop.tricentis.com live next to GEP and share
only `src/core` (BasePage), `src/config` and `src/utils`:

```
src/demo/        components/DemoHeader, pages/ (Home, Login, Category, MyAccount, Orders), flows/DemoSessionFlow,
                 utils/ orderReportWorkbook (Excel), orderReportMail (send by SMTP, check by IMAP)
data/demo/       tc01.json, tc02.json, tc04.json (one JSON per test case: category, sizes, report folder, ...), demoTestCases.ts (loads them)
fixtures/        demoFixtures.ts
tests/demo/      TC01_VerifyDisplayBySize.spec.ts, TC02_VerifyDigitalDownload.spec.ts, TC03_OrderByPaymentMethod.spec.ts, TC04_GenerateOrderReportAndSendEmail.spec.ts
```

| ID | Test | Spec |
|---|---|---|
| TC01 | Display by size 4, 8 and 12 on Apparel & Shoes shows at most that many products (one test per size) | `tests/demo/TC01_VerifyDisplayBySize.spec.ts` |
| TC02 | Digital download: "Music 2" sample file Poker_Face_1.txt is downloaded with the expected text | `tests/demo/TC02_VerifyDigitalDownload.spec.ts` |
| TC03 | Order a Books > Fiction item by Cash on Delivery / Credit Card / Check Money Order / Purchase Order (one test each; places 4 demo orders) | `tests/demo/TC03_OrderByPaymentMethod.spec.ts` |
| TC04 | Order report in Excel from My Account → Orders, emailed and found in the receiver mailbox | `tests/demo/TC04_GenerateOrderReportAndSendEmail.spec.ts` |

It runs as its own Playwright project, `demo-webshop` (`npm run test:demo`); the GEP market projects never run it.
Test values (e.g. the TC01 category and sizes, the TC04 report folder) are in `data/demo/tc01.json` / `tc04.json`. Logins and mailboxes
go in `.env` (`DEMO_WEBSHOP_*`, `DEMO_MAIL_*`, see `.env.example`). Without the mailbox
settings TC04 writes and checks the Excel report, attaches it to the HTML report, and is then marked skipped.

## Flow check against the manual test cases (Loop 2)

`npm run verify_flow` (or `node verify_flow.mjs TC01`) checks every spec against its manual test case in
`manual-test-cases/`, which is the source of truth and is never edited by the check:

1. **Structure** (script): every manual step has a `test.step('Step N: …')` (or a `Steps a-b` range), in the same
   order, with no extra steps.
2. **Meaning** (AI, read-only): each step does the manual action with the same data and asserts the expected result.
3. Differences are fixed by an AI fixer (spec, pages, data only), then checked again: up to 3 attempts, stopping early
   when the same differences come back.

Results: `flow-check-report.md`, and `review-needed/<manual test case>.md` (step, spec line, type, reason) for
anything still different. Options: `--no-ai` (structure only), `--no-fix`, `--runtime` (also lists the manual steps
that did not run in the last `test-results/results.json`). The AI steps need the `claude` CLI.

A spec links to its manual case with `// @manual manual-test-cases/<file>.md`. A merged step range or a step with no
code of its own (e.g. "close the browser") needs `// @flow-deviation <steps>: <reason>` right above it.

## Setup

```bash
npm ci
npx playwright install chromium
cp .env.example .env      # then fill in the credentials
```

`.env` is gitignored. It holds the market to run and the logins, never code or site data:

```
MARKET=us-qa
US_QA_APP_USERNAME=...
US_QA_APP_PASSWORD=...
```

## Running

| Command | What it does |
|---|---|
| `npm test` | Everything: the GEP tests on the market(s) in `MARKET` (default `us-qa`) plus the Demo Web Shop tests |
| `npm run test:orders` | The GEP order tests |
| `npm run test:demo` | The Demo Web Shop tests (project `demo-webshop`) |
| `npx playwright test --grep @GEP2-36899` | One test case |
| `npm run report` | Open the last HTML report (also `monocart-report/index.html`) |
| `npm run check` | Type check + list tests (what CI runs) |
| `npm run locators` | Rebuild `LOCATORS_TODO.md` from the code |

Switch market by changing `MARKET` in `.env`, e.g. `MARKET=uk-dental-qa` or `MARKET=us-qa,uk-dental-qa`
(runs every test on both). Browsers are visible locally; set `HEADLESS=true` to hide them (CI is always headless).
Headed runs open a maximised window that fits your screen; headless runs use a fixed 1920x1080 viewport.

## Adding a test case

1. Add its fixed data to `data/testCases.ts` (and market-dependent data to `data/marketData.ts`).
2. Write the test in the feature spec under `tests/` (order tests go in `tests/orders/GEP_Orders.spec.ts`), using the flows. Title: `GEP2-xxxxx | <Jira title> @GEP2-xxxxx @<feature>`.
   Wrap every line in `await test.step('Step N: <what it does>', ...)` with a one-line comment above it.
3. New screen or control? Add a `private` getter to the page or component with a `// Tosca:` comment, and a
   public method that uses it. Use `this.todo(...)` until the locator is known, then run `npm run locators`.
4. Something that differs per Gen X / Y / Z goes in `src/regions/`, not in the test.

## Conventions

- Classes `Gep<Name>`, one per file. Locator getters are `<area><Element><Type>`
  (`headerCartIcon`, `poNumberInput`, `pdpUomDropdown`), and names are unique across the framework.
- Locators are `private`: flows and tests only use a page's public methods.
- Pages never call Playwright directly: actions and checks go through the `BasePage` methods
  (`click`, `fill`, `typeLikeUser`, `readText`, `expectVisible`, `expectText`, `expectUrl`, `retryUntilPasses`, ...).
- Constants are `UPPER_SNAKE_CASE` (`GEP2_36899`, `MARKETS`, `ENV`, `GEN_X`); variables and properties stay camelCase.
- Methods start with a verb: `open…`, `select…`, `enter…`, `click…`, `expect…` (assertion), `get…` (returns a value),
  and `…IfShown` for optional popups.
- Prefer `data-test-id` or role-based locators; no fixed waits (`waitForTimeout`), use `expect(...)` or `toPass()` retries.
- CI (`.github/workflows/ci.yml`) runs the type check, lists the tests and checks `LOCATORS_TODO.md` is current on every push.

## Known gaps

- `LOCATORS_TODO.md` lists the locators that are still `TODO`. They're mostly Gen Y / Gen Z screens and
  optional popups; the US order paths are all filled.
- GEP2-22324 has a two-UOM product for US (5704279) and UK Medical (DIS40302), not yet for UK Dental.
- UK Medical has no generic / bulk-order product IDs yet in `data/marketData.ts`.
