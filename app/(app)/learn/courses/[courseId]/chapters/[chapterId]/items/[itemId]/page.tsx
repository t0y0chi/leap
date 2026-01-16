"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
import { ItemContent } from "@/components/learning/item-content";
import { ItemNavigation } from "@/components/learning/item-navigation";

const typeLabel: Record<LearningItem["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default function ItemPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string; itemId: string }>;
}) {
  const { courseId, chapterId, itemId } = use(params);
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    notFound();
  }

  const orderedItems = useMemo(
    () =>
      course.chapters.flatMap((ch) =>
        ch.items.map((item) => ({ chapterId: ch.id, item })),
      ),
    [course],
  );

  const indexLookup = useMemo(
    () =>
      new Map(
        orderedItems.map((entry, idx) => [`${entry.chapterId}:${entry.item.id}`, idx]),
      ),
    [orderedItems],
  );

  const lastCompletedIndex = useMemo(
    () =>
      orderedItems.reduce(
        (acc, entry, idx) => (entry.item.status === "completed" ? idx : acc),
        -1,
      ),
    [orderedItems],
  );

  const itemIndex = indexLookup.get(`${chapterId}:${itemId}`);
  if (itemIndex === undefined || itemIndex === -1) {
    notFound();
  }

  const itemEntry = orderedItems[itemIndex];
  const item = itemEntry.item;
  const chapter = course.chapters.find((c) => c.id === itemEntry.chapterId);
  if (!chapter) {
    notFound();
  }

  const nextEntry = orderedItems[itemIndex + 1] ?? null;
  const nextHref = nextEntry
    ? `/learn/courses/${course.id}/chapters/${nextEntry.chapterId}/items/${nextEntry.item.id}`
    : null;

  const initialReady =
    item.status === "completed" ||
    (item.type !== "quiz" && item.type !== "assignment");
  const [readyForContinue, setReadyForContinue] = useState<boolean>(initialReady);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <Link
          href={`/learn/courses/${course.id}/chapters/${chapter.id}`}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          ← Back to learning flow
        </Link>
        <Badge variant="secondary" className="capitalize">
          {typeLabel[item.type]}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>
            {chapter.title} · {item.duration}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ItemContent item={item} onReadyForContinue={setReadyForContinue} />
          <Progress value={chapter.progress} />
          <ItemNavigation
            courseId={course.id}
            orderedItems={orderedItems.map((entry) => ({
              chapterId: entry.chapterId,
              itemId: entry.item.id,
            }))}
            currentIndex={itemIndex}
            initialCompletedIndex={lastCompletedIndex}
            nextHref={nextHref}
            readyForContinue={readyForContinue}
          />
        </CardContent>
      </Card>
    </div>
  );
}
