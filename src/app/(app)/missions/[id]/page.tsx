import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { missions } from "@/lib/data";
import { Check, Rocket, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = missions.find(m => m.id === id);

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
                <CardTitle>미션 목표</CardTitle>
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
                <Link href={`/missions/${id}/lab`}>
                    <Rocket className="mr-2 h-5 w-5" /> 랩 환경 시작
                </Link>
            </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>그라파나 미리보기</CardTitle>
                <CardDescription>실시간 환경 메트릭을 위한 플레이스홀더입니다.</CardDescription>
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
                        미리보기 없음
                    </div>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>AI 평가</CardTitle>
                <CardDescription>AI 기반 피드백을 위해 코드 또는 매니페스트를 제출하세요.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="여기에 쿠버네티스 매니페스트나 코드를 붙여넣으세요..." className="min-h-48 font-mono" />
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href={`/missions/${id}/feedback`}>
                        <Zap className="mr-2 h-4 w-4" /> 평가 제출
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}
