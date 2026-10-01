# TC01_Demowebshop_Verify Displayby Size 4 / 8 / 12

Sep 30, 2026 · @Naveen

Tosca ran this case for Size 4 (09-03-2021, 22:17:42 to 22:18:55), Size 8 (22:20:43 to 22:21:29) and Size 12 (22:21:51 to 22:22:17), all PASSED. Size 4 has 13 steps; Size 8 and Size 12 add a scroll, a wait and a second screenshot after step 11. The flow below numbers the steps as in the Size 8 / 12 runs (16 steps); steps 12-14 apply to Size 8 and 12 only, so Size 4's Logout and Close browser (its steps 12 and 13) are steps 15 and 16 here.

## Source and pre-conditions

| Field | Value |
| --- | --- |
| Source | Tosca Execution Test Report, Product Management, created 09.03.2021, Tosca 13.4 P3 |
| Executed by | Admin |
| Execution result | PASSED |
| Pre-conditions | Demowebshop reachable; login account available in the Tosca TestSheet |

## Test data

| Value | Source |
| --- | --- |
| Log in (Account Menu) | Report step data |
| {PL[Email]} | TestSheet parameter, literal value not in the report |
| {PL[Password]} | TestSheet parameter, literal value not in the report |
| APPAREL & SHOES | Report step data |
| 4 / 8 / 12 (DisplayBy) | Report step data, one run per size |
| ItemCount 1 to 5 (Size 4) / 1 to 9 (Size 8) / 1 to 13 (Size 12) | Buffer, set and incremented in the report |
| 4<=4 / 8<=8 / 12<=12 | Report verification expression |
| 2000 milliseconds (Size 8 / 12) | Report wait duration, step 13 |

## Steps

| # | Action | Test data | Expected result | Playwright | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Open Demowebshop | — | Demowebshop opens | Yes |  |
| 2 | Wait for page load | Operation = Wait On Open | Wait On Open performed on window with caption Demo* | Yes | Window-caption wait; Playwright uses a page load-state wait |
| 3 | Click Login and enter credentials | Account Menu = Log in; Email = {PL[Email]}; Password = {PL[Password]}; UserLogin = {Click} | Credentials submitted | Yes | Values not in the report |
| 4 | Wait for home page load | Account Link = True (WaitOn) | Expected == True, actual True | Yes |  |
| 5 | Click Apparels & Shoes | Product Categories = APPAREL & SHOES | Category page opens | Yes |  |
| 6 | Set Display-by size | DisplayBy = 4 / 8 / 12 | Page size set to 4 / 8 / 12 | Yes |  |
| 7 | Wait for page load | Operation = Wait On Open | Wait On Open performed on window with caption Demo* | Yes |  |
| 8 | Set ItemCount buffer | ItemCount = 1 | Buffer ItemCount set to 1 | Yes | Buffer maps to a script variable |
| 9 | While loop, verify item exists then increment | #{B[ItemCount]} = True | Loop runs until an item does not exist | Yes | Sub-steps 9.1 to 9.5 show the Size 4 run; Size 8 has 9 repetitions and Size 12 has 13, the last one failing as the loop exit |
| 9.1 | Repetition 1: verify item #1 exists, then increment | {CALC[{B[ItemCount]}+1]} | Verification True; ItemCount set to 2 | Yes |  |
| 9.2 | Repetition 2: verify item #2 exists, then increment | {CALC[{B[ItemCount]}+1]} | Verification True; ItemCount set to 3 | Yes |  |
| 9.3 | Repetition 3: verify item #3 exists, then increment | {CALC[{B[ItemCount]}+1]} | Verification True; ItemCount set to 4 | Yes |  |
| 9.4 | Repetition 4: verify item #4 exists, then increment | {CALC[{B[ItemCount]}+1]} | Verification True; ItemCount set to 5 | Yes |  |
| 9.5 | Repetition 5: verify item #5 exists | — | Verification fails, expected True and actual False; loop exits with no increment | Yes | Designed loop-exit condition, not a defect |
| 10 | Verify final item count | Expression {CALC[{B[ItemCount]}-1]} <=4 / <=8 / <=12 | 4<=4 / 8<=8 / 12<=12 evaluated to True | Yes |  |
| 11 | Take screenshot | — | Screenshot created successfully | Yes |  |
| 12 | Send keys to scroll down the page | — | The keys were successfully sent | Yes | Size 8 and 12 only |
| 13 | Wait for page load | Duration 2000 ms | Waited for 2000 milliseconds | Yes | Size 8 and 12 only; fixed wait, Playwright waits for the scroll to settle instead |
| 14 | Take screenshot | — | Screenshot created successfully | Yes | Size 8 and 12 only |
| 15 | Click Logout | Log out = {Click} | User logged out | Yes | Step 12 in the Size 4 run |
| 16 | Close browser | — | Browser closed | Yes | Step 13 in the Size 4 run |

## Playwright support

Every step converts to a Playwright browser action. Steps 2 and 7 wait on the window caption Demo* in Tosca and map to a page load-state wait instead. No step needs an alternate.

## Traceability

Size 4: 13 Tosca top-level steps; Size 8 / 12: 16. The manual case has 16 steps, with 12-14 for Size 8 and 12 only. The While loop holds 5 verifications and 4 increments in Tosca, carried as 5 sub-steps (9.1 to 9.5), each holding its own verification and increment.

## Open questions

- Login credentials are TestSheet parameters; the literal email and password are not in the report and are needed before the Playwright script can run. Screenshots show Sandhiya001@test.com as the logged-in account, which is observed from an image and not confirmed step data.

- The report gives positional references (#1, #{B[ItemCount]}) rather than element identifiers, so real locators still have to be supplied for the page object.
