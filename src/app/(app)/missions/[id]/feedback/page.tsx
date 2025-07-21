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
            미션 상세 정보로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold">AI 평가 피드백</h1>
        <p className="text-muted-foreground">제출물 분석: <span className="font-semibold text-primary">{mission.title}</span></p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>제출된 코드 스니펫</CardTitle>
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
                        GenAI 평가 요약
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        AI 기반 분석이 제출물을 검토했습니다. 아래는 주요 소프트웨어 엔지니어링 원칙에 대한 평가 분석입니다. 이 피드백을 사용하여 솔루션을 개선하고 이해를 심화하세요.
                    </p>
                </CardContent>
            </Card>
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>종합 점수</CardTitle>
                    <CardDescription>제출물 점수는 100점 만점에 {feedback.overallScore}점입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={feedback.overallScore} className="h-4" />
                </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
                <Button size="lg" asChild>
                    <Link href="/dashboard">
                        대시보드로 가기
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href={`/missions/${mission.id}/lab`}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        미션 재시도
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
                    <CardTitle>보안</CardTitle>
                    <CardDescription>배포 강화.</CardDescription>
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
                    <CardTitle>가독성</CardTitle>
                    <CardDescription>명확성과 유지보수성.</CardDescription>
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
                    <CardTitle>효율성</CardTitle>
                    <CardDescription>자원 최적화.</CardDescription>
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
