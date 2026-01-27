import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftCircle, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminSubmission } from "@/lib/staff-data";

export default async function AdminSubmissionHistoryPage({
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
          <h1 className="text-2xl font-semibold">Submission history</h1>
          <p className="text-sm text-muted-foreground">
            Track returns, resubmissions, and reviewer notes.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/staff/assignments/submissions/${submission.id}`}>
            <ArrowLeftCircle className="mr-2 h-4 w-4" />
            Back to detail
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{submission.lessonTitle}</CardTitle>
          <CardDescription>
            {submission.userName} · {submission.chapterTitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">History is not available.</p>
          </div>
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Use history to keep reviewer decisions auditable.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
