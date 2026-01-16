import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Users } from "lucide-react";

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
import { adminCourses } from "@/lib/admin-data";

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-muted-foreground">
            Manage availability, owners, and grading health per course.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">Create course</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>Course list</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Publishing requires at least one graded item per chapter.
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Track</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{course.title}</div>
                    <p className="text-xs text-muted-foreground">{course.summary}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{course.track}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
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
                      <Badge variant="outline" className="capitalize">
                        {course.visibility}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrollments}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {course.pendingSubmissions}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {course.updatedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/chapters`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        Chapters
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
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
