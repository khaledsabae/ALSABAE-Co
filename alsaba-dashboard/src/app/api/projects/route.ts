import { NextResponse } from 'next/server';
import { readSheetData, appendSheetRow } from '@/lib/sheets-database';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, { message: "Project name cannot be empty." }),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const projects = await readSheetData('Projects', 'A:B'); // Assuming Projects sheet with Name in col A, Description in B
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to get projects:', error);
    return NextResponse.json({ error: 'Failed to retrieve projects.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = projectSchema.safeParse(json);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const { name, description } = validatedData.data;
    const newRow = [name, description || ''];
    
    await appendSheetRow('Projects', newRow);

    return NextResponse.json({ message: 'Project created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
