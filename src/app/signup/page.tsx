'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { Check, Zap, Crown, Users, AlertTriangle } from 'lucide-react';
import { registerUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    icon: <Zap className="h-5 w-5" />,
    features: ['월 10개 미션', '기본 AI 피드백', '커뮤니티 지원'],
    popular: false
  },
  {
    id: 'pro', 
    name: 'Pro',
    price: 79,
    icon: <Crown className="h-5 w-5" />,
    features: ['무제한 미션', '고급 AI 피드백', '우선순위 지원', '커스텀 미션'],
    popular: true
  },
  {
    id: 'team',
    name: 'Team', 
    price: 199,
    icon: <Users className="h-5 w-5" />,
    features: ['Pro 모든 기능', '최대 10명 팀원', '팀 대시보드', '팀 진행률 추적'],
    popular: false
  }
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        plan: selectedPlan
      });

      if (result.success) {
        toast({
          title: "회원가입 성공!",
          description: "DevopsBuddy에 오신 것을 환영합니다.",
        });
        // 잠시 후 대시보드로 이동
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setError(result.message);
        toast({
          title: "회원가입 실패",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
      toast({
        title: "오류",
        description: "회원가입 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="mx-auto w-full max-w-4xl">
        {step === 1 && (
          <Card className="mx-auto w-full max-w-sm">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <Logo className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">계정 생성</CardTitle>
              <CardDescription>DevopsBuddy를 시작하려면 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full-name">이름</Label>
                  <Input 
                    id="full-name" 
                    placeholder="홍길동" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">역할</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger id="role" aria-label="역할 선택">
                      <SelectValue placeholder="역할을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">개인</SelectItem>
                      <SelectItem value="team">팀</SelectItem>
                      <SelectItem value="company">회사</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="button" 
                  className="w-full" 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || !formData.password || !formData.role}
                >
                  다음: 요금제 선택
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="underline" prefetch={false}>
                  로그인
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">요금제를 선택하세요</h1>
              <p className="text-muted-foreground mt-2">언제든지 변경할 수 있습니다</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative cursor-pointer transition-all ${
                    selectedPlan === plan.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                  } ${plan.popular ? 'scale-105' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">인기</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {plan.icon}
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/월</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                  이전
                </Button>
                <Button onClick={handleSignup} size="lg" disabled={isLoading}>
                  {isLoading ? '계정 생성 중...' : 'DevopsBuddy 시작하기'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
