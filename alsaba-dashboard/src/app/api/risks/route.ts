import { NextResponse } from 'next/server';
import { readSheetData, appendSheetRow } from '@/lib/sheets-database';
import { z } from 'zod';

const riskSchema = z.object({
  title: z.string().min(1, { message: "Risk title cannot be empty." }),
  description: z.string().optional(),
  level: z.enum(['Low', 'Medium', 'High']),
});

export async function GET() {
  try {
    const risks = await readSheetData('Risks', 'A:C'); // Assuming Risks sheet with Title in col A, Description in B, Level in C
    return NextResponse.json(risks);
  } catch (error) {
    console.error('Failed to get risks:', error);
    return NextResponse.json({ error: 'Failed to retrieve risks.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = riskSchema.safeParse(json);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const { title, description, level } = validatedData.data;
    const newRow = [title, description || '', level];
    
    await appendSheetRow('Risks', newRow);

    return NextResponse.json({ message: 'Risk created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create risk:', error);
    return NextResponse.json({ error: 'Failed to create risk.' }, { status: 500 });
  }
}
