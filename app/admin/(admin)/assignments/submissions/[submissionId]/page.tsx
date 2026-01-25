import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Paperclip } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminSubmission } from "@/lib/admin-data";

export default async function AdminSubmissionDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const submission = getAdminSubmission(submissionId);
  if (!submission) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Submission detail</h1>
          <p className="text-sm text-muted-foreground">
            Review files, notes, and history before grading.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/assignments/submissions">Back</Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/assignments/submissions/${submission.id}/grade`}>Grade</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
          <CardTitle>{submission.lessonTitle}</CardTitle>
            <CardDescription>
              {submission.chapterTitle} · {submission.courseTitle}
            </CardDescription>
          </div>
          <Badge
            variant={
              submission.status === "graded"
                ? "success"
                : submission.status === "pending"
                  ? "warning"
                  : "secondary"
            }
          >
            {submission.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Learner</p>
              <p className="text-sm font-semibold text-foreground">{submission.userName}</p>
            </div>
            <div className="rounded-lg border bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Submitted</p>
              <p className="text-sm font-semibold text-foreground">{submission.submittedAt}</p>
            </div>
            <div className="rounded-lg border bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Score</p>
              <p className="text-sm font-semibold text-foreground">
                {submission.score ?? "Pending"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Attachments</p>
            <div className="flex flex-wrap gap-2">
              {submission.attachments.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm"
                >
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </div>

          {submission.comments && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Learner notes</p>
              <div className="rounded-lg border bg-white p-3 text-sm text-foreground">
                {submission.comments}
              </div>
            </div>
          )}

          {submission.reviewer && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Reviewer feedback</p>
              <div className="rounded-lg border bg-white p-3 text-sm text-foreground">
                <p className="font-semibold">{submission.reviewer}</p>
                <p className="text-muted-foreground">{submission.comments}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/assignments/submissions/${submission.id}/history`}>
                View history
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/users/${submission.userId}`}>Open learner profile</Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Reminder: include rubric reference in feedback.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
