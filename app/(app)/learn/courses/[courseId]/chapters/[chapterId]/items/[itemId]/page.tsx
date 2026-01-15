import { notFound } from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/lib/mock-data";
import { ItemContent } from "@/components/learning/item-content";
import { type LearningItem } from "@/lib/mock-data";

const typeLabel: Record<LearningItem["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

export default async function ItemPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string; itemId: string }>;
}) {
  const { courseId, chapterId, itemId } = await params;
  const course = courses.find((c) => c.id === courseId);
  const chapter = course?.chapters.find((c) => c.id === chapterId);
  const item = chapter?.items.find((i) => i.id === itemId);

  if (!course || !chapter || !item) {
    notFound();
  }

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
          <ItemContent item={item} />
          <Progress value={chapter.progress} />
        </CardContent>
      </Card>
    </div>
  );
}
