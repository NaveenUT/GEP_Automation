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
  core/        BasePage, BaseComponent (shared helpers, no fixed waits)
  components/  GepHeader, GepPopups, GepDatePicker, orders/ (Submitted, Unplaced, Future & Recurring tabs)
  pages/       one page object per page, e.g. GepShippingBillingPage, GepMyOrdersPage
  regions/     Gen X / Gen Y / Gen Z differences (launch popups, payment, PO rule, UOM, sign out)
  flows/       GepSessionFlow, GepCartFlow, GepCheckoutFlow, GepOrderHistoryFlow
  utils/       random data, dates, cache-buster
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
| `npm test` | All tests on the market(s) in `MARKET` (default `us-qa`) |
| `npm run test:orders` | The order tests (currently all tests) |
| `npx playwright test --grep @GEP2-36899` | One test case |
| `npm run report` | Open the last HTML report (also `monocart-report/index.html`) |
| `npm run check` | Type check + list tests (what CI runs) |
| `npm run locators` | Rebuild `LOCATORS_TODO.md` from the code |

Switch market by changing `MARKET` in `.env`, e.g. `MARKET=uk-dental-qa` or `MARKET=us-qa,uk-dental-qa`
(runs every test on both). Browsers are visible locally; set `HEADLESS=true` to hide them (CI is always headless).

## Adding a test case

1. Add its fixed data to `data/testCases.ts` (and market-dependent data to `data/marketData.ts`).
2. Write the test in the feature spec under `tests/` (order tests go in `tests/orders/GEP_Orders.spec.ts`), using the flows. Title: `GEP2-xxxxx | <Jira title> @GEP2-xxxxx @<feature>`.
   Wrap every line in `await test.step('Step N: <what it does>', ...)` with a one-line comment above it.
3. New screen or control? Add a getter to the page or component with a `// Tosca:` comment. Use
   `this.todo(...)` until the locator is known, then run `npm run locators`.
4. Something that differs per Gen X / Y / Z goes in `src/regions/`, not in the test.

## Conventions

- Classes `Gep<Name>`, one per file. Locator getters are `<area><Element><Type>`
  (`headerCartIcon`, `poNumberInput`), and names are unique across the framework.
- Methods start with a verb: `open…`, `select…`, `enter…`, `click…`, `expect…` (assertion), `get…` (returns a value),
  and `…IfShown` for optional popups.
- Prefer `data-test-id` or role-based locators; no fixed waits (`waitForTimeout`), use `expect(...)` or `toPass()` retries.
- CI (`.github/workflows/ci.yml`) runs the type check, lists the tests and checks `LOCATORS_TODO.md` is current on every push.

## Known gaps

- `LOCATORS_TODO.md` lists the locators that are still `TODO`. They're mostly Gen Y / Gen Z screens, the
  Unplaced Orders table (GEP2-18559) and the cart subtotal.
- GEP2-22324 has a two-UOM product for US (5704279) and UK Medical (DIS40302), not yet for UK Dental.
- UK Medical has no generic / bulk-order product IDs yet in `data/marketData.ts`.
