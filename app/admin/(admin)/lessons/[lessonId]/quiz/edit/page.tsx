import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Timer } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminLesson } from "@/lib/admin-data";

export default async function AdminQuizEditPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getAdminLesson(lessonId);
  if (!lesson || lesson.type !== "quiz") return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Edit quiz</h1>
          <p className="text-sm text-muted-foreground">
            Configure scoring, attempts, and rubric-aligned answers.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/admin/chapters/${lesson.chapterId}/lessons`}>Back to lessons</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="neutral">Quiz</Badge>
            <Badge variant="outline" className="capitalize">
              {lesson.status}
            </Badge>
          </div>
          <CardDescription>{lesson.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={lesson.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Estimated duration</Label>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <Input id="duration" name="duration" defaultValue={lesson.duration} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passingScore">Passing score</Label>
              <Input
                id="passingScore"
                name="passingScore"
                type="number"
                defaultValue={lesson.passingScore ?? 80}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attempts">Max attempts</Label>
              <Input
                id="attempts"
                name="attempts"
                type="number"
                defaultValue={lesson.attempts ?? 1}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Question prompt</Label>
            <Textarea
              id="question"
              name="question"
              rows={4}
              placeholder="What is your occlusion threshold and when do you escalate?"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Answer choices</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border bg-secondary p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Choice A</p>
                  <Badge variant="success">Correct</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mark occlusion when any portion of the subject is hidden and note why.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-3">
                <p className="text-sm font-semibold text-foreground">Choice B</p>
                <p className="text-sm text-muted-foreground">Only mark occlusion over 60%.</p>
              </div>
              <div className="rounded-lg border bg-white p-3">
                <p className="text-sm font-semibold text-foreground">Choice C</p>
                <p className="text-sm text-muted-foreground">Skip unclear frames entirely.</p>
              </div>
              <div className="rounded-lg border bg-white p-3">
                <p className="text-sm font-semibold text-foreground">Choice D</p>
                <p className="text-sm text-muted-foreground">
                  Add a note and proceed without marking occlusion.
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              + Add choice
            </Button>
          </div>

          <div className="flex gap-2">
            <Button>Save</Button>
            <Button variant="outline">Preview</Button>
          </div>
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Require at least one rubric reference in correct answers.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
