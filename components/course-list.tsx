import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Course, type ProgressStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type CourseListItem = Course & {
  progressPct: number;
  progressStatus: ProgressStatus;
};

interface CourseListProps {
  courses: CourseListItem[];
  buttonLabel?: string;
  getHref?: (course: Course) => string;
}

export function CourseList({
  courses,
  buttonLabel = "Open course",
  getHref = (course) => `/courses/${course.id}`,
}: CourseListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const statusLabel =
          course.progressStatus === "completed"
            ? "Completed"
            : course.progressStatus === "in-progress"
              ? "In progress"
              : "Not started";

        return (
          <Card key={course.id} className="overflow-hidden shadow-sm transition hover:shadow-md">
            <CardHeader className="space-y-3 pb-3">
              {course.thumbnail ? (
                <div className="overflow-hidden rounded-lg border bg-muted/50">
                  <Image
                    src={course.thumbnail}
                    alt={`${course.title} thumbnail`}
                    width={640}
                    height={360}
                    className="h-40 w-full object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  No image
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {course.chapters.length} chapters
                <span>·</span>
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{statusLabel}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.summary}</CardDescription>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{course.progressPct}%</span>
                  <span>{statusLabel}</span>
                </div>
                <Progress value={course.progressPct} />
              </div>
              <div className="flex justify-end">
                <Link
                  href={getHref(course)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold hover:bg-secondary",
                  )}
                >
                  <PlayCircle className="h-4 w-4" />
                  {buttonLabel}
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
