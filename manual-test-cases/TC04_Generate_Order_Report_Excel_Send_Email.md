# TC04 — Generate Order Report in Excel and Send Email

| Field | Value |
| --- | --- |
| Test Case ID | TC04 |
| Title | Generate order report in Excel from My Account → Orders and email the report |
| Module | Order Management |
| Application | Demo Web Shop (`http://demowebshop.tricentis.com`) |
| Type | Functional — End to End |
| Priority | High |
| Source | Tosca execution report `TC04_Demowebshop Generate Order Report in Excel and Send Email`, Tricentis Tosca 13.4 P3, executed 09-03-2021 18:58:08–18:59:35 by Admin, result PASSED |
| Automation target | Playwright (browser steps) + Excel and mail libraries (non-browser steps) |

## Preconditions

1. Demo Web Shop is reachable and the home page loads.
2. A registered customer account exists and has at least one order in `Pending` status. The recorded run used the account displayed as `Sandhiya001@test.com`.
3. The report workbook `OrderReport.xls` exists at the configured report path (recorded run used `F:\Report\OrderReport.xls`) with a worksheet the automation addresses as `Order_Report`.
4. Sender mailbox credentials and receiver mailbox credentials are configured and both mailboxes are reachable.
5. The receiver mailbox has no earlier copy of the report mail matching the search criteria, so the post-send match count starts at zero.

## Test data

| Item | Value |
| --- | --- |
| Email | `<parameterised>` — Tosca buffer `{PL[Email]}` |
| Password | `<parameterised>` — Tosca buffer `{PL[Password]}` |
| Report file | `OrderReport.xls`, worksheet `Order_Report`, columns `Order Number` and `Total` |
| Expected order count in the run | 21 (buffer `OrderCount` = 21) |

## Test steps

| # | Action | Test data | Expected result |
| --- | --- | --- | --- |
| 1 | Launch the browser and open the Demo Web Shop home page. | Base URL | Home page loads; window title begins with `Demo`. |
| 2 | Click **Log in** in the account menu. | — | Login page is displayed. |
| 3 | Enter the email address. | `{PL[Email]}` | Value accepted in the Email field. |
| 4 | Enter the password. | `{PL[Password]}` | Value accepted, masked. |
| 5 | Click **Log in**. | — | Login submitted. |
| 6 | Wait for the home page to load after login. | — | The account link in the header is present (existence check returns `True`), confirming a logged-in session. |
| 7 | Capture a screenshot of the logged-in home page. | — | Screenshot created and stored as evidence. |
| 8 | Click the account link in the header. | — | *My account* page is displayed. |
| 9 | Click **Orders** in the My Account side menu. | — | *My account - Orders* page is displayed at `/customer/orders`, listing the customer's orders. |
| 10 | Read the total number of order items listed on the page and store it. | — | Count is stored in a buffer (`OrderCount`). Recorded run stored `21`. |
| 11 | Capture a screenshot of the orders list. | — | Screenshot created and stored as evidence. |
| 12 | Initialise the row counter to 1. | `Count = 1` | Counter buffer set to `1`. |
| 13 | Check whether an order item exists at position `Count`. | Current `Count` | Returns `True` while an order item exists at that position; returns `False` once the list is exhausted, which ends the loop. |
| 14 | For the order item at position `Count`, read and store the order number from the text pattern `Order Number: <value>` and confirm the order status reads `Pending`. | Current `Count` | Order number captured into a buffer; status matches `Pending`. |
| 15 | For the same order item, read and store the order total from the text pattern `Order Total: <value>`. | Current `Count` | Order total captured into a buffer. |
| 16 | Open the report workbook. | `OrderReport.xls` | Workbook opens successfully. |
| 17 | Define / update the target range in the worksheet. | Worksheet `Order_Report` | Range is defined on the first pass and updated on each later pass. |
| 18 | Write the captured order number and order total into the data row at index `Count`, and write the header row values `Order Number` and `Total`. | Buffered order number and total | Row `Count` contains the order number in column 1 and the total in column 2; header row reads `Order Number` / `Total`. |
| 19 | Close and save the workbook. | — | Workbook closed and saved successfully. |
| 20 | Increment the row counter by 1. | `Count = Count + 1` | Counter buffer incremented. |
| 21 | Repeat steps 13–20 until the existence check at step 13 returns `False`. | — | Loop completes after every listed order has been written. In the recorded run, repetitions 1–21 succeeded and repetition 22 returned `False`, ending the loop. |
| 22 | Connect to the sender mailbox. | Sender credentials | Connection established. |
| 23 | Send the mail carrying the generated order report. | Sender → receiver | Mail sent without error. |
| 24 | Connect to the receiver mailbox. | Receiver credentials | Connection established. |
| 25 | Search the receiver mailbox for the report mail and verify the number of matching messages. | Expected match count `1` | Exactly one matching message is found (expected `1`, actual `1`). |
| 26 | Click **Log out**. | — | User is logged out and returned to the public site. |
| 27 | Close the browser. | — | Browser session closed cleanly. |

## Post-conditions

