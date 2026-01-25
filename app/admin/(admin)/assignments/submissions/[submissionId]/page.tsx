import { notFound } from "next/navigation";
import Link from "next/link";
import { Paperclip } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminLearners, adminLessons, getAdminSubmission } from "@/lib/admin-data";
import GradeModalClient from "./grade-modal-client";

export default async function AdminSubmissionDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const submission = getAdminSubmission(submissionId);
  const lesson = adminLessons.find((item) => item.id === submission?.lessonId);
  const learner = adminLearners.find((user) => user.id === submission?.userId);
  if (!submission) return notFound();
  const learnerInitials = learner?.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("");

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Submission detail</h1>
          <p className="text-sm text-muted-foreground">
            Review files, notes, and history before grading.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/assignments/submissions">Back</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Lesson
            </p>
            {lesson ? (
              <CardTitle className="text-xl">
                <Link
                  href={`/preview/learn/courses/${submission.courseId}/chapters/${lesson.chapterId}/lessons/${lesson.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {submission.lessonTitle}
                </Link>
              </CardTitle>
            ) : (
              <CardTitle className="text-xl">{submission.lessonTitle}</CardTitle>
            )}
            <CardDescription>
              {submission.chapterTitle} · {submission.courseTitle}
            </CardDescription>
            {lesson?.summary && (
              <p className="text-sm text-muted-foreground">{lesson.summary}</p>
            )}
          </div>
          <Badge
            variant={
              submission.status === "graded"
                ? "success"
                : submission.status === "pending"
                  ? "warning"
                  : "secondary"
            }
            className="capitalize"
          >
            {submission.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Learner
            </p>
            {learner ? (
              <Link
                href={`/admin/users/${learner.id}`}
                className="inline-flex items-center gap-3 text-sm font-semibold text-foreground"
              >
                <Avatar
                  src={learner.avatarUrl}
                  alt={learner.name}
                  fallback={learnerInitials}
                  className="h-10 w-10"
                />
                <span>{learner.name}</span>
              </Link>
            ) : (
              <p className="text-sm font-semibold text-foreground">{submission.userName}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Attachments
            </p>
            <div className="flex flex-wrap gap-2">
              {submission.attachments.map((file) => (
                <a
                  key={file}
                  href={`/attachments/${submission.id}/${encodeURIComponent(file)}`}
                  download
                  className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm text-foreground transition hover:bg-secondary"
                >
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span>{file}</span>
                </a>
              ))}
            </div>
          </div>

          {submission.reviewer && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Reviewer feedback
              </p>
              <div className="rounded-lg border bg-white p-3 text-sm text-foreground">
                <p className="font-semibold">{submission.reviewer}</p>
                <p className="text-muted-foreground">{submission.comments}</p>
              </div>
            </div>
          )}

          <div className="flex justify-start">
            <GradeModalClient
              submission={{
                id: submission.id,
                lessonTitle: submission.lessonTitle,
                chapterTitle: submission.chapterTitle,
                courseTitle: submission.courseTitle,
                userName: submission.userName,
                submittedAt: submission.submittedAt,
                attachments: submission.attachments,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
