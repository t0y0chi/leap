import { redirect } from "next/navigation";

import { courses } from "@/lib/mock-data";

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
      chapter.items.map((item) => ({ chapter, item })),
    )
    .find(({ item }) => item.status !== "completed");

  const fallback = course.chapters[0]?.items[0];

  const targetChapter = firstPending?.chapter ?? course.chapters[0];
  const targetItem = firstPending?.item ?? fallback;

  if (!targetChapter || !targetItem) {
    redirect("/courses");
  }

  redirect(
    `/learn/courses/${course.id}/chapters/${targetChapter.id}/items/${targetItem.id}`,
  );
}
