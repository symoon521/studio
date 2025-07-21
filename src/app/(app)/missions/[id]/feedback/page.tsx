import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { aiFeedback, missions } from "@/lib/data";
import { BookOpen, Gauge, Shield, VenetianMask, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function FeedbackPage({ params }: { params: { id: string } }) {
  const mission = missions.find(m => m.id === params.id);
  const feedback = aiFeedback;

  if (!mission) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/missions/${mission.id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mission Details
        </Link>
        <h1 className="text-3xl font-bold">AI Evaluation Feedback</h1>
        <p className="text-muted-foreground">Analysis of your submission for: <span className="font-semibold text-primary">{mission.title}</span></p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Submitted Code Snippet</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm text-foreground overflow-x-auto">
                        <code>{feedback.code}</code>
                    </pre>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <VenetianMask className="h-6 w-6 text-primary"/>
                        GenAI Evaluation Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        Our AI-powered analysis has reviewed your submission. Below is a breakdown of the evaluation across key software engineering principles. Use this feedback to improve your solution and deepen your understanding.
                    </p>
                </CardContent>
            </Card>
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overall Score</CardTitle>
                    <CardDescription>Your submission scored {feedback.overallScore} out of 100.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={feedback.overallScore} className="h-4" />
                </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
                <Button size="lg" asChild>
                    <Link href="/dashboard">
                        Go to Dashboard
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href={`/missions/${mission.id}/lab`}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry Mission
                    </Link>
                </Button>
            </div>
        </div>
      </div>
        
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <Shield className="h-8 w-8 text-destructive" />
                <div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Hardening your deployment.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{feedback.security}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <BookOpen className="h-8 w-8 text-accent" />
                <div>
                    <CardTitle>Readability</CardTitle>
                    <CardDescription>Clarity and maintainability.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{feedback.readability}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <Gauge className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Efficiency</CardTitle>
                    <CardDescription>Resource optimization.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{feedback.efficiency}</p>
            </CardContent>
        </Card>
      </div>

    </div>
  )
}
