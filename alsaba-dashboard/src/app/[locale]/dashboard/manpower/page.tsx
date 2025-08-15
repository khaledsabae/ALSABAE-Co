'use client'

import { DynamicSheetTable } from "@/components/ui/dynamic-sheet-table";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function ManpowerPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manpower & Resources</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button>Upload CSV/Excel</Button> 
          <Link href="/dashboard/manpower/create">
            <Button>Add Manpower</Button>
          </Link>
        </div>
      </div>
      <DynamicSheetTable sheetName="Manpower" />
    </main>
  );
}