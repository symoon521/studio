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
                src={`https://placehold.co/400x200.png`}
                alt={mission.title}
                width={400}
                height={200}
                className="h-full w-full object-cover"
                data-ai-hint={`${mission.techStack[0]} ${mission.techStack[1]}`}
            />
        </div>
        <CardTitle>{mission.title}</CardTitle>
        <Badge variant={mission.difficulty === 'Beginner' ? 'default' : mission.difficulty === 'Intermediate' ? 'secondary' : 'outline'} className="w-fit">{mission.difficulty}</Badge>
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
          <Link href={`/missions/${mission.id}`}>Start Mission</Link>
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
        <h1 className="text-3xl font-bold">Missions Catalog</h1>
        <p className="text-muted-foreground">Choose your next challenge and level up your DevOps skills.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search missions..." className="pl-10" />
        </div>
        <div className="flex gap-4">
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by difficulty" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by tech stack" />
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
