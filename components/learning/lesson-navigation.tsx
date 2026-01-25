"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderedEntry {
  chapterId: string;
  lessonId: string;
}

interface LessonNavigationProps {
  courseId: string;
  orderedLessons: OrderedEntry[];
  currentIndex: number;
  initialCompletedIndex: number;
  nextHref: string | null;
  readyForContinue: boolean;
}

export function LessonNavigation({
  courseId,
  orderedLessons,
  currentIndex,
  initialCompletedIndex,
  nextHref,
  readyForContinue,
}: LessonNavigationProps) {
  const router = useRouter();
  const [storedCompletedIndex, setStoredCompletedIndex] = useState<number>(() => {
    if (typeof window === "undefined") return initialCompletedIndex;
    const saved = window.localStorage.getItem(`leap-progress-${courseId}`);
    const parsed = saved ? parseInt(saved, 10) : NaN;
    if (Number.isNaN(parsed)) return initialCompletedIndex;
    return Math.max(parsed, initialCompletedIndex);
  });

  const effectiveCompletedIndex = useMemo(
    () => Math.max(storedCompletedIndex, initialCompletedIndex),
    [storedCompletedIndex, initialCompletedIndex],
  );

  const maxAccessibleIndex = effectiveCompletedIndex + 1;
  const locked = currentIndex > maxAccessibleIndex;
  const canContinue =
    Boolean(nextHref) && currentIndex <= maxAccessibleIndex && readyForContinue;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Prevent skipping ahead; if locked, push back to last accessible.
    if (locked) {
      const targetIndex = Math.min(maxAccessibleIndex, orderedLessons.length - 1);
      const target = orderedLessons[targetIndex];
      router.replace(
        `/learn/courses/${courseId}/chapters/${target.chapterId}/lessons/${target.lessonId}`,
      );
      return;
    }
  }, [
    locked,
    maxAccessibleIndex,
    orderedLessons,
    courseId,
    router,
    currentIndex,
  ]);

  const handleContinue = () => {
    if (!nextHref || !readyForContinue) return;
    const newProgress = Math.max(storedCompletedIndex, currentIndex);
    window.localStorage.setItem(`leap-progress-${courseId}`, String(newProgress));
    setStoredCompletedIndex(newProgress);
    router.push(nextHref);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link
        href={`/learn/courses/${courseId}/chapters/${orderedLessons[currentIndex].chapterId}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        Back to chapter
      </Link>
      {nextHref ? (
        <button
          type="button"
          disabled={!canContinue}
          onClick={handleContinue}
          className={cn(
            buttonVariants({ variant: "default" }),
            !canContinue && "pointer-events-none opacity-50",
          )}
        >
          Continue
        </button>
      ) : (
        <Link className={buttonVariants({ variant: "default" })} href={`/courses/${courseId}`}>
          Back to course
        </Link>
      )}
    </div>
  );
}
