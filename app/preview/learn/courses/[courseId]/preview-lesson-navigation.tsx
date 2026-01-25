"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface OrderedEntry {
  chapterId: string;
  lessonId: string;
}

interface PreviewLessonNavigationProps {
  courseId: string;
  orderedLessons: OrderedEntry[];
  currentIndex: number;
  nextHref: string | null;
}

export function PreviewLessonNavigation({
  courseId,
  orderedLessons,
  currentIndex,
  nextHref,
}: PreviewLessonNavigationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link
        href={`/preview/learn/courses/${courseId}/chapters/${orderedLessons[currentIndex].chapterId}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        Back to chapter
      </Link>
      {nextHref ? (
        <Link className={buttonVariants({ variant: "default" })} href={nextHref}>
          Continue
        </Link>
      ) : (
        <Link className={buttonVariants({ variant: "default" })} href={`/preview/courses/${courseId}`}>
          Back to course
        </Link>
      )}
    </div>
  );
}
