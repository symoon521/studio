import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { missions } from "@/lib/data";
import { Check, Rocket, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartData = [
  { name: "CPU", value: 65 },
  { name: "Mem", value: 45 },
  { name: "Disk", value: 22 },
];


export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const mission = missions.find(m => m.id === params.id);

  if (!mission) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                {mission.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">{mission.title}</h1>
            <p className="text-lg text-muted-foreground">{mission.longDescription}</p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Mission Objectives</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {mission.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>{obj}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        
        <div>
            <Button size="lg" asChild>
                <Link href={`/missions/${mission.id}/lab`}>
                    <Rocket className="mr-2 h-5 w-5" /> Start Lab Environment
                </Link>
            </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Grafana Preview</CardTitle>
                <CardDescription>Placeholder for live environment metrics.</CardDescription>
            </CardHeader>
            <CardContent>
                {mission.grafanaUrl ? (
                     <Image
                        src={mission.grafanaUrl}
                        alt="Grafana Preview"
                        width={600}
                        height={400}
                        className="rounded-md border"
                        data-ai-hint="dashboard graph"
                    />
                ) : (
                    <div className="h-48 flex items-center justify-center bg-muted rounded-md text-muted-foreground">
                        No preview available
                    </div>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>AI Evaluation</CardTitle>
                <CardDescription>Submit your code or manifest for AI-powered feedback.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="Paste your Kubernetes manifest or code here..." className="min-h-48 font-mono" />
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href={`/missions/${mission.id}/feedback`}>
                        <Zap className="mr-2 h-4 w-4" /> Submit for Evaluation
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}
