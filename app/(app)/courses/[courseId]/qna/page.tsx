import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { courses, questions } from "@/lib/mock-data";

export default async function QnaPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to course
        </Link>
        <span>/</span>
        <span>Q&A</span>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle>Q&A board</CardTitle>
            <CardDescription>
              Ask and answer questions for {course.title}.
            </CardDescription>
          </div>
          <Badge variant="secondary">{questions.length} threads</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((question) => (
            <Link
              key={question.id}
              href={`/courses/${course.id}/qna/${question.id}`}
              className="block rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-primary/40 hover:bg-secondary/30"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold">{question.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {question.author} · Updated {question.updatedAt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
