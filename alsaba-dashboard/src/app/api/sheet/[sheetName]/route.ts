
import { NextRequest, NextResponse } from 'next/server';
import { readSheetData } from '@/lib/sheets-database';

export async function GET(
  request: NextRequest,
  { params }: { params: { sheetName: string } }
) {
  const sheetName = params.sheetName;

  if (!sheetName) {
    return NextResponse.json({ error: 'Sheet name is required' }, { status: 400 });
  }

  try {
    // Read the entire sheet. Assuming the data is in a contiguous block.
    // The range 'A1:Z' is a common way to get all data in a sheet.
    const data = await readSheetData(sheetName, 'A1:Z');

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Sheet not found or is empty' }, { status: 404 });
    }

    const headers = data[0];
    const rows = data.slice(1);

    return NextResponse.json({ headers, rows });
  } catch (error) {
    console.error('Error reading sheet:', error);
    return NextResponse.json({ error: 'Failed to read sheet data' }, { status: 500 });
  }
}
