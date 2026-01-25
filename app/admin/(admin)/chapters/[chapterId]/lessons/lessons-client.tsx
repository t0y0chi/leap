"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import BlocknoteEditor from "@/components/blocknote/BlocknoteEditor";
import type { AdminChapter, AdminLesson, AdminLessonType } from "@/lib/admin-data";

function getEditHref(type: AdminLessonType, lessonId: string) {
  if (type === "lecture") return `/admin/lessons/${lessonId}/lecture/edit`;
  if (type === "quiz") return `/admin/lessons/${lessonId}/quiz/edit`;
  return `/admin/lessons/${lessonId}/assignment/edit`;
}

interface AdminLessonsClientProps {
  chapter: AdminChapter;
  initialLessons: AdminLesson[];
}

const defaultForm: {
  title: string;
  type: AdminLessonType;
  duration: string;
  summary: string;
  graded: boolean;
  required: boolean;
} = {
  title: "",
  type: "lecture",
  duration: "10m",
  summary: "",
  graded: false,
  required: true,
};

const selectClassName =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function AdminLessonsClient({ chapter, initialLessons }: AdminLessonsClientProps) {
  const [lessons, setLessons] = useState<AdminLesson[]>(initialLessons);
  const [form, setForm] = useState(defaultForm);
  const [isAdding, setIsAdding] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const existingIds = useMemo(
    () => new Set(initialLessons.map((lesson) => lesson.id)),
    [initialLessons],
  );

  const resetForm = () => {
    setForm(defaultForm);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required to create a lesson.");
      return;
    }

    const now = "Just now";
    const newLesson: AdminLesson = {
      id: `draft-${crypto.randomUUID().slice(0, 8)}`,
      chapterId: chapter.id,
      title: form.title.trim(),
      type: form.type,
      duration: form.duration.trim() || "5m",
      status: "draft",
      required: form.required,
      graded: form.type !== "lecture" ? true : form.graded,
      updatedAt: now,
      summary: form.summary.trim() || "Pending full outline.",
      passingScore: form.type === "quiz" ? 80 : undefined,
      maxScore: form.type === "assignment" || form.type === "quiz" ? 100 : undefined,
      attempts: form.type === "quiz" ? 1 : undefined,
    };

    setLessons((prev) => [...prev, newLesson]);
    setRecentlyAdded(newLesson.title);
    setIsAdding(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Lessons</h1>
          <p className="text-sm text-muted-foreground">
            Control content, gating, and grading readiness for {chapter.title}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/admin/courses/${chapter.courseId}/chapters`}>Back to chapters</Link>
          </Button>
          <Button
            type="button"
            variant={isAdding ? "secondary" : "outline"}
            onClick={() => setIsAdding((open) => !open)}
          >
            {isAdding ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isAdding ? "Close form" : "Add lesson"}
          </Button>
        </div>
      </div>

      {recentlyAdded && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          <span>
            Added “{recentlyAdded}” as a draft. Edit details once saved to the workspace.
          </span>
        </div>
      )}

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>New lesson</CardTitle>
            <p className="text-sm text-muted-foreground">
              Define the next piece of learning content for this chapter.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Calibration quiz or assignment name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    name="type"
                    className={selectClassName}
                    value={form.type}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        type: event.target.value as AdminLessonType,
                        graded: event.target.value === "lecture" ? false : true,
                      }))
                    }
                  >
                    <option value="lecture">Lecture</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="duration"
                      name="duration"
                      value={form.duration}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, duration: event.target.value }))
                      }
                      placeholder="8m"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    rows={3}
                    value={form.summary}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, summary: event.target.value }))
                    }
                    placeholder="What should learners accomplish or prove?"
                  />
                </div>
                {form.type === "lecture" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label>Lecture notes</Label>
                    <div className="rounded-md border bg-background p-2">
                      <BlocknoteEditor />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Draft rich lecture notes before saving this lesson.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-muted-foreground"
                    checked={form.required}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, required: event.target.checked }))
                    }
                  />
                  <span>Required to progress</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-muted-foreground"
                    checked={form.graded}
                    disabled={form.type !== "lecture" ? true : false}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, graded: event.target.checked }))
                    }
                  />
                  <span>{form.type === "lecture" ? "Mark lecture as graded" : "Graded by default"}</span>
                </label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex flex-wrap gap-2">
                <Button type="submit">Save as draft</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>{chapter.title}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Require at least one graded checkpoint per chapter.
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lesson</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Graded</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.map((lesson) => {
                const isLocalDraft = !existingIds.has(lesson.id);

                return (
                  <TableRow key={lesson.id}>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-semibold text-foreground">{lesson.title}</div>
                          {isLocalDraft && <Badge variant="warning">Local draft</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{lesson.summary}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm capitalize text-muted-foreground">
                      {lesson.type}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {lesson.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          lesson.status === "published"
                            ? "success"
                            : lesson.status === "maintenance"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {lesson.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={lesson.graded ? "neutral" : "outline"}>
                        {lesson.graded ? "Graded" : "Ungraded"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lesson.updatedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      {isLocalDraft ? (
                        <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                          <Badge variant="secondary">Draft only</Badge>
                          <span>Save to edit or preview</span>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={getEditHref(lesson.type, lesson.id)}>Edit</Link>
                          </Button>
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/admin/lessons/${lesson.id}/preview`}>
                              <PlayCircle className="h-4 w-4" />
                              Preview
                            </Link>
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
