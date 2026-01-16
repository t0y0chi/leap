import Link from "next/link";
import { Activity } from "lucide-react";

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
import { Progress } from "@/components/ui/progress";
import { adminLearners } from "@/lib/admin-data";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            View learner health, scores, and escalation risk.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/admins/invite">Invite admin</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>Learners</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-4 w-4" />
            Sorted by risk and progress
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Cohort</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Avg score</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminLearners.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{learner.name}</div>
                    <p className="text-xs text-muted-foreground">{learner.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{learner.cohort}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {learner.activeCourseTitle}
                  </TableCell>
                  <TableCell className="w-36">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{Math.round(learner.progress * 100)}%</span>
                    </div>
                    <Progress value={learner.progress * 100} className="mt-1" />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {Math.round(learner.avgScore * 100)}%
                  </TableCell>
                  <TableCell>
                    <Badge variant={learner.risk === "attention" ? "warning" : "success"}>
                      {learner.risk === "attention" ? "Needs attention" : "On track"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {learner.lastActive}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${learner.id}`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Profile
                      </Link>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/users/${learner.id}/reviews/new`}>Score</Link>
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
