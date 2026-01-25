import { redirect } from "next/navigation";

import { courses } from "@/lib/mock-data";
import { learnLessonHref } from "@/lib/learning-routes";

export default async function LearnCourseIndex({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    redirect("/courses");
  }

  const firstPending = course.chapters
    .flatMap((chapter) =>
      chapter.lessons.map((lesson) => ({ chapter, lesson })),
    )
    .find(({ lesson }) => lesson.status !== "completed");

  const fallback = course.chapters[0]?.lessons[0];

  const targetChapter = firstPending?.chapter ?? course.chapters[0];
  const targetLesson = firstPending?.lesson ?? fallback;

  if (!targetChapter || !targetLesson) {
    redirect("/courses");
  }

  redirect(
    learnLessonHref("learn", course.id, targetChapter.id, targetLesson.id),
  );
}
