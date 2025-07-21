'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  Zap, 
  Users, 
  Building, 
  GraduationCap,
  Crown,
  Sparkles,
  Shield,
  Clock,
  Database,
  HeadphonesIcon,
  Star
} from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    description: '개인 학습자를 위한 기본 플랜',
    icon: <Zap className="h-6 w-6" />,
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: false,
    features: [
      '월 10개 미션 제한',
      '기본 AI 피드백',
      '커뮤니티 지원',
      '표준 랩 환경',
      '기본 모니터링',
      '7일 무료 체험'
    ],
    limitations: [
      '팀 기능 없음',
      '고급 분석 없음',
      '우선순위 지원 없음'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: '전문 개발자와 엔지니어를 위한 플랜',
    icon: <Crown className="h-6 w-6" />,
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    features: [
      '무제한 미션',
      '고급 AI 피드백 및 분석',
      '우선순위 지원',
      '프리미엄 랩 환경',
      '실시간 모니터링',
      '커스텀 미션 생성',
      '상세 진행률 분석',
      '코드 평가 히스토리',
      'PDF 리포트 다운로드'
    ],
    limitations: [
      '팀 관리 기능 제한'
    ]
  },
  {
    id: 'team',
    name: 'Team',
    description: '팀과 기업을 위한 협업 플랜',
    icon: <Users className="h-6 w-6" />,
    monthlyPrice: 199,
    yearlyPrice: 1990,
    popular: false,
    features: [
      'Pro의 모든 기능',
      '최대 10명 팀원',
      '팀 대시보드',
      '팀 진행률 추적',
      '프라이빗 미션',
      '팀 성과 분석',
      '중앙 집중식 빌링',
      '관리자 권한',
      '온보딩 지원'
    ],
    limitations: []
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: '대기업을 위한 맞춤형 솔루션',
    icon: <Building className="h-6 w-6" />,
    monthlyPrice: null,
    yearlyPrice: null,
    popular: false,
    features: [
      'Team의 모든 기능',
      '무제한 팀원',
      'SSO/SAML 통합',
      '전용 지원팀',
      '온프레미스 배포 옵션',
      'API 액세스',
      '커스텀 통합',
      '법적 계약서',
      '24/7 기술 지원',
      '데이터 수출 기능'
    ],
    limitations: []
  }
];

const academicPlan = {
  id: 'academic',
  name: 'Academic',
  description: '교육기관 및 학생을 위한 특별 할인',
  icon: <GraduationCap className="h-6 w-6" />,
  discount: '50%',
  features: [
    'Pro 플랜 기능의 50% 할인',
    '교육 콘텐츠 접근',
    '강사용 대시보드',
    '학생 진행률 추적',
    '교육기관 지원'
  ]
};

const faqs = [
  {
    question: '무료 체험 기간이 있나요?',
    answer: 'Basic 플랜은 7일 무료 체험을 제공하며, Pro와 Team 플랜은 14일 무료 체험을 제공합니다.'
  },
  {
    question: '플랜을 언제든지 변경할 수 있나요?',
    answer: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경사항은 다음 결제 주기부터 적용됩니다.'
  },
  {
    question: 'AWS 인프라 비용이 별도로 청구되나요?',
    answer: '아니요, 모든 AWS EKS 및 인프라 비용은 구독 플랜에 포함되어 있습니다.'
  },
  {
    question: '팀 플랜에서 팀원을 추가/제거할 수 있나요?',
    answer: '네, 팀 관리자는 언제든지 팀원을 추가하거나 제거할 수 있습니다. 요금은 일할 계산으로 조정됩니다.'
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer: '30일 환불 보장 정책을 제공합니다. 만족하지 않으시면 전액 환불해드립니다.'
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice) return '문의';
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    return `$${price}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice || !plan.yearlyPrice) return 0;
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">간단하고 투명한 가격</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          DevOps 실력을 향상시키는 데 필요한 모든 도구와 리소스에 액세스하세요.
          언제든지 플랜을 변경할 수 있습니다.
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            월간 결제
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            연간 결제
          </span>
          <Badge variant="secondary" className="ml-2">
            <Sparkles className="h-3 w-3 mr-1" />
            최대 20% 절약
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  인기
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="min-h-12">{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="text-3xl font-bold">
                  {getPrice(plan)}
                  {plan.monthlyPrice && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{isYearly ? '년' : '월'}
                    </span>
                  )}
                </div>
                {isYearly && plan.monthlyPrice && (
                  <div className="text-sm text-green-600 font-medium">
                    {getSavings(plan)}% 절약
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                asChild
              >
                <Link href="/signup">
                  {plan.id === 'enterprise' ? '영업팀 문의' : '시작하기'}
                </Link>
              </Button>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">포함된 기능:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  <h4 className="font-medium text-sm text-muted-foreground">제한사항:</h4>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="text-xs text-muted-foreground">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-full w-fit">
            <GraduationCap className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-700 dark:text-green-300">
            {academicPlan.name} 플랜
          </CardTitle>
          <CardDescription>
            {academicPlan.description}
          </CardDescription>
          <div className="text-2xl font-bold text-green-600 mt-2">
            Pro 플랜에서 {academicPlan.discount} 할인
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2">
                {academicPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <Button variant="outline" className="border-green-300 text-green-700" asChild>
                <Link href="/signup">교육기관 문의</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                교육기관 이메일 주소 인증 필요
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>보안 및 규정 준수</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-center">
            <p>SOC 2 Type II 준수, GDPR 규정 준수, 엔터프라이즈급 보안으로 데이터를 보호합니다.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>99.9% 가동시간</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-center">
            <p>안정적인 AWS 인프라를 기반으로 언제든지 접근 가능한 실습 환경을 제공합니다.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <HeadphonesIcon className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>전문가 지원</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-center">
            <p>DevOps 전문가팀이 24/7 기술 지원과 학습 가이드를 제공합니다.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">자주 묻는 질문</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-xl font-bold mb-2">더 궁금한 점이 있으신가요?</h3>
        <p className="text-muted-foreground mb-4">
          영업팀이 귀하의 팀에 맞는 최적의 솔루션을 찾아드리겠습니다.
        </p>
        <Button asChild>
          <Link href="/signup">영업팀 문의</Link>
        </Button>
      </div>
    </div>
  );
}