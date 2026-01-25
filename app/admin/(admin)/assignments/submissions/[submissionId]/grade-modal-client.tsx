"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type GradeModalSubmission = {
  id: string;
  lessonTitle: string;
  chapterTitle: string;
  courseTitle: string;
  userName: string;
  submittedAt: string;
  attachments: string[];
};

type GradeModalClientProps = {
  submission: GradeModalSubmission;
};

export default function GradeModalClient({ submission }: GradeModalClientProps) {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState("");
  const numericScore = Number(score);
  const hasScore = Number.isFinite(numericScore);
  const statusLabel = hasScore && numericScore >= 80 ? "Pass" : "Resubmission required";

  const handleReturn = () => {
    setOpen(false);
    toast.success("Registered successfully.");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Grade</Button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b px-6 py-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Grade submission
                </p>
                <h2 className="text-lg font-semibold text-foreground">{submission.lessonTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {submission.chapterTitle} · {submission.courseTitle}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge variant="outline">{submission.userName}</Badge>
                <span className="text-muted-foreground">Submitted {submission.submittedAt}</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Attachments
                </p>
                <div className="flex flex-wrap gap-2">
                  {submission.attachments.map((file) => (
                    <span
                      key={file}
                      className="rounded-full border bg-white px-3 py-1 text-xs text-muted-foreground"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="score">Score</Label>
                  <Input
                    id="score"
                    name="score"
                    type="number"
                    placeholder="0-100"
                    value={score}
                    onChange={(event) => setScore(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex h-10 items-center rounded-md border bg-secondary px-3 text-sm text-foreground">
                    {hasScore ? statusLabel : "Enter score to determine status"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback to learner</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  placeholder="List rubric reference, what was correct, and next steps."
                />
              </div>

            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t px-6 py-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReturn}>Return with score</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
