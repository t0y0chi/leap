import { notFound } from "next/navigation";

import { LearningSidebar } from "@/components/learning/sidebar";
import { courses } from "@/lib/mock-data";

export default async function LearnCourseLayout({
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
      <LearningSidebar course={course} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
