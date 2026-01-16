import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftCircle, History, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminSubmission, getSubmissionEvents } from "@/lib/admin-data";

export default function AdminSubmissionHistoryPage({
  params,
}: {
  params: { submissionId: string };
}) {
  const submission = getAdminSubmission(params.submissionId);
  const events = getSubmissionEvents(params.submissionId);

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
          <Link href={`/admin/assignments/submissions/${submission.id}`}>
            <ArrowLeftCircle className="mr-2 h-4 w-4" />
            Back to detail
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{submission.itemTitle}</CardTitle>
          <CardDescription>
            {submission.userName} · {submission.chapterTitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-1 rounded-lg border bg-white p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <History className="h-4 w-4" />
                    <span>{event.timestamp}</span>
                  </div>
                  <p className="font-semibold text-foreground">{event.label}</p>
                  <p className="text-sm text-muted-foreground">{event.detail}</p>
                </div>
                <Button size="sm" variant="outline">
                  View version
                </Button>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-muted-foreground">No history yet.</p>
            )}
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
