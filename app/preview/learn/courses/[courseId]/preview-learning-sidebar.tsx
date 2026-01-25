"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { type Course, type LearningLesson } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Lecture",
  quiz: "Quiz",
  assignment: "Assignment",
};

interface PreviewLearningSidebarProps {
  course: Course;
}

export function PreviewLearningSidebar({ course }: PreviewLearningSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm lg:flex">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Course</p>
          <p className="text-sm font-semibold">{course.title}</p>
        </div>
        <Badge variant="secondary">{course.progress}%</Badge>
      </div>
      <div className="space-y-3">
        {course.chapters.map((chapter, index) => (
          <div key={chapter.id} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {index + 1}. {chapter.title}
              </span>
              <span>{chapter.progress}%</span>
            </div>
            <div className="space-y-1">
              {chapter.lessons.map((lesson) => {
                const href = `/preview/learn/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`;
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
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {lesson.status === "completed" ? (
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
