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
  { month: '1월', activeUsers: 400, signups: 240 },
  { month: '2월', activeUsers: 300, signups: 139 },
  { month: '3월', activeUsers: 200, signups: 480 },
  { month: '4월', activeUsers: 278, signups: 390 },
  { month: '5월', activeUsers: 189, signups: 280 },
  { month: '6월', activeUsers: 239, signups: 380 },
  { month: '7월', activeUsers: 349, signups: 430 },
];

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 사용자 수</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">10,234</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +20.1%</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">활성 구독</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,421</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +180.1%</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">완료된 미션</CardTitle>
                <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5,730</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +19%</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">월간 반복 수익</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +5.2%</p>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">사용자 분석</TabsTrigger>
          <TabsTrigger value="missions">미션 관리</TabsTrigger>
          <TabsTrigger value="settings">AI 평가 설정</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>사용자 활동</CardTitle>
                    <CardDescription>지난 7개월간의 활성 사용자 및 신규 가입자.</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userActivityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                            <Legend />
                            <Line type="monotone" dataKey="activeUsers" stroke="hsl(var(--primary))" name="활성 사용자" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="signups" name="신규 가입" stroke="hsl(var(--accent))" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="missions" className="mt-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>미션 제어</CardTitle>
                        <CardDescription>데브옵스 미션을 추가, 편집 또는 삭제하세요.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        미션 추가
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>제목</TableHead>
                                <TableHead>난이도</TableHead>
                                <TableHead>기술 스택</TableHead>
                                <TableHead>작업</TableHead>
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
                                                    <span className="sr-only">메뉴 토글</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>편집</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">삭제</DropdownMenuItem>
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
                    <CardTitle>AI 평가 설정</CardTitle>
                    <CardDescription>코드 및 랩 분석에 사용되는 AI 프롬프트를 미세 조정하세요.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="prompt-type">프롬프트 유형</Label>
                        <Select defaultValue="codeEvaluation">
                            <SelectTrigger id="prompt-type" className="w-[280px]">
                                <SelectValue placeholder="프롬프트 유형 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="codeEvaluation">코드 평가</SelectItem>
                                <SelectItem value="labAnalysis">랩 분석</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="ai-prompt">AI 프롬프트</Label>
                        <Textarea 
                            id="ai-prompt"
                            className="min-h-64 font-mono"
                            defaultValue={`You are an AI code evaluation tool. You will be given a code snippet, and you will evaluate it based on its security, readability, and efficiency. Provide feedback for each of these categories.

Code:
{{{code}}}

Output a JSON object with keys for security, readability, efficiency, and overallScore.  The first three keys should be strings, and overallScore should be a number between 0 and 100.`}
                        />
                    </div>
                    <Button>프롬프트 저장</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
