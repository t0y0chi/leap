import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronRight, PauseCircle } from "lucide-react";

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

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Lecture",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default async function LearnChapterPage({
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

  const activeLesson =
    chapter.lessons.find((lesson) => lesson.status !== "completed") ??
    chapter.lessons[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <Link
          href={`/courses/${course.id}/chapters/${chapter.id}`}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chapter outline
        </Link>
        <Badge variant="secondary">{chapter.progress}% complete</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle>{chapter.title}</CardTitle>
            <CardDescription>{chapter.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-secondary/70 px-4 py-3">
              <p className="text-sm font-semibold">Current lesson</p>
              <p className="text-sm text-muted-foreground">{activeLesson.title}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="neutral" className="capitalize">
                  {typeLabel[activeLesson.type]}
                </Badge>
                <span>·</span>
                <span>{activeLesson.duration}</span>
              </div>
            </div>
            <div className="space-y-2 rounded-md border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-semibold">Lesson content</p>
              <p className="text-sm text-muted-foreground">
                {activeLesson.content ??
                  "Use this space to read the lesson or review the assignment instructions."}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <PauseCircle className="h-4 w-4" />
                Progress autosaves as you move between lessons.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/learn/courses/${course.id}/chapters/${chapter.id}/lessons/${activeLesson.id}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Open lesson
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/courses/${course.id}/qna`}
                className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Ask a question
              </Link>
            </div>
            <div className="space-y-2 rounded-md border px-4 py-3">
              <p className="text-sm font-semibold">Chapter checkpoints</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Hit 2px accuracy on bounding boxes</p>
                <p>• Include comments for uncertain cases</p>
                <p>• Submit at least 5 annotated samples</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
          <CardTitle>Lessons</CardTitle>
          <CardDescription>Stay in sequence for best results.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {chapter.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between rounded-lg border px-3 py-2"
            >
              <div>
                <p className="text-sm font-semibold">{lesson.title}</p>
                <p className="text-xs text-muted-foreground">
                  {typeLabel[lesson.type]} · {lesson.duration}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {lesson.status === "completed" && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                )}
                <Badge variant="neutral" className="capitalize">
                  {lesson.status === "completed"
                    ? "Completed"
                    : (indexLookup.get(`${chapter.id}:${lesson.id}`) ?? 0) >
                        maxAccessibleIndex
                      ? "Locked"
                      : lesson.status}
                </Badge>
              </div>
            </div>
          ))}
            <Progress value={chapter.progress} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
