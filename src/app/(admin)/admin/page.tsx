'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { missions } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle, Users, Rocket, DollarSign } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const userActivityData = [
  { month: 'Jan', activeUsers: 400, signups: 240 },
  { month: 'Feb', activeUsers: 300, signups: 139 },
  { month: 'Mar', activeUsers: 200, signups: 480 },
  { month: 'Apr', activeUsers: 278, signups: 390 },
  { month: 'May', activeUsers: 189, signups: 280 },
  { month: 'Jun', activeUsers: 239, signups: 380 },
  { month: 'Jul', activeUsers: 349, signups: 430 },
];

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">10,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,421</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Missions Completed</CardTitle>
                <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5,730</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
          <TabsTrigger value="missions">Manage Missions</TabsTrigger>
          <TabsTrigger value="settings">AI Evaluation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Active users and new signups over the last 7 months.</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userActivityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                            <Legend />
                            <Line type="monotone" dataKey="activeUsers" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="signups" stroke="hsl(var(--accent))" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="missions" className="mt-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Mission Control</CardTitle>
                        <CardDescription>Add, edit, or delete DevOps missions.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Add Mission
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead>Tech Stack</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {missions.map(mission => (
                                <TableRow key={mission.id}>
                                    <TableCell className="font-medium">{mission.title}</TableCell>
                                    <TableCell><Badge variant="outline">{mission.difficulty}</Badge></TableCell>
                                    <TableCell className="max-w-xs truncate">{mission.techStack.join(', ')}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>AI Evaluation Settings</CardTitle>
                    <CardDescription>Fine-tune the prompts used by the AI for code and lab analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="prompt-type">Prompt Type</Label>
                        <Select defaultValue="codeEvaluation">
                            <SelectTrigger id="prompt-type" className="w-[280px]">
                                <SelectValue placeholder="Select prompt type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="codeEvaluation">Code Evaluation</SelectItem>
                                <SelectItem value="labAnalysis">Lab Analysis</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="ai-prompt">AI Prompt</Label>
                        <Textarea 
                            id="ai-prompt"
                            className="min-h-64 font-mono"
                            defaultValue={`You are an AI code evaluation tool. You will be given a code snippet, and you will evaluate it based on its security, readability, and efficiency. Provide feedback for each of these categories.

Code:
{{{code}}}

Output a JSON object with keys for security, readability, efficiency, and overallScore.  The first three keys should be strings, and overallScore should be a number between 0 and 100.`}
                        />
                    </div>
                    <Button>Save Prompt</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
