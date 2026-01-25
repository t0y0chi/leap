import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses, type LearningLesson } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const { courseId, chapterId } = await params;
  const course = courses.find((c) => c.id === courseId);
  const chapter = course?.chapters.find((c) => c.id === chapterId);

  if (!course || !chapter) {
    notFound();
  }

  const orderedLessons = course.chapters.flatMap((ch) =>
    ch.lessons.map((lesson) => ({ chapterId: ch.id, lesson })),
  );
  const lastCompletedIndex = orderedLessons.reduce(
    (acc, entry, idx) => (entry.lesson.status === "completed" ? idx : acc),
    -1,
  );
  const maxAccessibleIndex = lastCompletedIndex + 1;
  const indexLookup = new Map(
    orderedLessons.map((entry, idx) => [
      `${entry.chapterId}:${entry.lesson.id}`,
      idx,
    ]),
  );
  const continueEntry =
    orderedLessons[Math.min(maxAccessibleIndex, orderedLessons.length - 1)];
  const continueHref = continueEntry
    ? `/learn/courses/${course.id}/chapters/${continueEntry.chapterId}/lessons/${continueEntry.lesson.id}`
    : `/courses/${course.id}`;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to course
        </Link>
        <span>/</span>
        <span>{course.title}</span>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-xl">{chapter.title}</CardTitle>
            <CardDescription>{chapter.description}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{chapter.progress}%</p>
            <Progress value={chapter.progress} className="mt-2 w-40" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <div className="space-y-3">
            {chapter.lessons.map((lesson) => {
              const lessonIndex = indexLookup.get(`${chapter.id}:${lesson.id}`) ?? 0;
              const locked = lessonIndex > maxAccessibleIndex;
              return (
                <div
                  key={lesson.id}
                  className="flex flex-col gap-3 rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {typeLabel[lesson.type]} · {lesson.duration}
                    </p>
                    <p className="text-xs text-muted-foreground">{lesson.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.status === "completed" && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                    <Badge variant="neutral" className="capitalize">
                      {locked ? "Locked" : lesson.status}
                    </Badge>
                    <Link
                      href={
                        locked
                          ? "#"
                          : `/learn/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`
                      }
                      aria-disabled={locked}
                      tabIndex={locked ? -1 : 0}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold hover:bg-secondary",
                        locked && "pointer-events-none opacity-50 hover:bg-transparent",
                      )}
                    >
                      <PlayCircle className="h-4 w-4" />
                      {locked ? "Locked" : "Open"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-3 rounded-lg border bg-secondary/50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Chapter stats</p>
              <Badge variant="secondary">{chapter.lessons.length} lessons</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Estimated time:{" "}
              {chapter.lessons.reduce(
                (acc, lesson) => acc + parseInt(lesson.duration),
                0,
              )}{" "}
              minutes
            </div>
            <p className="text-muted-foreground">
              Complete the lessons in order to unlock the next chapter. Feedback on assignments arrives within 24 hours.
            </p>
            <Link
              href={continueHref}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full justify-center",
              )}
            >
              Continue chapter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
