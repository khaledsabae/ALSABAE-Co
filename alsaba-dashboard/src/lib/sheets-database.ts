import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Function to get an authenticated Google Sheets client
export async function getGoogleSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS!);

  const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  await client.authorize();

  const sheets = google.sheets({ version: 'v4', auth: client });
  return sheets;
}

// Function to read data from a sheet
export async function readSheetData(sheetName: string, range: string): Promise<string[][] | null | undefined> {
  const sheets = await getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${sheetName}!${range}`,
  });
  return response.data.values;
}

// Function to append a row to a sheet
export async function appendSheetRow(sheetName: string, rowData: string[]) {
  const sheets = await getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowData],
    },
  });
  return response.data;
}

// Function to update a row in a sheet
export async function updateSheetRow(sheetName: string, rowIndex: number, rowData: string[]) {
  const sheets = await getGoogleSheetsClient();
  const range = `${sheetName}!A${rowIndex}`; // Assuming the update starts from column A
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowData],
    },
  });
  return response.data;
}
