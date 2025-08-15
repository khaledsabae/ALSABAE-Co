
'use client'

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface Risk {
  id: string;
  name: string;
  description: string;
  status: string;
}

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRisks() {
      try {
        const res = await fetch('/api/risks');
        if (!res.ok) {
          throw new Error('Failed to fetch risks');
        }
        const data = await res.json();
        setRisks(data);
      } catch (_error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRisks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading risks</div>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Risks</h1>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/dashboard/risks/create">
            <Button>Create Risk</Button>
          </Link>
        </div>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {risks.map((risk) => (
              <TableRow key={risk.id}>
                <TableCell>{risk.name}</TableCell>
                <TableCell>{risk.description}</TableCell>
                <TableCell>{risk.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
