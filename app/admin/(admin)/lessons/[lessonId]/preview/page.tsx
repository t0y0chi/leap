import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  ListChecks,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminLesson } from "@/lib/admin-data";

function getEditHref(type: "lecture" | "quiz" | "assignment", lessonId: string) {
  if (type === "lecture") return `/admin/lessons/${lessonId}/lecture/edit`;
  if (type === "quiz") return `/admin/lessons/${lessonId}/quiz/edit`;
  return `/admin/lessons/${lessonId}/assignment/edit`;
}

export default async function AdminLessonPreviewPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getAdminLesson(lessonId);
  if (!lesson) return notFound();

  const editHref = getEditHref(lesson.type, lesson.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Lesson preview</h1>
          <p className="text-sm text-muted-foreground">
            Preview the learner-facing flow before publishing.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/admin/chapters/${lesson.chapterId}/lessons`}>Back to lessons</Link>
          </Button>
          <Button asChild>
            <Link href={editHref}>Edit lesson</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="neutral" className="capitalize">
              {lesson.type}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {lesson.status}
            </Badge>
          </div>
          <CardDescription>{lesson.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Duration: {lesson.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span>{lesson.required ? "Required to progress" : "Optional"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{lesson.graded ? "Graded" : "Ungraded"}</span>
            </div>
          </div>

          {lesson.type === "lecture" && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-secondary p-4">
                <p className="text-sm font-semibold text-foreground">Lecture overview</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  This preview shows the lecture shell, pacing, and notes layout. Rich lecture
                  notes will appear here once saved.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Lecture notes</p>
                <div className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  Draft notes, key moments, and rubric references.
                </div>
              </div>
            </div>
          )}

          {lesson.type === "quiz" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Question prompt</p>
                <div className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  What is your occlusion threshold and when do you escalate?
                </div>
              </div>
              <div className="space-y-2">
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
                    <p className="text-sm text-muted-foreground">
                      Only mark occlusion over 60%.
                    </p>
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
              </div>
            </div>
          )}

          {lesson.type === "assignment" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Submission instructions</p>
                <div className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  Call out occlusion handling, notes required, and file naming.
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Required attachments</p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <FileText className="h-4 w-4" />
                    png
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <ClipboardList className="h-4 w-4" />
                    pdf
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Rubric criteria</p>
                <div className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  Tight boxes, attribute coverage, notes for edge cases, and SLA expectations.
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
