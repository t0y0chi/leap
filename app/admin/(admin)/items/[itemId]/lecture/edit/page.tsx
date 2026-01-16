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
import { getAdminItem } from "@/lib/admin-data";

export default function AdminLectureEditPage({
  params,
}: {
  params: { itemId: string };
}) {
  const item = getAdminItem(params.itemId);
  if (!item || item.type !== "lecture") return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Edit lecture</h1>
          <p className="text-sm text-muted-foreground">
            Update media, transcripts, and pacing for this lecture.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/admin/chapters/${item.chapterId}/items`}>Back to items</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{item.title}</CardTitle>
            <Badge variant="neutral">Lecture</Badge>
            <Badge variant="outline" className="capitalize">
              {item.status}
            </Badge>
          </div>
          <CardDescription>{item.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={item.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <Input id="duration" name="duration" defaultValue={item.duration} />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                placeholder="https://www.youtube.com/embed/..."
              />
              <p className="text-xs text-muted-foreground">
                Use an embeddable link to keep playback inside the app.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Lecture notes</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={5}
              placeholder="Summaries, key moments, and rubric references."
            />
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
