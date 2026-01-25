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
import { getAdminLesson } from "@/lib/admin-data";
import QuizEditClient from "./quiz-edit-client";

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
            Configure questions, choices, and correct answers.
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
          </div>
          <QuizEditClient />

          <div className="flex gap-2">
            <Button>Save</Button>
            <Button asChild variant="outline">
              <Link href={`/admin/lessons/${lesson.id}/preview`}>Preview</Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Select one correct answer per question before saving.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
