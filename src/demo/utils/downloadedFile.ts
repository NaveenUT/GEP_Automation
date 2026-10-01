import fs from 'fs';
import path from 'path';
import type { Download } from '@playwright/test';

/**
 * TC02 steps 11-12 alternate (NOT PLAYWRIGHT-SUPPORTED in the browser): save a captured download to a folder
 * and read it back with the test runner's filesystem API. Tosca used the fixed folder D:\Tosca_Projects.
 */
export async function saveDownload(download: Download, folder: string): Promise<string> {
  const filePath = path.join(folder, download.suggestedFilename());
  await fs.promises.mkdir(folder, { recursive: true });
  // A copy left by an earlier run must not make the existence check pass.
  await fs.promises.rm(filePath, { force: true });
  await download.saveAs(filePath);
  return filePath;
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/** The file's text, without a leading UTF-8 byte-order mark (the demo site's sample files start with one). */
export async function readTextFile(filePath: string): Promise<string> {
  return (await fs.promises.readFile(filePath, 'utf8')).replace(/^\uFEFF/, '');
}