1. `OrderReport.xls` contains a header row plus one row per order listed on the Orders page (21 data rows in the recorded run).
2. One report mail is present in the receiver mailbox.
3. No active logged-in session remains; the browser is closed.

## Overall expected result

All orders shown on the customer's Orders page are exported to the Excel report with matching order number and total, the report is emailed successfully, and the receiver mailbox contains exactly one matching message.

## Execution evidence — data captured in the recorded run

Loop counter maps to worksheet data row. All 21 orders carried status `Pending`.

| Row | Order Number | Total | Order Date |
| --- | --- | --- | --- |
| 1 | 880681 | 34.00 | 3/6/2021 4:32:55 AM |
| 2 | 880680 | 39.00 | 3/6/2021 4:32:09 AM |
| 3 | 880679 | 34.00 | 3/6/2021 4:31:26 AM |
| 4 | 880678 | 41.00 | 3/6/2021 4:30:41 AM |
| 5 | 880677 | 41.00 | 3/6/2021 4:29:16 AM |
| 6 | 880671 | 34.00 | 3/6/2021 2:52:35 AM |
| 7 | 880670 | 46.00 | 3/6/2021 2:50:03 AM |
| 8 | 880421 | 10.00 | 3/5/2021 3:18:26 PM |
| 9 | 876351 | 32.00 | 3/1/2021 2:57:06 PM |
| 10 | 876350 | 32.00 | 3/1/2021 2:54:18 PM |
| 11 | 876334 | 32.00 | 3/1/2021 2:39:54 PM |
| 12 | 876331 | 32.00 | 3/1/2021 2:37:55 PM |
| 13 | 876307 | 32.00 | 3/1/2021 2:26:30 PM |
| 14 | 876296 | 32.00 | 3/1/2021 2:18:29 PM |
| 15 | 876291 | 32.00 | 3/1/2021 2:15:04 PM |
| 16 | 876275 | 55.00 | 3/1/2021 2:03:25 PM |
| 17 | 875909 | 25.00 | 3/1/2021 4:24:40 AM |
| 18 | 875908 | 57.00 | 3/1/2021 4:21:14 AM |
| 19 | 875885 | 12.00 | 3/1/2021 3:26:52 AM |
| 20 | 875875 | 25.00 | 3/1/2021 3:05:41 AM |
| 21 | 875530 | 51.00 | 2/28/2021 4:59:20 AM |

## Notes for Playwright implementation

**Step boundaries.** Steps 1–11, 13–15, 26 and 27 are browser actions and belong in page objects. Steps 16–19 (Excel) and steps 22–25 (mail) are outside the browser and belong in helper modules, not in a page object.

**Loop.** Tosca drives the list with a counter and an existence check. In Playwright, prefer collecting the order rows once via a locator and iterating the resulting array, rather than reproducing the index-and-check pattern. That removes the extra iteration that exists only to fail the condition, and lets the count assertion be a direct comparison against the buffered `OrderCount` value.

**Text extraction.** Order number, status and total all come from the same order-item block as free text. Scope the locator to the order item, then parse the number and amount from its inner text so the two reads stay on the same row.

**Workbook handling.** The recorded run opens, writes and closes the workbook on every iteration. That is a Tosca artefact and is not worth reproducing. Build the row array in memory and write the workbook once after the loop.

**Report path.** `F:\Report\OrderReport.xls` is a machine-local Windows path and must become a configurable path in the framework. Legacy `.xls` may need converting to `.xlsx` depending on the library chosen.

**Mail verification.** The receiver-side check is a mailbox search with an expected match count of 1. It needs a mailbox that can be polled and cleared between runs, otherwise the count assertion drifts upward on repeat execution.

**Timing.** Steps 6 and 21 were explicit waits in Tosca. Playwright auto-waiting covers most of this; keep an explicit wait only for the post-login header state.

## Derived cases — not covered by this execution

The report records one passing run, so only the positive path above is evidenced. These follow from the same flow and are flagged as derived rather than extracted.

| ID | Title | Expected result |
| --- | --- | --- |
| TC04-D1 | Generate report for an account with zero orders | Orders page shows no order items; report contains only the header row; mail is still sent or the run reports "no data" per agreed behaviour. |
| TC04-D2 | Generate report for an account with exactly one order | Report contains one data row; totals and order number match the single order. |
| TC04-D3 | Report row count matches the on-page order count | Number of data rows written equals the `OrderCount` value read at step 10. |
| TC04-D4 | Orders in a status other than `Pending` | Confirm intended behaviour — the recorded run only ever matched `Pending`, so it is unknown whether other statuses should be included or skipped. |
| TC04-D5 | Report file locked or missing at the configured path | Run fails with a clear error; no partial or corrupt workbook is left behind. |
| TC04-D6 | Mail send fails (bad credentials or mail server unreachable) | Failure is reported; the generated report is retained. |
| TC04-D7 | Login with invalid credentials | Login is rejected; the report and mail steps do not execute. |
| TC04-D8 | Pagination on the Orders page | If the account has more orders than one page holds, confirm whether all pages are exported — the recorded run's 21 orders fitted a single page. |
