import { notFound } from "next/navigation";
import Link from "next/link";
import { Film, Timer } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import BlocknoteEditor from "@/components/blocknote/BlocknoteEditor";
import { getAdminLesson } from "@/lib/admin-data";

export default async function AdminLectureEditPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getAdminLesson(lessonId);
  if (!lesson || lesson.type !== "lecture") return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Edit lecture</h1>
          <p className="text-sm text-muted-foreground">
            Update lesson details, grading, and notes for this lecture.
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
            <Badge variant="neutral">Lecture</Badge>
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
              <Label htmlFor="type">Type</Label>
              <Input id="type" name="type" defaultValue="Lecture" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <Input id="duration" name="duration" defaultValue={lesson.duration} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Lecture notes</Label>
            <div className="rounded-md border bg-background p-2">
              <BlocknoteEditor />
            </div>
            <p className="text-xs text-muted-foreground">
              Draft rich lecture notes before saving this lesson.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-muted-foreground"
                defaultChecked={lesson.required}
              />
              <span>Required to progress</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-muted-foreground"
                defaultChecked={lesson.graded}
              />
              <span>Mark lecture as graded</span>
            </label>
          </div>
          <div className="flex gap-2">
            <Button>Save</Button>
            <Button variant="outline">Preview</Button>
            <Button variant="ghost" className="text-destructive">
              Archive
            </Button>
          </div>
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>Tip: keep lectures under 12 minutes and link to rubric snippets.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
