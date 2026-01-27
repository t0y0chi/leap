import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminChapters, getAdminCourse } from "@/lib/staff-data";
import CourseDetailClient from "./course-detail-client";

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getAdminCourse(courseId);
  const chapters = getAdminChapters(courseId);
  if (!course) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Course</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/staff/courses">Back</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/staff/courses/${course.id}/edit`}>Edit course</Link>
          </Button>
          <Button asChild>
            <Link href={`/preview/courses/${course.id}`} target="_blank" rel="noreferrer">
              Preview
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{course.title}</CardTitle>
            <Badge
              variant={
                course.publicationStatus === "published"
                  ? "success"
                  : "outline"
              }
              className="capitalize"
            >
              {course.publicationStatus}
            </Badge>
          </div>
          <CardDescription>{course.summary}</CardDescription>
        </CardHeader>
      </Card>

      <CourseDetailClient courseId={course.id} initialChapters={chapters} />
    </div>
  );
}
