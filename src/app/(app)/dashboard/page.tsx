'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import Link from "next/link"
import { ArrowRight, CheckCircle2, GitCommit, Rocket, Server, VenetianMask } from "lucide-react"

const teamData = [
    { name: 'Jan', total: 12 },
    { name: 'Feb', total: 19 },
    { name: 'Mar', total: 3 },
    { name: 'Apr', total: 5 },
    { name: 'May', total: 2 },
    { name: 'Jun', total: 3 },
]

const recentActivity = [
    {
        icon: <Rocket className="h-5 w-5" />,
        text: "You started mission: Deploy a Resilient Web App on EKS",
        time: "15m ago",
    },
    {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        text: "You completed mission: Intro to Docker",
        time: "3h ago",
    },
    {
        icon: <GitCommit className="h-5 w-5" />,
        text: "Team member 'Alex' submitted code for evaluation.",
        time: "1d ago",
    },
    {
        icon: <VenetianMask className="h-5 w-5 text-yellow-500" />,
        text: "Placeholder for Kafka Event Stream: Lab environment event.",
        time: "2d ago",
    },
    {
        icon: <Server className="h-5 w-5 text-blue-500" />,
        text: "Placeholder for AWS Event: EKS Cluster 'lab-xyz' provisioned.",
        time: "2d ago",
    },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here&apos;s a snapshot of your DevOps journey.</p>
        </div>
        <Button asChild>
            <Link href="/missions">
                Start New Mission <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

      <Tabs defaultValue="missions">
        <TabsList>
          <TabsTrigger value="missions">My Missions</TabsTrigger>
          <TabsTrigger value="progress">Team Progress</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Deploy a Resilient Web App on EKS</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">Intermediate</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Progress: 75%</p>
                <Progress value={75} aria-label="75% complete" />
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full" asChild>
                    <Link href="/missions/1">Continue Mission</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>CI/CD Pipeline with GitHub Actions</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">Intermediate</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Progress: 20%</p>
                <Progress value={20} aria-label="20% complete" />
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full" asChild>
                    <Link href="/missions/2">Continue Mission</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card className="border-dashed flex flex-col items-center justify-center text-center">
                 <CardHeader>
                    <CardTitle>Explore New Challenges</CardTitle>
                    <CardDescription>Expand your DevOps skills.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/missions">View All Missions</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Missions Completed per Month</CardTitle>
                    <CardDescription>Your team's activity over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={teamData}>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="subscription" className="mt-4">
          <Card>
            <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>Manage your billing and plan information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Current Plan</p>
                    <p className="font-semibold">Team Plan</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Next Billing Date</p>
                    <p className="font-semibold">July 30, 2024</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-semibold">$99/month</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button disabled>Manage Subscription (Stripe Integration)</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="bg-muted rounded-full p-2">{activity.icon}</div>
                    <div className="flex-1">
                        <p>{activity.text}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
