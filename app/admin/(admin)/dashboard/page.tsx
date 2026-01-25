import { CheckCircle, Clock3, Gauge, Inbox, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminCourses, adminSubmissions } from "@/lib/admin-data";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboardPage() {
  const pending = adminSubmissions.filter((submission) => submission.status === "pending");
  const graded = adminSubmissions.filter((submission) => submission.status === "graded");
  const averageScore =
    graded.reduce((total, submission) => total + (submission.score ?? 0), 0) /
    Math.max(graded.length, 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Admin dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track course readiness, grading backlog, and learner health.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/assignments/submissions/pending">View pending grading</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/courses/new">Create course</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Pending grading</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{pending.length}</div>
            <p className="text-xs text-muted-foreground">Assignments waiting for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Active learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">226</div>
            <p className="text-xs text-muted-foreground">Across all workspaces</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Average score</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{Math.round(averageScore)}%</div>
            <p className="text-xs text-muted-foreground">Across graded submissions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Submission backlog</CardTitle>
            <p className="text-sm text-muted-foreground">
              Highest priority lessons from all courses.
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/assignments/submissions">Open submission table</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.slice(0, 3).map((submission) => (
            <div
              key={submission.id}
              className="flex flex-col justify-between gap-3 rounded-lg border bg-white/70 p-4 md:flex-row md:items-center"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  <span>{submission.submittedAt}</span>
                </div>
                <p className="font-semibold text-foreground">{submission.lessonTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {submission.userName} · {submission.chapterTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{submission.courseTitle}</Badge>
                <Button asChild size="sm">
                  <Link href={`/admin/assignments/submissions/${submission.id}/grade`}>
                    Grade now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
          {pending.length === 0 && (
            <p className="text-sm text-muted-foreground">No backlog. Great work.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {adminCourses.map((course) => (
              <div key={course.id} className="rounded-lg border bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{course.track}</p>
                    <p className="text-base font-semibold">{course.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        course.status === "published"
                          ? "success"
                          : course.status === "maintenance"
                            ? "secondary"
                            : "outline"
                      }
                      className="capitalize"
                    >
                      {course.status}
                    </Badge>
                    <Badge variant="outline">{course.visibility}</Badge>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="w-full flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Completion</span>
                      <span>{Math.round(course.completionRate * 100)}%</span>
                    </div>
                    <Progress value={course.completionRate * 100} className="mt-1.5" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {course.pendingSubmissions} pending
                  </div>
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Manage course
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border bg-amber-50 p-3 text-sm text-amber-900">
              Ch.3 in &quot;Annotation Fundamentals&quot; is still a draft. Publish before Monday.
            </div>
            <div className="rounded-lg border bg-emerald-50 p-3 text-sm text-emerald-900">
              No SLA breaches in the past 24h. Keep response times under 8h.
            </div>
            <div className="rounded-lg border bg-sky-50 p-3 text-sm text-sky-900">
              Invite two more reviewers for &quot;Reviewer Coaching Lab&quot; to speed up grading.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
