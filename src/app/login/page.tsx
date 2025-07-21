import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 17.5a6.5 6.5 0 1 1 5.5-11.5"/><path d="M22 12h-7.5"/><path d="M17.5 15.5V6.5"/><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/></svg>
    )
}
  
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10.13 10.13 0 0 0 12 2Z"/><path d="M12 2a10 10 0 0 0-3.13 19.52c.49.1.62-.22.62-.48v-1.74c-2.43.52-3-1.1-3-1.1a2.3 2.3 0 0 0-.94-1.24c-.78-.53.06-.52.06-.52a1.84 1.84 0 0 1 1.35 1c.23.4.6.75 1.13.94.39.28.78.22 1.13.1a1.86 1.86 0 0 1 .63-1.11c-1.88-.2-3.85-.92-3.85-4.18A3.33 3.33 0 0 1 8.9 6.75a3.1 3.1 0 0 1 .08-2.33s.7-.23 2.3.88a8.2 8.2 0 0 1 4.2 0c1.6-1.1 2.3-.88 2.3-.88a3.1 3.1 0 0 1 .08 2.33 3.33 3.33 0 0 1 .91 2.41c0 3.27-2 4-3.87 4.18a2.17 2.17 0 0 1 .62 1.69v2.52c0 .26.13.58.63.48A10 10 0 0 0 12 2Z"/></svg>
    )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
                <Logo className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to DevOps Dojo</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Login</Link>
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline"><GithubIcon className="mr-2 h-4 w-4" /> GitHub</Button>
                <Button variant="outline"><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
