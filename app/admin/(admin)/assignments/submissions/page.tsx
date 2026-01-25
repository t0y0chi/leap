import Link from "next/link";
import { UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminSubmissions } from "@/lib/admin-data";

export default function AdminSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Submissions</h1>
          <p className="text-sm text-muted-foreground">
            Track all learner submissions and route to grading.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/assignments/submissions/pending">Filter pending</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>All submissions</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserRound className="h-4 w-4" />
            Sorted by newest first
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission</TableHead>
                <TableHead>Learner</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{submission.lessonTitle}</div>
                    <p className="text-xs text-muted-foreground">{submission.chapterTitle}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.userName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.courseTitle}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.score ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.submittedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/assignments/submissions/${submission.id}`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Details
                      </Link>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/assignments/submissions/${submission.id}/grade`}>
                          Grade
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
