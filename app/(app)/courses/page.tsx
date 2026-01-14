import Link from "next/link";
import { BookOpenCheck, Layers, Target } from "lucide-react";

import { CourseTable } from "@/components/course-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/mock-data";

export default function CoursesPage() {
  const course = courses[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-muted-foreground">All learner tracks available to you.</p>
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <BookOpenCheck className="h-4 w-4" />
          Go to course
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Annotation track</CardTitle>
          <CardDescription>Foundational course to become a confident annotator.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="rounded-lg border bg-white p-4">
            <CourseTable data={courses} />
          </div>
          <div className="space-y-3 rounded-lg border bg-secondary/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Annotation Fundamentals</p>
                <p className="text-xs text-muted-foreground">1 course · 3 chapters</p>
              </div>
              <Badge variant="neutral">Beginner</Badge>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Quality-first rubric and walkthroughs
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Mix of lectures, quizzes, and hands-on assignments
              </div>
            </div>
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex w-full items-center justify-center rounded-md border bg-white px-3 py-2 text-sm font-semibold hover:bg-muted"
            >
              View syllabus
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
