import { notFound } from "next/navigation";
import Link from "next/link";
import { ClipboardList, FileUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminLesson } from "@/lib/admin-data";

export default async function AdminAssignmentEditPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getAdminLesson(lessonId);
  if (!lesson || lesson.type !== "assignment") return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Edit assignment</h1>
          <p className="text-sm text-muted-foreground">
            Set submission expectations, attachments, and scoring rubric.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/admin/chapters/${lesson.chapterId}/lessons`}>Back to lessons</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="neutral">Assignment</Badge>
            <Badge variant="outline" className="capitalize">
              {lesson.status}
            </Badge>
          </div>
          <CardDescription>{lesson.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={lesson.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Expected time</Label>
              <Input id="duration" name="duration" defaultValue={lesson.duration} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxScore">Max score</Label>
              <Input
                id="maxScore"
                name="maxScore"
                type="number"
                defaultValue={lesson.maxScore ?? 100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachments">Required attachments</Label>
              <Input id="attachments" name="attachments" placeholder="zip, pdf, png" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Submission instructions</Label>
            <Textarea
              id="instructions"
              name="instructions"
              rows={5}
              placeholder="Call out occlusion handling, notes required, file naming, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rubric">Rubric criteria</Label>
            <Textarea
              id="rubric"
              name="rubric"
              rows={4}
              placeholder="Tight boxes, attribute coverage, notes for edge cases, SLA expectations."
            />
            <p className="text-xs text-muted-foreground">
              Include what earns full credit and what triggers returns.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>Save</Button>
            <Button asChild variant="outline">
              <Link href={`/admin/lessons/${lesson.id}/preview`}>Preview submission form</Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              <span>Ensure at least one attachment is required to unlock grading.</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              <span>Enable comments so reviewers can request clarifications.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
