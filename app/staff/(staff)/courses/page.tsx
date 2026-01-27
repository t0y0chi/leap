import Link from "next/link";
import { Users } from "lucide-react";

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
import { adminCourses } from "@/lib/staff-data";

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
          <Link href="/staff/courses/new">Create course</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>Course list</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="p-0">
                    <Link href={`/staff/courses/${course.id}`} className="block px-4 py-3">
                      <div className="font-semibold text-foreground">{course.title}</div>
                    </Link>
                  </TableCell>
                  <TableCell className="p-0">
                    <Link href={`/staff/courses/${course.id}`} className="block px-4 py-3">
                      <div className="flex items-center gap-2">
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
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-sm text-muted-foreground">
                    <Link href={`/staff/courses/${course.id}`} className="block px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.enrollments}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-sm text-muted-foreground">
                    <Link href={`/staff/courses/${course.id}`} className="block px-4 py-3">
                      {course.updatedAt}
                    </Link>
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
