import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

export type OrderReportRow = { orderNumber: string; total: string };

export type OrderReportContent = {
  headers: string[];
  rows: OrderReportRow[];
};

/**
 * Tosca TC04 steps 16-19: writes the order report workbook once, after all orders are read
 * (Tosca opened, wrote and closed the workbook on every loop pass; that is not repeated here).
 * Row 1 is the header ("Order Number", "Total"); each order is one row below it.
 * Tosca used OrderReport.xls; the library writes the current Excel format, .xlsx.
 */
export async function writeOrderReport(filePath: string, worksheetName: string, headers: readonly string[], rows: OrderReportRow[]): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(worksheetName);
  sheet.addRow([...headers]).font = { bold: true };
  for (const row of rows) sheet.addRow([row.orderNumber, row.total]);
  sheet.columns.forEach((column) => (column.width = 18));
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await workbook.xlsx.writeFile(filePath);
}

/** Opens the saved workbook and returns its header and data rows, to check what was written. */
export async function readOrderReport(filePath: string, worksheetName: string): Promise<OrderReportContent> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet(worksheetName);
  if (!sheet) throw new Error(`Worksheet "${worksheetName}" not found in ${filePath}`);

  const cell = (rowNumber: number, column: number): string => String(sheet.getRow(rowNumber).getCell(column).value ?? '').trim();
  const rows: OrderReportRow[] = [];
  for (let r = 2; r <= sheet.rowCount; r++) rows.push({ orderNumber: cell(r, 1), total: cell(r, 2) });
  return { headers: [cell(1, 1), cell(1, 2)], rows };
}
