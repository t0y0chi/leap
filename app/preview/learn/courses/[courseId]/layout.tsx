import { notFound } from "next/navigation";

import { courses } from "@/lib/mock-data";
import { LearningSidebar } from "@/components/learning/sidebar";

export default async function PreviewLearnCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <LearningSidebar course={course} mode="preview" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
