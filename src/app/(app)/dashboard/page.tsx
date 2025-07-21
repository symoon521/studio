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
    { name: '1월', total: 12 },
    { name: '2월', total: 19 },
    { name: '3월', total: 3 },
    { name: '4월', total: 5 },
    { name: '5월', total: 2 },
    { name: '6월', total: 3 },
]

const recentActivity = [
    {
        icon: <Rocket className="h-5 w-5" />,
        text: "미션 시작: EKS에 복원력 있는 웹 앱 배포하기",
        time: "15분 전",
    },
    {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        text: "미션 완료: 도커 입문",
        time: "3시간 전",
    },
    {
        icon: <GitCommit className="h-5 w-5" />,
        text: "팀원 'Alex'가 코드 평가를 위해 제출했습니다.",
        time: "1일 전",
    },
    {
        icon: <VenetianMask className="h-5 w-5 text-yellow-500" />,
        text: "카프카 이벤트 스트림 플레이스홀더: 랩 환경 이벤트입니다.",
        time: "2일 전",
    },
    {
        icon: <Server className="h-5 w-5 text-blue-500" />,
        text: "AWS 이벤트 플레이스홀더: EKS 클러스터 'lab-xyz'가 프로비저닝되었습니다.",
        time: "2일 전",
    },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">다시 오신 것을 환영합니다, 홍길동님!</h1>
          <p className="text-muted-foreground">데브옵스 여정의 스냅샷입니다.</p>
        </div>
        <Button asChild>
            <Link href="/missions">
                새 미션 시작 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

      <Tabs defaultValue="missions">
        <TabsList>
          <TabsTrigger value="missions">나의 미션</TabsTrigger>
          <TabsTrigger value="progress">팀 진행 상황</TabsTrigger>
          <TabsTrigger value="subscription">구독</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>EKS에 복원력 있는 웹 앱 배포하기</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">중급</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">진행률: 75%</p>
                <Progress value={75} aria-label="75% 완료" />
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full" asChild>
                    <Link href="/missions/1">미션 계속하기</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GitHub Actions로 CI/CD 파이프라인 구축</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">중급</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">진행률: 20%</p>
                <Progress value={20} aria-label="20% 완료" />
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full" asChild>
                    <Link href="/missions/2">미션 계속하기</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card className="border-dashed flex flex-col items-center justify-center text-center">
                 <CardHeader>
                    <CardTitle>새로운 도전과제 탐색</CardTitle>
                    <CardDescription>데브옵스 기술을 확장하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/missions">모든 미션 보기</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>월별 완료된 미션</CardTitle>
                    <CardDescription>지난 6개월간 팀의 활동입니다.</CardDescription>
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
                <CardTitle>구독 정보</CardTitle>
                <CardDescription>청구 및 요금제 정보를 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">현재 요금제</p>
                    <p className="font-semibold">팀 요금제</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">다음 결제일</p>
                    <p className="font-semibold">2024년 7월 30일</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">가격</p>
                    <p className="font-semibold">월 $99</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button disabled>구독 관리 (Stripe 연동)</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
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
