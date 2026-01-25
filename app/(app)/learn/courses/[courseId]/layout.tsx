import { notFound } from "next/navigation";

import { LearningSidebar } from "@/components/learning/sidebar";
import { courses, enrollments, learnerProfile, lessonProgressByUser } from "@/lib/mock-data";

export default async function LearnCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  const enrollment = enrollments.find(
    (item) => item.userId === learnerProfile.id && item.courseId === courseId,
  );
  const progressPct = enrollment?.progressPct ?? 0;
  const progressByLessonId = lessonProgressByUser[learnerProfile.id] ?? {};

  if (!course) {
    notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <LearningSidebar
        course={course}
        progressPct={progressPct}
        progressByLessonId={progressByLessonId}
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
