import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileUp, Star } from "lucide-react";

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
          <ArrowLeft className="h-4 w-4" />
          Back to learning flow
        </Link>
        <Badge variant="secondary" className="capitalize">
          {item.type}
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
          <div className="rounded-lg border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
            {item.content ??
              "This item uses mock content. Replace with a player, quiz form, or submission form when wiring to the backend."}
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Mark as completed
              <CheckCircle2 className="h-4 w-4" />
            </button>
            {item.type === "assignment" && (
              <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-secondary">
                <FileUp className="h-4 w-4" />
                Upload mock file
              </button>
            )}
          </div>
          <div className="rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-sm font-semibold">Scoring & feedback</p>
            {item.score ? (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-amber-500" />
                Latest score: {item.score}/100
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Score will appear once graded.
              </p>
            )}
          </div>
          <Progress value={chapter.progress} />
        </CardContent>
      </Card>
    </div>
  );
}
