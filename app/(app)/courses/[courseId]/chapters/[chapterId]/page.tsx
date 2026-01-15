import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses, type LearningItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const typeLabel: Record<LearningItem["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const { courseId, chapterId } = await params;
  const course = courses.find((c) => c.id === courseId);
  const chapter = course?.chapters.find((c) => c.id === chapterId);

  if (!course || !chapter) {
    notFound();
  }

  const orderedItems = course.chapters.flatMap((ch) =>
    ch.items.map((item) => ({ chapterId: ch.id, item })),
  );
  const lastCompletedIndex = orderedItems.reduce(
    (acc, entry, idx) => (entry.item.status === "completed" ? idx : acc),
    -1,
  );
  const maxAccessibleIndex = lastCompletedIndex + 1;
  const indexLookup = new Map(
    orderedItems.map((entry, idx) => [`${entry.chapterId}:${entry.item.id}`, idx]),
  );
  const continueEntry =
    orderedItems[Math.min(maxAccessibleIndex, orderedItems.length - 1)];
  const continueHref = continueEntry
    ? `/learn/courses/${course.id}/chapters/${continueEntry.chapterId}/items/${continueEntry.item.id}`
    : `/courses/${course.id}`;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to course
        </Link>
        <span>/</span>
        <span>{course.title}</span>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-xl">{chapter.title}</CardTitle>
            <CardDescription>{chapter.description}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{chapter.progress}%</p>
            <Progress value={chapter.progress} className="mt-2 w-40" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <div className="space-y-3">
            {chapter.items.map((item) => {
              const itemIndex = indexLookup.get(`${chapter.id}:${item.id}`) ?? 0;
              const locked = itemIndex > maxAccessibleIndex;
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {typeLabel[item.type]} · {item.duration}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === "completed" && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                    <Badge variant="neutral" className="capitalize">
                      {locked ? "Locked" : item.status}
                    </Badge>
                    <Link
                      href={locked ? "#" : `/learn/courses/${course.id}/chapters/${chapter.id}/items/${item.id}`}
                      aria-disabled={locked}
                      tabIndex={locked ? -1 : 0}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold hover:bg-secondary",
                        locked && "pointer-events-none opacity-50 hover:bg-transparent",
                      )}
                    >
                      <PlayCircle className="h-4 w-4" />
                      {locked ? "Locked" : "Open"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-3 rounded-lg border bg-secondary/50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Chapter stats</p>
              <Badge variant="secondary">{chapter.items.length} items</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Estimated time: {chapter.items.reduce((acc, item) => acc + parseInt(item.duration), 0)} minutes
            </div>
            <p className="text-muted-foreground">
              Complete the items in order to unlock the next chapter. Feedback on assignments arrives within 24 hours.
            </p>
            <Link
              href={continueHref}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full justify-center",
              )}
            >
              Continue chapter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
