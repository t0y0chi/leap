import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "@/lib/mock-data";

export default function AdminQnaPage() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Q&A</CardTitle>
              <CardDescription>Monitor and reply to learner questions.</CardDescription>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              {questions.length} threads
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((question) => (
            <Link
              key={question.id}
              href={`/admin/qna/${question.id}`}
              className="block rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-primary/40 hover:bg-secondary/30"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">{question.title}</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {question.author} · Updated {question.updatedAt}
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
