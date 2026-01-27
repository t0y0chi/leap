import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckSquare, Paperclip } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminSubmission } from "@/lib/staff-data";

export default async function AdminGradePage({
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
          <h1 className="text-2xl font-semibold">Grade submission</h1>
          <p className="text-sm text-muted-foreground">
            Score against rubric, attach references, and return feedback.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/staff/assignments/submissions/${submission.id}`}>View detail</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
          <CardTitle>{submission.lessonTitle}</CardTitle>
            <CardDescription>
              {submission.chapterTitle} · {submission.courseTitle}
            </CardDescription>
          </div>
          <Badge variant="warning">Grading</Badge>
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
              <p className="text-xs text-muted-foreground">Attachments</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {submission.attachments.map((file) => (
                  <span
                    key={file}
                    className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs text-muted-foreground"
                  >
                    <Paperclip className="h-3.5 w-3.5" />
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input id="score" name="score" type="number" placeholder="0-100" />
              <p className="text-xs text-muted-foreground">
                Require rubric reference when below pass threshold.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" defaultValue="Return with edits" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachments">Attach proof (optional)</Label>
              <Input id="attachments" name="attachments" placeholder="link to image or doc" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback to learner</Label>
            <Textarea
              id="feedback"
              name="feedback"
              rows={5}
              placeholder="List rubric reference, what was correct, and next steps."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="internal">Internal notes</Label>
            <Textarea
              id="internal"
              name="internal"
              rows={3}
              placeholder="Escalations, blockers, or follow-ups for ops."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>Return with score</Button>
            <Button variant="outline">Save draft</Button>
            <Button variant="ghost" className="text-destructive">
              Request resubmission
            </Button>
          </div>

          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              <span>Checklist: geometry tightness, attributes consistent, notes added.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
