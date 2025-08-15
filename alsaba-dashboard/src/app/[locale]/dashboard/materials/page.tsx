
'use client'

import { DynamicSheetTable } from "@/components/ui/dynamic-sheet-table";

export default function MaterialsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Material Status</h1>
      </div>
      <DynamicSheetTable sheetName="Material Status" />
    </main>
  );
}
