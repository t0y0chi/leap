import { notFound } from "next/navigation";
import Link from "next/link";
import { Award, BookOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { adminLearners, adminSubmissions } from "@/lib/admin-data";

export default function AdminUserDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  const learner = adminLearners.find((user) => user.id === params.userId);
  const learnerSubmissions = adminSubmissions.filter(
    (submission) => submission.userId === params.userId,
  );

  if (!learner) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">{learner.name}</h1>
          <p className="text-sm text-muted-foreground">{learner.email}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users">Back to users</Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/users/${learner.id}/reviews/new`}>New review</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Learning progress</CardTitle>
            <p className="text-sm text-muted-foreground">
              {learner.activeCourseTitle} · {learner.cohort}
            </p>
          </div>
          <Badge variant={learner.risk === "attention" ? "warning" : "success"}>
            {learner.risk === "attention" ? "Needs attention" : "On track"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 rounded-lg border bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Progress</p>
              <div className="flex items-center gap-2">
                <Progress value={learner.progress * 100} className="flex-1" />
                <span className="text-sm font-semibold text-foreground">
                  {Math.round(learner.progress * 100)}%
                </span>
              </div>
            </div>
            <div className="space-y-1 rounded-lg border bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Average score</p>
              <p className="text-lg font-semibold text-foreground">
                {Math.round(learner.avgScore * 100)}%
              </p>
            </div>
            <div className="space-y-1 rounded-lg border bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Last active</p>
              <p className="text-lg font-semibold text-foreground">{learner.lastActive}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Recent submissions</p>
            <div className="space-y-3">
              {learnerSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex flex-col gap-1 rounded-lg border bg-white p-3 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-foreground">{submission.itemTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {submission.chapterTitle} · {submission.courseTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      Score: {submission.score ? `${submission.score}/100` : "pending"}
                    </Badge>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/assignments/submissions/${submission.id}`}>
                        Open
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              {learnerSubmissions.length === 0 && (
                <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
                  No submissions yet.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coaching notes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Log calibration decisions and follow-ups for this learner.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>
                Example: &quot;Strong on tooling, remind to document edge cases in notes.&quot;
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Add note
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
