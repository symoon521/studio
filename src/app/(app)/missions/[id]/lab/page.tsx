'use client';

import { useEffect, useRef, useState, use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { missions } from '@/lib/data';
import { 
  HardDrive, 
  MemoryStick, 
  Cpu, 
  AlertCircle, 
  Power, 
  Send, 
  Terminal,
  Activity,
  Server,
  FileText,
  Copy,
  CheckCircle2,
  Clock,
  RotateCcw,
  Monitor
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

type LabStatus = 'initializing' | 'running' | 'stopped' | 'error';

function SimulatedTerminal({ missionId }: { missionId: string }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; type: 'info' | 'command' | 'output' | 'error' }>>([
    { text: `Welcome to DevopsBuddy Lab Environment - Mission ${missionId}`, type: 'info' },
    { text: '=====================================', type: 'info' },
    { text: `Kubernetes cluster: lab-${missionId}`, type: 'info' },
    { text: 'Status: Running | Nodes: 3 (Ready)', type: 'info' },
    { text: `Namespace: mission-${missionId}`, type: 'info' },
    { text: '', type: 'info' },
    { text: 'Ready for your mission! Type "help" for available commands.', type: 'info' },
  ]);
  const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

  const commands: { [key: string]: string } = {
    help: `Available commands:
- kubectl get pods/services/deployments
- kubectl apply -f <file>
- kubectl logs <pod-name>
- kubectl describe <resource>
- docker build -t <image> .
- helm install <release> <chart>
- clear`,
    'kubectl get pods': `NAME                          READY   STATUS    RESTARTS   AGE
my-app-6d8d47b48f-abcde       1/1     Running   0          5m12s
my-app-6d8d47b48f-fghij       1/1     Running   0          5m12s`,
    'kubectl get services': `NAME          TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
my-app-svc    LoadBalancer   10.100.200.50   a123bc45...     80:30080/TCP   5m30s`,
    'kubectl get deployments': `NAME     READY   UP-TO-DATE   AVAILABLE   AGE
my-app   2/2     2            2           5m45s`,
    'kubectl get nodes': `NAME                          STATUS   ROLES    AGE   VERSION
lab-${missionId}-node-1       Ready    master   1h    v1.28.0
lab-${missionId}-node-2       Ready    worker   1h    v1.28.0
lab-${missionId}-node-3       Ready    worker   1h    v1.28.0`,
    'docker ps': `CONTAINER ID   IMAGE            COMMAND                  STATUS
abc123def456   my-app:latest    "node server.js"         Up 5 minutes
ghi789jkl012   nginx:alpine     "/docker-entrypoint..."  Up 5 minutes`,
    'helm list': `NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART
my-app  mission-${missionId}  1               2025-07-21 10:30:15.123456789 +0000 UTC  deployed        my-app-0.1.0`,
    ls: `total 8
-rw-r--r-- 1 user user 1.2K Jul 21 10:00 deployment.yaml
-rw-r--r-- 1 user user  564 Jul 21 10:00 service.yaml
-rw-r--r-- 1 user user  892 Jul 21 10:00 hpa.yaml`,
    clear: '',
  };

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory: Array<{ text: string; type: 'info' | 'command' | 'output' | 'error' }> = [...history, { text: input, type: 'command' }];
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (commands[cmd]) {
        newHistory.push({ text: commands[cmd], type: 'output' });
        setHistory(newHistory);
      } else if (cmd.startsWith('kubectl apply')) {
        newHistory.push({ text: 'deployment.apps/my-app created\nservice/my-app-service created', type: 'output' });
        setHistory(newHistory);
      } else if (cmd.startsWith('kubectl logs')) {
        newHistory.push({ text: '2025-07-21T10:30:15.123Z [INFO] Server started on port 8080\n2025-07-21T10:30:16.456Z [INFO] Health check endpoint ready', type: 'output' });
        setHistory(newHistory);
      } else if (cmd !== '') {
        newHistory.push({ text: `bash: ${input}: command not found`, type: 'error' });
        setHistory(newHistory);
      }
      setInput('');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Kubernetes 터미널
        </CardTitle>
        <CardDescription>실습 환경에서 명령어를 실행하세요</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm flex-grow overflow-y-auto min-h-0"
             onClick={() => document.getElementById('terminal-input')?.focus()}>
          <div className="space-y-1">
            {history.map((line, index) => (
              <div key={index} className="flex">
                {line.type === 'command' && <span className="text-blue-400 mr-2">$</span>}
                <span className={
                  line.type === 'info' ? 'text-gray-400' :
                  line.type === 'error' ? 'text-red-500' :
                  line.type === 'command' ? 'text-white' :
                  'text-green-400 whitespace-pre-wrap'
                }>
                  {line.text}
                </span>
              </div>
            ))}
            <div ref={endOfHistoryRef} />
          </div>
        </div>
        <div className="mt-4 flex items-center bg-black text-green-400 p-2 rounded-md font-mono">
          <span className="text-blue-400 mr-2">$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="bg-transparent w-full focus:outline-none text-white"
            placeholder="명령어를 입력하세요..."
            autoFocus
          />
        </div>
      </CardContent>
    </Card>
  );
}

