"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { type Course, type LearningLesson, type LessonProgressStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { type LearningMode, learnLessonHref } from "@/lib/learning-routes";
import { isLessonLocked } from "@/lib/learning-policy";
import { getChapterProgress, getCourseProgress, getLessonProgressStatus } from "@/lib/learning-progress";

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Lecture",
  quiz: "Quiz",
  assignment: "Assignment",
};

interface LearningSidebarProps {
  course: Course;
  mode?: LearningMode;
  progressPct?: number;
  progressByLessonId?: Record<string, LessonProgressStatus>;
}

export function LearningSidebar({
  course,
  mode = "learn",
  progressPct,
  progressByLessonId = {},
}: LearningSidebarProps) {
  const pathname = usePathname();
  const courseProgress = progressPct ?? getCourseProgress(course, progressByLessonId);
  const currentMatch = pathname.match(
    /(?:preview\/)?learn\/courses\/[^/]+\/chapters\/([^/]+)\/lessons\/([^/]+)/,
  );
  const orderedLessons = course.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapterId: chapter.id, lesson })),
  );
  const lastCompletedIndex = orderedLessons.reduce(
    (acc, entry, idx) =>
      getLessonProgressStatus(entry.lesson.id, progressByLessonId) === "completed" ? idx : acc,
    -1,
  );
  const indexLookup = new Map(
    orderedLessons.map((entry, idx) => [
      `${entry.chapterId}:${entry.lesson.id}`,
      idx,
    ]),
  );
  const currentIndex =
    currentMatch && indexLookup.get(`${currentMatch[1]}:${currentMatch[2]}`);
  const effectiveCompletedIndex = Math.max(
    lastCompletedIndex,
    currentIndex ?? -1,
  );
  return (
    <aside className="hidden flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm lg:flex">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Course</p>
          <p className="text-sm font-semibold">{course.title}</p>
        </div>
        <Badge variant="secondary">{courseProgress}%</Badge>
      </div>
      <div className="space-y-3">
        {course.chapters.map((chapter, index) => (
          <div key={chapter.id} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {index + 1}. {chapter.title}
              </span>
              <span>{getChapterProgress(chapter, progressByLessonId)}%</span>
            </div>
            <div className="space-y-1">
              {chapter.lessons.map((lesson) => {
                const lessonProgress = getLessonProgressStatus(lesson.id, progressByLessonId);
                const href = learnLessonHref(mode, course.id, chapter.id, lesson.id);
                const lessonIndex =
                  indexLookup.get(`${chapter.id}:${lesson.id}`) ?? 0;
                const locked = isLessonLocked(mode, lessonIndex, effectiveCompletedIndex);
                const completed = lessonProgress === "completed" || lessonIndex <= effectiveCompletedIndex;
                const isActive = pathname === href;
                return (
                  <Link
                    key={lesson.id}
                    href={href}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-secondary text-muted-foreground",
                      locked && "pointer-events-none opacity-50 hover:bg-transparent",
                    )}
                    aria-disabled={locked}
                    tabIndex={locked ? -1 : 0}
                  >
                    <div className="flex items-center gap-2">
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-primary" />
                      )}
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-[11px] uppercase">
                      {typeLabel[lesson.type]}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
