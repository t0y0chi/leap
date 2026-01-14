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
import { courses } from "@/lib/mock-data";

export default function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const course = courses.find((c) => c.id === params.courseId);
  const chapter = course?.chapters.find((c) => c.id === params.chapterId);

  if (!course || !chapter) {
    notFound();
  }

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
            {chapter.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.type.toUpperCase()} · {item.duration}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <Badge variant="neutral" className="capitalize">
                    {item.status}
                  </Badge>
                  <Link
                    href={`/learn/courses/${course.id}/chapters/${chapter.id}/items/${item.id}`}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Open
                  </Link>
                </div>
              </div>
            ))}
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
              href={`/learn/courses/${course.id}/chapters/${chapter.id}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Continue chapter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
