"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type SubmissionRow = {
  id: string;
  lessonTitle: string;
  courseTitle: string;
  submittedAt: string;
  score?: number;
};

type QuizRow = {
  id: string;
  title: string;
  chapterTitle: string;
  score: number;
  maxScore: number;
};

type ActivityTabsClientProps = {
  submissions: SubmissionRow[];
  quizzes: QuizRow[];
};

const tabButtonClass = (active: boolean) =>
  cn(
    "rounded-full border px-3 py-1 text-xs font-semibold transition",
    active
      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
      : "border-transparent bg-secondary text-muted-foreground hover:text-foreground"
  );

export default function ActivityTabsClient({ submissions, quizzes }: ActivityTabsClientProps) {
  const [activeTab, setActiveTab] = useState<"submissions" | "quizzes">("submissions");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={tabButtonClass(activeTab === "submissions")}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
        <button
          type="button"
          className={tabButtonClass(activeTab === "quizzes")}
          onClick={() => setActiveTab("quizzes")}
        >
          Quizzes
        </button>
      </div>

      {activeTab === "submissions" ? (
        submissions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lesson</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-semibold text-foreground">
                    {submission.lessonTitle}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.courseTitle}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.submittedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">
                      {submission.score !== undefined
                        ? `${submission.score}/100`
                        : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            No submissions yet.
          </div>
        )
      ) : quizzes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="font-semibold text-foreground">{quiz.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {quiz.chapterTitle}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{`${quiz.score}/${quiz.maxScore}`}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
          No quizzes yet.
        </div>
      )}
    </div>
  );
}
