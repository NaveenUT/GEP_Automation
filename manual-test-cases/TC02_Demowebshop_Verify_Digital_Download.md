# TC02_Demowebshop_Verfiy Digital Download

Sep 30, 2026 · @Naveen

Tosca ran this case on 09-03-2021, 19:02:51 to 19:03:14, with result PASSED; the flow below reproduces all 14 steps, and three of them cannot be executed by Playwright alone because they check a file on the local disk.

## Source and pre-conditions

| Field | Value |
| --- | --- |
| Source | Tosca Execution Test Report, Product Management, created 09.03.2021, Tosca 13.4 P3 |
| Executed by | Admin |
| Execution result | PASSED |
| Pre-conditions | Demowebshop reachable; login account available in the Tosca TestSheet; download location D:\Tosca_Projects available on the execution machine |

## Test data

| Value | Source |
| --- | --- |
| Log in (Account Menu) | Report step data |
| {PL[Email]} | TestSheet parameter, literal value not in the report |
| {PL[Password]} | TestSheet parameter, literal value not in the report |
| DIGITAL DOWNLOADS | Report step data |
| Music 2 | Buffer Product Link, set in the report |
| Poker_Face_1.txt | Report step data |
| D:\Tosca_Projects\Poker_Face_1.txt | Expected value of the file-existence verification |
| Example: This is a sample download | Expected value of the file-content verification |

## Steps

| # | Action | Test data | Expected result | Playwright | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Open Demowebshop | — | Demowebshop opens | Yes | |
| 2 | Wait for page load | Operation = Wait On Open | Wait On Open performed on window with caption Demo* | Yes | Window-caption wait; Playwright uses a page load-state wait |
| 3 | Click Login and enter credentials | Account Menu = Log in; Email = {PL[Email]}; Password = {PL[Password]}; UserLogin = {Click} | Credentials submitted | Yes | Values not in the report |
| 4 | Wait for home page load | Account Link = True (WaitOn) | Expected == True, actual True | Yes | |
| 5 | Click Digital Download | Product Categories = DIGITAL DOWNLOADS | Digital downloads category opens | Yes | |
| 6 | Take screenshot | — | Screenshot created successfully | Yes | |
| 7 | Set Product Link buffer | Product Link = Music 2 | Buffer Product Link set to Music 2 | Yes | |
| 8 | Click product Music 2 | #1 = {Click} | Product detail page opens | Yes | Positional locator |
| 9 | Take screenshot | — | Screenshot created successfully | Yes | |
| 10 | Verify the product title, then click Download Sample | Title = {B[Product Link]} (Verify); DOWNLOAD SAMPLE = {Click} | Title expected Music 2, actual Music 2; sample download triggered | Partly | Title check and click are supported; the download itself must be wrapped in a download-event wait so the file can be captured |
| 11 | Verify the downloaded file exists | File = Poker_Face_1.txt | File D:\Tosca_Projects\Poker_Face_1.txt exists; actual File exists | No | NOT PLAYWRIGHT-SUPPORTED. Alternate: save the captured download to the test download directory and assert existence with the runner filesystem API |
| 12 | Verify the downloaded file content | Text = Example: This is a sample download | Content matches the expected value exactly | No | NOT PLAYWRIGHT-SUPPORTED. Alternate: read the saved file in the test runner and assert its text equals the expected value |
| 13 | Click Logout | Log out = {Click} | User logged out | Yes | |
| 14 | Close browser | — | Browser closed | Yes | |

## Playwright support

Steps 11 and 12 check a file on the local filesystem, which is not a browser action, and step 10 triggers a download whose result is not observable from the page. All three are marked in the step table with their alternates. The fixed path D:\Tosca_Projects belongs to the Tosca execution machine and has to be replaced with the test download directory.

## Traceability

14 Tosca top-level steps to 14 manual steps. No step was merged, split, reordered or omitted.

## Open questions

- Login credentials are TestSheet parameters; the literal email and password are not in the report and are needed before the Playwright script can run. Screenshots show Sandhiya001@test.com as the logged-in account, which is observed from an image and not confirmed step data.
- The report gives positional references (#1) rather than element identifiers, so real locators still have to be supplied for the page object.
- The download location is fixed to the Tosca machine, so the equivalent path for the Playwright run still has to be agreed.
