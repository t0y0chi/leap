import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminChapters, getAdminCourse } from "@/lib/admin-data";

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
            <Link href="/admin/courses">Back</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/admin/courses/${course.id}/edit`}>Edit course</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{course.title}</CardTitle>
            <Badge
              variant={
                course.status === "published"
                  ? "success"
                  : course.status === "maintenance"
                    ? "secondary"
                    : "outline"
              }
              className="capitalize"
            >
              {course.status}
            </Badge>
          </div>
          <CardDescription>{course.summary}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle>Chapters</CardTitle>
          <Button variant="outline">Add chapter</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chapter</TableHead>
                <TableHead>Lessons</TableHead>
                <TableHead>Gating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">
                      {chapter.order}. {chapter.title}
                    </div>
                    <p className="text-xs text-muted-foreground">{chapter.description}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{chapter.lessons}</TableCell>
                  <TableCell className="text-sm capitalize text-muted-foreground">
                    {chapter.gating}
                  </TableCell>
                  <TableCell>
                    <Badge variant={chapter.published ? "success" : "warning"}>
                      {chapter.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/chapters/${chapter.id}/lessons`}>Manage lessons</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {chapters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center text-sm text-muted-foreground">
                    No chapters yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
