import Link from "next/link";
import { AlertTriangle, Clock3 } from "lucide-react";

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

export default function AdminPendingSubmissionsPage() {
  const pending = adminSubmissions.filter(
    (submission) => submission.submissionStatus === "pending",
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Pending grading</h1>
          <p className="text-sm text-muted-foreground">
            Fast track submissions that are waiting on reviewers.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/assignments/submissions">Back to all</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>Grading queue</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            SLA target: under 8 hours
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission</TableHead>
                <TableHead>Learner</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map((submission) => (
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
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {submission.submittedAt}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Badge variant="warning">Needs grading</Badge>
                      <Button asChild size="sm">
                        <Link href={`/admin/assignments/submissions/${submission.id}/grade`}>
                          Grade now
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {pending.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-20 text-center text-sm text-muted-foreground">
                    No pending submissions right now.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
