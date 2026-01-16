import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpDown, GripVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminChapters, getAdminCourse } from "@/lib/admin-data";

export default async function AdminChaptersPage({
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
          <h1 className="text-2xl font-semibold">Chapters</h1>
          <p className="text-sm text-muted-foreground">
            Arrange chapters and confirm publish readiness for {course.title}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/admin/courses/${course.id}/edit`}>Back to course</Link>
          </Button>
          <Button variant="outline">Add chapter</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>{course.title}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowUpDown className="h-4 w-4" />
            Drag to reorder — sequential chapters block progression when unpublished.
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Chapter</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Gating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell className="text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">
                      {chapter.order}. {chapter.title}
                    </div>
                    <p className="text-xs text-muted-foreground">{chapter.description}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{chapter.items}</TableCell>
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
                      <Link href={`/admin/chapters/${chapter.id}/items`}>Manage items</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
