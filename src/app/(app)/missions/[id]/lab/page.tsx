'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { missions } from '@/lib/data';
import { HardDrive, MemoryStick, Cpu, AlertCircle, Power, Send } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

function SimulatedTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'Welcome to the DevOps Dojo Lab Environment!', type: 'info' as const },
    { text: 'Your EKS cluster is ready. Pod status: Running.', type: 'info' as const },
    { text: 'Type `help` for a list of available commands.', type: 'info' as const },
  ]);
  const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

  const commands: { [key: string]: string } = {
    help: 'Available commands: help, ls, kubectl get pods, clear',
    ls: '-rw-r--r-- 1 user user 1.2K Jul 29 10:00 deployment.yaml\n-rw-r--r-- 1 user user  564 Jul 29 10:00 service.yaml',
    'kubectl get pods': 'NAME                     READY   STATUS    RESTARTS   AGE\nmy-app-6d8d47b48f-abcde   1/1     Running   0          5m',
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
      const newHistory = [...history, { text: input, type: 'command' as const }];
      const commandOutput = commands[input.trim().toLowerCase()];
      
      if (input.trim().toLowerCase() === 'clear') {
        setHistory([]);
      } else if (commandOutput) {
        newHistory.push({ text: commandOutput, type: 'output' as const });
        setHistory(newHistory);
      } else {
        newHistory.push({ text: `command not found: ${input}`, type: 'error' as const });
        setHistory(newHistory);
      }
      setInput('');
    }
  };

  return (
    <Card className="h-full flex flex-col bg-black text-white font-mono text-sm">
      <CardHeader>
        <CardTitle className="text-primary">Kubernetes Pod Terminal</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
        <div className="h-full">
            {history.map((line, index) => (
            <div key={index}>
                {line.type === 'command' && <span className="text-blue-400">$ ~ </span>}
                <span className={
                    line.type === 'info' ? 'text-gray-400' :
                    line.type === 'error' ? 'text-red-500' :
                    'text-green-400 whitespace-pre-wrap'
                }>
                {line.text}
                </span>
            </div>
            ))}
            <div ref={endOfHistoryRef} />
        </div>
      </CardContent>
      <div className="p-4 border-t border-gray-800 flex items-center">
        <span className="text-blue-400 mr-2">$ ~</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="bg-transparent w-full focus:outline-none"
          autoFocus
        />
      </div>
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
                <CardTitle>Live Metrics (Grafana)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                        <Cpu className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-bold">CPU Usage</p>
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
                            <p className="font-bold">Memory Usage</p>
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
                            <p className="font-bold">Disk Usage</p>
                            <p className="text-2xl font-mono">22%</p>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-muted/50 border border-dashed rounded-lg flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-5 w-5"/>
                    <p>AWS EKS Status: <span className="text-foreground font-medium">Cluster Healthy</span></p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function LabPage({ params }: { params: { id: string } }) {
  const mission = missions.find(m => m.id === params.id);

  if (!mission) {
    notFound();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.14)-2rem)] gap-4">
        <div className="flex items-center justify-between bg-card p-3 rounded-lg border">
            <div>
                <h1 className="text-xl font-bold">{mission.title}</h1>
                <p className="text-sm text-muted-foreground">Lab Environment: Active</p>
            </div>
            <div className="flex gap-2">
                <Button variant="destructive">
                    <Power className="mr-2 h-4 w-4" /> Stop Lab
                </Button>
                <Button asChild>
                    <Link href={`/missions/${mission.id}/feedback`}>
                        <Send className="mr-2 h-4 w-4" /> Submit Mission
                    </Link>
                </Button>
            </div>
        </div>
        <div className="flex-grow grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                <SimulatedTerminal />
            </div>
            <div>
                <LiveMetrics />
            </div>
        </div>
    </div>
  );
}
