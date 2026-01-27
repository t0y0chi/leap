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
import { adminSubmissions } from "@/lib/staff-data";

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
          <Link href="/staff/assignments/submissions/pending">Filter pending</Link>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="p-0">
                    <Link
                      href={`/staff/assignments/submissions/${submission.id}`}
                      className="block px-4 py-3"
                    >
                      <div className="font-semibold text-foreground">
                        {submission.lessonTitle}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {submission.chapterTitle}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-sm text-muted-foreground">
                    <Link
                      href={`/staff/assignments/submissions/${submission.id}`}
                      className="block px-4 py-3"
                    >
                      {submission.userName}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-sm text-muted-foreground">
                    <Link
                      href={`/staff/assignments/submissions/${submission.id}`}
                      className="block px-4 py-3"
                    >
                      {submission.courseTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0">
                    <Link
                      href={`/staff/assignments/submissions/${submission.id}`}
                      className="block px-4 py-3"
                    >
                      <Badge
                        variant={
                          submission.submissionStatus === "graded"
                            ? "success"
                            : submission.submissionStatus === "pending"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {submission.submissionStatus}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-sm text-muted-foreground">
                    <Link
                      href={`/staff/assignments/submissions/${submission.id}`}
                      className="block px-4 py-3"
                    >
                      {submission.score ?? "—"}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-sm text-muted-foreground">
                    <Link
                      href={`/staff/assignments/submissions/${submission.id}`}
                      className="block px-4 py-3"
                    >
                      {submission.submittedAt}
                    </Link>
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
