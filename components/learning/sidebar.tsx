"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { type Course, type LearningItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeLabel: Record<LearningItem["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

interface LearningSidebarProps {
  course: Course;
}

export function LearningSidebar({ course }: LearningSidebarProps) {
  const pathname = usePathname();
  const currentMatch = pathname.match(
    /learn\/courses\/[^/]+\/chapters\/([^/]+)\/items\/([^/]+)/,
  );
  const orderedItems = course.chapters.flatMap((chapter) =>
    chapter.items.map((item) => ({ chapterId: chapter.id, item })),
  );
  const lastCompletedIndex = orderedItems.reduce(
    (acc, entry, idx) => (entry.item.status === "completed" ? idx : acc),
    -1,
  );
  const indexLookup = new Map(
    orderedItems.map((entry, idx) => [`${entry.chapterId}:${entry.item.id}`, idx]),
  );
  const currentIndex =
    currentMatch && indexLookup.get(`${currentMatch[1]}:${currentMatch[2]}`);
  const effectiveCompletedIndex = Math.max(
    lastCompletedIndex,
    currentIndex ?? -1,
  );
  const maxAccessibleIndex = effectiveCompletedIndex + 1;

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
              {chapter.items.map((item) => {
                const href = `/learn/courses/${course.id}/chapters/${chapter.id}/items/${item.id}`;
                const itemIndex = indexLookup.get(`${chapter.id}:${item.id}`) ?? 0;
                const locked = itemIndex > maxAccessibleIndex;
                const completed = itemIndex <= effectiveCompletedIndex;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.id}
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
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[11px] uppercase">
                      {typeLabel[item.type]}
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