function LiveMetrics() {
    const [cpuData, setCpuData] = useState([{ value: 20 }]);
    const [memData, setMemData] = useState([{ value: 45 }]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuData(prev => [...prev.slice(-29), { value: Math.random() * 80 + 10 }]);
            setMemData(prev => [...prev.slice(-29), { value: Math.random() * 60 + 20 }]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const renderChart = (data: { value: number }[], color: string) => (
        <ResponsiveContainer width="100%" height={80}>
            <LineChart data={data}>
                <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <YAxis domain={[0, 100]} hide />
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>실시간 메트릭 (그라파나)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                        <Cpu className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-bold">CPU 사용량</p>
                            <p className="text-2xl font-mono">{cpuData[cpuData.length - 1].value.toFixed(1)}%</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {renderChart(cpuData, "hsl(var(--primary))")}
                    </div>
                </div>
                 <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                        <MemoryStick className="h-6 w-6 text-accent" />
                        <div>
                            <p className="font-bold">메모리 사용량</p>
                            <p className="text-2xl font-mono">{memData[memData.length - 1].value.toFixed(1)}%</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {renderChart(memData, "hsl(var(--accent))")}
                    </div>
                </div>
                 <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                        <HardDrive className="h-6 w-6 text-yellow-500" />
                        <div>
                            <p className="font-bold">디스크 사용량</p>
                            <p className="text-2xl font-mono">22%</p>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-muted/50 border border-dashed rounded-lg flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-5 w-5"/>
                    <p>AWS EKS 상태: <span className="text-foreground font-medium">클러스터 정상</span></p>
                </div>
            </CardContent>
        </Card>
    );
}

function QuickCommands({ onCommand }: { onCommand: (cmd: string) => void }) {
  const commonCommands = [
    'kubectl get pods',
    'kubectl get services', 
    'kubectl get deployments',
    'kubectl apply -f deployment.yaml',
    'helm list',
    'docker ps'
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          빠른 명령어
        </CardTitle>
        <CardDescription>자주 사용하는 명령어를 클릭하여 실행하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {commonCommands.map((cmd) => (
            <div key={cmd} className="flex items-center justify-between p-2 bg-muted rounded hover:bg-muted/80 transition-colors">
              <code className="text-sm flex-1">{cmd}</code>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(cmd)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const mission = missions.find(m => m.id === id);
  const [labStatus, setLabStatus] = useState<LabStatus>('running');

  if (!mission) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{mission.title}</h1>
          <p className="text-muted-foreground">실습 환경에서 미션을 완료하세요</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={labStatus === 'running' ? 'default' : labStatus === 'error' ? 'destructive' : 'secondary'}>
            {labStatus === 'running' && <Activity className="h-3 w-3 mr-1" />}
            {labStatus === 'initializing' && <Clock className="h-3 w-3 mr-1" />}
            {labStatus === 'error' && <AlertCircle className="h-3 w-3 mr-1" />}
            랩 환경: {labStatus === 'running' ? '활성' : labStatus}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setLabStatus('initializing')}>
            <RotateCcw className="h-4 w-4 mr-2" />
            재시작
          </Button>
          <Button variant="destructive" size="sm">
            <Power className="h-4 w-4 mr-2" />
            랩 중지
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SimulatedTerminal missionId={id} />
          <QuickCommands onCommand={() => {}} />
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monitoring">모니터링</TabsTrigger>
              <TabsTrigger value="resources">리소스</TabsTrigger>
              <TabsTrigger value="objectives">목표</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring">
              <LiveMetrics />
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    클러스터 상태
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        EKS 클러스터
                      </span>
                      <Badge variant="default">정상</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        워커 노드 (3개)
                      </span>
                      <Badge variant="default">Ready</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        네임스페이스
                      </span>
                      <Badge variant="default">mission-{id}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        실행 중인 파드
                      </span>
                      <Badge variant="secondary">2/2</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objectives">
              <Card>
                <CardHeader>
                  <CardTitle>미션 목표</CardTitle>
                  <CardDescription>완료해야 할 작업들</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mission.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-4 w-4 border border-muted-foreground rounded-full mt-0.5" />
                        <span className="text-sm">{objective}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button className="w-full" asChild>
                      <Link href={`/missions/${id}/feedback`}>
                        <Send className="h-4 w-4 mr-2" />
                        작업 완료 및 평가 요청
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
