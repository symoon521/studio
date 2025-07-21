import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { missions } from "@/lib/data";
import { Clock, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function MissionCard({ mission }: { mission: (typeof missions)[0] }) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader>
        <div className="mb-4 h-40 w-full overflow-hidden rounded-md">
            <Image 
                src={`https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop&crop=center`}
                alt={mission.title}
                width={400}
                height={200}
                className="h-full w-full object-cover"
                data-ai-hint={`${mission.techStack[0]} ${mission.techStack[1]}`}
            />
        </div>
        <CardTitle>{mission.title}</CardTitle>
        <Badge variant={mission.difficulty === '초급' ? 'default' : mission.difficulty === '중급' ? 'secondary' : 'outline'} className="w-fit">{mission.difficulty}</Badge>
        <CardDescription className="pt-2 line-clamp-2">{mission.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1">
          {mission.techStack.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{mission.estimatedTime}</span>
        </div>
        <Button asChild>
          <Link href={`/missions/${mission.id}`}>미션 시작</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function MissionsPage() {
  const techStacks = [...new Set(missions.flatMap(m => m.techStack))];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">미션 카탈로그</h1>
        <p className="text-muted-foreground">다음 도전을 선택하고 데브옵스 기술을 레벨업하세요.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="미션 검색..." className="pl-10" />
        </div>
        <div className="flex gap-4">
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="난이도별 필터" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="beginner">초급</SelectItem>
                    <SelectItem value="intermediate">중급</SelectItem>
                    <SelectItem value="advanced">고급</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="기술 스택별 필터" />
                </SelectTrigger>
                <SelectContent>
                    {techStacks.map(tech => (
                        <SelectItem key={tech} value={tech.toLowerCase()}>{tech}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {missions.map(mission => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  )
}
