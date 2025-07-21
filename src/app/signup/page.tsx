import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/logo';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">계정 생성</CardTitle>
          <CardDescription>데브옵스 도조를 시작하려면 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">이름</Label>
              <Input id="full-name" placeholder="홍길동" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">역할</Label>
              <Select>
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
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">계정 생성</Link>
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
    </div>
  );
}
