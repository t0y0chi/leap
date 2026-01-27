import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, questions } from "@/lib/mock-data";
import { RepliesClient } from "./replies-client";

const repliesByQuestion = {
  "q-1": [
    {
      id: "a-1",
      author: "Samira Patel",
      body:
        "Occluded means part of the object is hidden by another object, but you can still infer its full shape. Truncated is when the object goes outside the image frame. If both apply, mark occluded and note the truncation in attributes.",
    },
    {
      id: "a-2",
      author: "Marco Li",
      body:
        "A quick check: if the missing pixels are due to frame boundaries, it is truncation; if due to overlap, it is occlusion.",
    },
  ],
  "q-2": [
    {
      id: "a-3",
      author: "Ava Williams",
      body:
        "Create a hotkey set for polygon refine/close, and reuse vertex patterns across similar frames. I also keep a 200% zoom toggle to avoid over-zooming.",
    },
  ],
  "q-3": [
    {
      id: "a-4",
      author: "Diego Alvarez",
      body:
        "It is strict on final assignments, but in practice reviewers focus on boundary consistency. I aim for 1-2px and use the brush edge overlay to verify.",
    },
  ],
} satisfies Record<
  string,
  {
    id: string;
    author: string;
    body: string;
  }[]
>;

export default async function QnaDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; questionId: string }>;
}) {
  const { courseId, questionId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    notFound();
  }

  const question = questions.find((q) => q.id === questionId);
  if (!question) {
    notFound();
  }

  const replies = repliesByQuestion[question.id] ?? [];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href={`/courses/${course.id}/qna`}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Q&A
        </Link>
        <span>/</span>
        <span>Thread</span>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Q&A Thread
                </span>
              </div>
              <CardTitle className="text-xl">{question.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {question.author} · Updated {question.updatedAt}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-foreground">
            <p className="font-semibold">Question context</p>
            <p className="mt-2 text-muted-foreground">
              Reviewers mentioned occlusion and truncation in the guidelines. I want to make
              sure I use the right attribute when objects overlap or touch the frame edge.
            </p>
          </div>

          <RepliesClient initialReplies={replies} />
        </CardContent>
      </Card>
    </div>
  );
}
