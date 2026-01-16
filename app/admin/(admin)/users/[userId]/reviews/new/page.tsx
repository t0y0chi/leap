import { notFound } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminLearners } from "@/lib/admin-data";

export default function AdminUserReviewPage({
  params,
}: {
  params: { userId: string };
}) {
  const learner = adminLearners.find((user) => user.id === params.userId);
  if (!learner) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">New review</h1>
          <p className="text-sm text-muted-foreground">Score {learner.name} on a 5-star scale.</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/admin/users/${learner.id}`}>Back to profile</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{learner.name}</CardTitle>
          <CardDescription>{learner.activeCourseTitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="score">Score (1-5)</Label>
              <Input id="score" name="score" type="number" min="1" max="5" defaultValue="4" />
              <p className="text-xs text-muted-foreground">
                Use whole numbers; reserve 5 for fully independent annotators.
              </p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="badge">Badge or recognition</Label>
              <Input id="badge" name="badge" placeholder="e.g., Rapid Grader" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              rows={4}
              placeholder="Notes on rubric discipline, communication, and throughput."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next-steps">Next steps</Label>
            <Textarea
              id="next-steps"
              name="next-steps"
              rows={3}
              placeholder="What should they double down on next week?"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>
              <Star className="mr-2 h-4 w-4" />
              Publish review
            </Button>
            <Button variant="outline">Save draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
