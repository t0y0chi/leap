import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { courses, questions, type LearningLesson } from "@/lib/mock-data";

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Lecture",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    notFound();
  }

  const completedChapters = course.chapters.filter((c) => c.progress === 100).length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-[1px]">
        <div className="rounded-[11px] bg-slate-950/60 p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-slate-300">Course</p>
              <h1 className="text-3xl font-semibold">{course.title}</h1>
              <p className="max-w-2xl text-sm text-slate-200">{course.summary}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-200">Progress</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="[&_div]:bg-white" />
              <div className="flex items-center gap-2 text-slate-300">
                <BookOpen className="h-4 w-4" />
                {course.chapters.length} chapters · {course.duration}
              </div>
              {course.chapters[0]?.lessons[0] && (
                <Link
                  href={`/learn/courses/${course.id}`}
                  className="mt-1 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Resume course
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Chapters</CardTitle>
            <CardDescription>
              {completedChapters} / {course.chapters.length} completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {course.chapters.map((chapter) => {
              const nextLesson =
                chapter.lessons.find((lesson) => lesson.status !== "completed") ??
                chapter.lessons[0];
              return (
                <div
                  key={chapter.id}
                  className="rounded-lg border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold">{chapter.title}</p>
                      <p className="text-xs text-muted-foreground">{chapter.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={chapter.progress === 100 ? "success" : "secondary"}>
                        {chapter.progress === 100 ? "Completed" : "In progress"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {chapter.lessons.length} lessons
                      </span>
                    </div>
                  </div>
                <div className="mt-3 space-y-3">
                  <Progress value={chapter.progress} />
                  <div className="grid gap-2 md:grid-cols-2">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between rounded-md border bg-muted/60 px-3 py-2 text-sm"
                      >
                        <div>
                          <p className="font-semibold">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {typeLabel[lesson.type]} · {lesson.duration}
                          </p>
                        </div>
                        <Badge variant="neutral" className="capitalize">
                          {typeLabel[lesson.type]}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Q&A board</CardTitle>
                <CardDescription>Recent questions across the course</CardDescription>
              </div>
              <Link
                href={`/courses/${course.id}/qna`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions.map((question) => (
              <Link
                key={question.id}
                href={`/courses/${course.id}/qna`}
                className="flex flex-col gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">{question.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {question.author} · Updated {question.updatedAt}
                  </p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
