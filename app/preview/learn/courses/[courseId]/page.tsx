import { notFound, redirect } from "next/navigation";

import { courses } from "@/lib/mock-data";
import { learnLessonHref } from "@/lib/learning-routes";

export default async function PreviewLearnCourseIndex({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  const firstLesson = course.chapters[0]?.lessons[0];
  const firstChapter = course.chapters[0];

  if (!firstLesson || !firstChapter) {
    notFound();
  }

  redirect(
    learnLessonHref("preview", course.id, firstChapter.id, firstLesson.id),
  );
}
