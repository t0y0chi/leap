import Link from "next/link";

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const defaultTags = ["Quality", "Vision", "Onboarding"];

export default function AdminCourseCreatePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Create course</h1>
          <p className="text-sm text-muted-foreground">
            Draft a new course, set ownership, and define publishing rules.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/staff/courses">Back to list</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course details</CardTitle>
          <CardDescription>Baseline metadata required for publishing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Quality & Feedback Lab" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input id="owner" name="owner" placeholder="Course owner" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Outline the audience, objectives, and expected outcomes."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {defaultTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <Button variant="ghost" size="sm">
                + Add tag
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>Create draft</Button>
            <Button variant="outline">Save and publish</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
