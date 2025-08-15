
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Project A', progress: 4000, budget: 2400 },
  { name: 'Project B', progress: 3000, budget: 1398 },
  { name: 'Project C', progress: 2000, budget: 9800 },
  { name: 'Project D', progress: 2780, budget: 3908 },
  { name: 'Project E', progress: 1890, budget: 4800 },
  { name: 'Project F', progress: 2390, budget: 3800 },
  { name: 'Project G', progress: 3490, budget: 4300 },
];

export default function DashboardPage() {
    // a boolean that represents a loading state
 const loading = false;
 // a boolean that represents an error state
 const error = false;

 if (loading) {
 return <div>Loading...</div>;
    }

 if (error) {
 return <div>Error loading data</div>;
    }

 return (
 <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
 <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
 <Card>
 <CardHeader>
 <CardTitle>Total Projects</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold">12</div>
 </CardContent>
 </Card>
 <Card>
 <CardHeader>
 <CardTitle>Active Risks</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold">5</div>
 </CardContent>
 </Card>
 <Card>
 <CardHeader>
 <CardTitle>Total Budget</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold">$1.2M</div>
 </CardContent>
 </Card>
 <Card>
 <CardHeader>
 <CardTitle>Completion Rate</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold">85%</div>
 </CardContent>
 </Card>
 </div>
 <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
 <Card className="xl:col-span-2">
 <CardHeader>
 <CardTitle>Project Progress</CardTitle>
 <CardDescription>A summary of project progress against budget.</CardDescription>
 </CardHeader>
 <CardContent>
 <ResponsiveContainer width="100%" height={300}>
 <BarChart data={data}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="name" />
 <YAxis />
 <Tooltip />
 <Legend />
 <Bar dataKey="progress" fill="#8884d8" />
 <Bar dataKey="budget" fill="#82ca9d" />
 </BarChart>
 </ResponsiveContainer>
 </CardContent>
 </Card>
 </div>
 </main>
  );
}
