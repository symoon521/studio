'use client';

import { useState, use } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { aiFeedback, missions } from "@/lib/data";
import { 
  BookOpen, 
  Gauge, 
  Shield, 
  VenetianMask, 
  ArrowLeft, 
  RefreshCw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Download,
  Share2,
  Copy,
  Bot
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const issuesFound = [
  {
    type: 'critical',
    icon: <XCircle className="h-4 w-4" />,
    title: '리소스 제한 미설정',
    description: 'CPU 및 메모리 리소스 요청과 제한이 정의되지 않음',
    suggestion: 'resources.requests와 resources.limits를 추가하세요',
    line: 14
  },
  {
    type: 'warning',
    icon: <AlertTriangle className="h-4 w-4" />,
    title: 'Security Context 부재',
    description: '컨테이너가 루트 권한으로 실행될 수 있음',
    suggestion: 'securityContext를 추가하여 runAsNonRoot: true 설정',
    line: 12
  },
  {
    type: 'info',
    icon: <CheckCircle2 className="h-4 w-4" />,
    title: '네임스페이스 명시',
    description: '배포 매니페스트 구조가 올바름',
    suggestion: '좋은 구조를 유지하세요',
    line: null
  }
];

const recommendations = [
  {
    category: '보안 강화',
    items: [
      'Pod Security Standards 적용',
      'Network Policy 구성',
      'RBAC 권한 최소화',
      'Secret 관리 개선'
    ]
  },
  {
    category: '가용성 향상',
    items: [
      'Health Check 추가',
      'Rolling Update 전략 설정',
      'PodDisruptionBudget 구성',
      'Multi-AZ 배포'
    ]
  },
  {
    category: '성능 최적화',
    items: [
      'HPA(Horizontal Pod Autoscaler) 설정',
      'Node Affinity 규칙 적용',
      '리소스 모니터링 강화',
      'CPU/Memory 프로파일링'
    ]
  }
];

export default function FeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const mission = missions.find(m => m.id === id);
  const feedback = aiFeedback;
  const [activeTab, setActiveTab] = useState('overview');

  if (!mission) {
    notFound();
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge variant="default" className="bg-green-500">우수</Badge>;
    if (score >= 60) return <Badge variant="secondary">보통</Badge>;
    return <Badge variant="destructive">개선 필요</Badge>;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/missions/${id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            미션 상세 정보로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI 평가 피드백
          </h1>
          <p className="text-muted-foreground">제출물 분석: <span className="font-semibold text-primary">{mission.title}</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            리포트 다운로드
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            공유
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              종합 점수
            </CardTitle>
            <CardDescription>AI 기반 평가 결과</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                {feedback.overallScore}/100
              </div>
              <div className="mt-2">
                {getScoreBadge(feedback.overallScore)}
              </div>
            </div>
            <Progress value={feedback.overallScore} className="h-3" />
            
            <div className="space-y-3 mt-6">
              <div className="flex justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  보안
                </span>
                <span className="text-sm font-medium">6/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  가독성
                </span>
                <span className="text-sm font-medium">8/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-green-500" />
                  효율성
                </span>
                <span className="text-sm font-medium">7/10</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Button className="w-full" asChild>
                <Link href="/dashboard">
                  대시보드로 가기
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/missions/${id}/lab`}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  미션 재시도
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="issues">이슈 분석</TabsTrigger>
              <TabsTrigger value="recommendations">개선 제안</TabsTrigger>
              <TabsTrigger value="code">코드 리뷰</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <div>
                      <CardTitle className="text-lg">보안</CardTitle>
                      <CardDescription>배포 보안 강화 필요</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{feedback.security}</p>
                    <div className="mt-3">
                      <Badge variant="destructive">중요</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">가독성</CardTitle>
                      <CardDescription>구조가 잘 정리됨</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{feedback.readability}</p>
                    <div className="mt-3">
                      <Badge variant="default">양호</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <Gauge className="h-6 w-6 text-green-500" />
                    <div>
                      <CardTitle className="text-lg">효율성</CardTitle>
                      <CardDescription>리소스 최적화 권장</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{feedback.efficiency}</p>
                    <div className="mt-3">
                      <Badge variant="secondary">개선 여지</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>발견된 이슈</CardTitle>
                  <CardDescription>코드에서 발견된 주요 문제점들</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {issuesFound.map((issue, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        issue.type === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/10' :
                        issue.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10' :
                        'border-green-500 bg-green-50 dark:bg-green-900/10'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${
                            issue.type === 'critical' ? 'text-red-500' :
                            issue.type === 'warning' ? 'text-yellow-500' :
                            'text-green-500'
                          }`}>
                            {issue.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{issue.title}</h4>
                              {issue.line && (
                                <Badge variant="outline" className="text-xs">
                                  라인 {issue.line}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                            <p className="text-sm font-medium mt-2">{issue.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <div className="grid md:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        {rec.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {rec.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    제출된 코드
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(feedback.code)}>
                      <Copy className="h-4 w-4 mr-2" />
                      복사
                    </Button>
                  </CardTitle>
                  <CardDescription>AI가 분석한 Kubernetes 매니페스트</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-black text-green-400 p-4 rounded-md text-sm overflow-x-auto">
                    <code>{feedback.code}</code>
                  </pre>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">개선된 버전</h4>
                    <Textarea
                      placeholder="AI가 제안하는 개선된 코드가 여기에 표시됩니다..."
                      className="min-h-32 font-mono text-sm"
                      readOnly
                      value={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      containers:
      - name: my-app-container
        image: my-node-app:1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
