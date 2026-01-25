"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
import { LessonContent } from "@/components/learning/lesson-content";
import { LessonNavigation } from "@/components/learning/lesson-navigation";
import { learnChapterHref, learnLessonHref } from "@/lib/learning-routes";

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Lecture",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string; lessonId: string }>;
}) {
  const { courseId, chapterId, lessonId } = use(params);
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    notFound();
  }

  const orderedLessons = useMemo(
    () =>
      course.chapters.flatMap((ch) =>
        ch.lessons.map((lesson) => ({ chapterId: ch.id, lesson })),
      ),
    [course],
  );

  const indexLookup = useMemo(
    () =>
      new Map(
        orderedLessons.map((entry, idx) => [
          `${entry.chapterId}:${entry.lesson.id}`,
          idx,
        ]),
      ),
    [orderedLessons],
  );

  const lastCompletedIndex = useMemo(
    () =>
      orderedLessons.reduce(
        (acc, entry, idx) => (entry.lesson.status === "completed" ? idx : acc),
        -1,
      ),
    [orderedLessons],
  );

  const lessonIndex = indexLookup.get(`${chapterId}:${lessonId}`);
  if (lessonIndex === undefined || lessonIndex === -1) {
    notFound();
  }

  const lessonEntry = orderedLessons[lessonIndex];
  const lesson = lessonEntry.lesson;
  const chapter = course.chapters.find((c) => c.id === lessonEntry.chapterId);
  if (!chapter) {
    notFound();
  }

  const nextEntry = orderedLessons[lessonIndex + 1] ?? null;
  const nextHref = nextEntry
    ? learnLessonHref("learn", course.id, nextEntry.chapterId, nextEntry.lesson.id)
    : null;

  const initialReady =
    lesson.status === "completed" ||
    (lesson.type !== "quiz" && lesson.type !== "assignment");
  const [readyForContinue, setReadyForContinue] = useState<boolean>(initialReady);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <Link
          href={learnChapterHref("learn", course.id, chapter.id)}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          ← Back to learning flow
        </Link>
        <Badge variant="secondary" className="capitalize">
          {typeLabel[lesson.type]}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
          <CardDescription>
            {chapter.title} · {lesson.duration}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LessonContent lesson={lesson} onReadyForContinue={setReadyForContinue} />
          <Progress value={chapter.progress} />
          <LessonNavigation
            courseId={course.id}
            orderedLessons={orderedLessons.map((entry) => ({
              chapterId: entry.chapterId,
              lessonId: entry.lesson.id,
            }))}
            currentIndex={lessonIndex}
            initialCompletedIndex={lastCompletedIndex}
            nextHref={nextHref}
            readyForContinue={readyForContinue}
          />
        </CardContent>
      </Card>
    </div>
  );
}
