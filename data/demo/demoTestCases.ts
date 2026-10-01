import path from 'path';
import TC01_JSON from './tc01.json';
import TC02_JSON from './tc02.json';
import TC03_JSON from './tc03.json';
import { randomDigits } from '../../src/utils/dataHelpers';
import type { DemoPaymentDetails } from '../../src/demo/pages/DemoCheckoutPage';
import TC04_JSON from './tc04.json';

/**
 * Test data for the Demo Web Shop test cases (manual test cases converted from Tosca execution reports).
 * Each test case's values are kept in a JSON file next to this one, so they can be changed without touching code.
 * Logins and mailboxes live in .env, never here.
 */

type Tc01Data = {
  tcId: string;
  /** Tosca test case name without the size, e.g. "TC01_Demowebshop_Verify Displayby Size" (+ " 4") */
  toscaName: string;
  /** Tosca step 5: Product Categories = APPAREL & SHOES (slug = its URL, /apparel-shoes) */
  category: { name: string; slug: string };
  /** Tosca step 6: DisplayBy. One test per size (the Tosca report has Size 4, 8 and 12). */
  displaySizes: number[];
  /** Tosca steps 12-14 (scroll down, wait, screenshot): only the Size 8 and Size 12 runs have them. */
  scrollScreenshotSizes: number[];
};

/** TC01: Verify Display by Size (data/demo/tc01.json). */
export const DEMO_TC01: Readonly<Tc01Data> = TC01_JSON;

type Tc02Data = {
  tcId: string;
  /** Tosca test case name, as in the report */
  toscaName: string;
  /** Tosca step 5: Product Categories = DIGITAL DOWNLOADS (slug = its URL, /digital-downloads) */
  category: { name: string; slug: string };
  /** Tosca step 7: buffer Product Link */
  productLink: string;
  /** Tosca step 8: #1, the first product with that name (the category lists two "Music 2") */
  productPosition: number;
  sampleFile: {
    /** Tosca step 11: File = Poker_Face_1.txt */
    name: string;
    /** Tosca step 12: Text */
    expectedContent: string;
  };
  /** Folder for the downloaded file, relative to the project root (Tosca used D:\Tosca_Projects). Empty = the test's own output folder. */
  downloadFolder: string;
};

/** TC02: Verify Digital Download (data/demo/tc02.json). */
export const DEMO_TC02: Readonly<Tc02Data> = TC02_JSON;

/** Folder for the TC02 download: tc02.json downloadFolder under the project root, or `outputDir` when it is empty. */
export function demoTc02DownloadFolder(outputDir: string): string {
  const folder = DEMO_TC02.downloadFolder;
  return folder ? path.resolve(__dirname, '..', '..', folder) : outputDir;
}

type Tc03PaymentData =
  | { type: 'none' }
  | Extract<DemoPaymentDetails, { type: 'creditCard' }>
  /** Tosca: PO Number = {RND[6]}, a random number of this many digits generated at run time */
  | { type: 'purchaseOrder'; poNumberDigits: number };

type Tc03Variant = {
  /** Test case name exactly as in the Tosca report */
  toscaName: string;
  /** Tosca step 17: Payments Option, as in the report */
  paymentOption: string;
  /** The payment radio's value on the site (the report's "Payments.Credit Card" is "Payments.Manual" on the page) */
  sitePaymentValue: string;
  /** Tosca step 19: Provide Payment Details */
  paymentDetails: Tc03PaymentData;
};

type Tc03Data = {
  tcId: string;
  /** Tosca step 5: Product Categories = BOOKS */
  category: { name: string; slug: string };
  /** Tosca step 6: buffer Product Link */
  productLink: string;
  /** Tosca step 7: #1 */
  productPosition: number;
  /** Tosca step 9: Add to Cart #1 */
  addToCartPosition: number;
  /** Tosca step 12: Shopping Cart row #1 */
  cartRowPosition: number;
  /** Tosca step 22: expected Success Message */
  successMessage: string;
  /** The four payment variants, one test each */
  variants: Tc03Variant[];
};

/** TC03: Order by payment method (data/demo/tc03.json). */
export const DEMO_TC03: Readonly<Tc03Data> = TC03_JSON as Tc03Data;

/** TC03 step 19: the payment details to enter for a variant; a purchase order number is generated here ({RND[6]}). */
export function demoTc03PaymentDetails(variant: Tc03Variant): DemoPaymentDetails {
  const details = variant.paymentDetails;
  return details.type === 'purchaseOrder' ? { type: 'purchaseOrder', poNumber: randomDigits(details.poNumberDigits) } : details;
}

type Tc04Data = {
  tcId: string;
  title: string;
  report: {
    /** Folder for the report, relative to the project root (Tosca used F:\Report). Empty = the test's own output folder. */
    folder: string;
    /** Tosca: OrderReport.xls. Written as .xlsx (the current Excel format). */
    fileName: string;
    /** Tosca: worksheet Order_Report */
    worksheetName: string;
    /** Step 18: header row values */
    headers: string[];
  };
  /** Step 14: every listed order is expected to have this status */
  expectedOrderStatus: string;
  mail: {
    /** Step 23: subject; each run adds a unique suffix so the step 25 count starts at zero */
    subjectPrefix: string;
    /** Step 25: matching mails expected in the receiver inbox */
    expectedMatches: number;
  };
};

/** TC04: Generate order report in Excel from My Account → Orders and email the report (data/demo/tc04.json). */
export const DEMO_TC04: Readonly<Tc04Data> = TC04_JSON;

/** Full path of the TC04 report: tc04.json report.folder under the project root, or `outputDir` when the folder is empty. */
export function demoTc04ReportPath(outputDir: string): string {
  const { folder, fileName } = DEMO_TC04.report;
  const projectRoot = path.resolve(__dirname, '..', '..');
  return path.join(folder ? path.resolve(projectRoot, folder) : outputDir, fileName);
}
