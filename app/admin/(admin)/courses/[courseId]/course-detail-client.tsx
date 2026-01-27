"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { GripVertical, MoreHorizontal, Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import type { AdminChapter } from "@/lib/admin-data";

type ChapterForm = {
  title: string;
  description: string;
};

const defaultForm: ChapterForm = {
  title: "",
  description: "",
};

interface CourseDetailClientProps {
  courseId: string;
  initialChapters: AdminChapter[];
}

export default function CourseDetailClient({ courseId, initialChapters }: CourseDetailClientProps) {
  const [chapters, setChapters] = useState<AdminChapter[]>(initialChapters);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hasPendingOrder, setHasPendingOrder] = useState(false);

  const lessonRouteById = useMemo(() => {
    return new Map(chapters.map((chapter) => [chapter.id, `/admin/chapters/${chapter.id}/lessons`]));
  }, [chapters]);

  const resetForm = () => {
    setForm(defaultForm);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required to create a chapter.");
      return;
    }

    const highestOrder = chapters.reduce((max, chapter) => Math.max(max, chapter.order), 0);
    const newChapter: AdminChapter = {
      id: `draft-${crypto.randomUUID().slice(0, 8)}`,
      courseId,
      title: form.title.trim(),
      description: form.description.trim() || "Outline pending.",
      order: highestOrder + 1,
      publicationStatus: "draft",
      lessons: 0,
    };

    setChapters((prev) => [...prev, newChapter]);
    setIsAdding(false);
    resetForm();
  };

  const handleDelete = (chapterId: string) => {
    const chapter = chapters.find((item) => item.id === chapterId);
    if (!chapter) return;
    const confirmed = window.confirm(`Delete ${chapter.title}? This cannot be undone.`);
    if (!confirmed) return;
    setChapters((prev) => prev.filter((item) => item.id !== chapterId));
    setOpenMenuId(null);
  };

  const handleReorder = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    setChapters((prev) => {
      const sourceIndex = prev.findIndex((chapter) => chapter.id === sourceId);
      const targetIndex = prev.findIndex((chapter) => chapter.id === targetId);
      if (sourceIndex === -1 || targetIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next.map((chapter, index) => ({ ...chapter, order: index + 1 }));
    });
    setHasPendingOrder(true);
  };

  const handleSaveOrder = () => {
    setHasPendingOrder(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <CardTitle>Chapters</CardTitle>
        <Button
          type="button"
          variant={isAdding ? "secondary" : "outline"}
          onClick={() => setIsAdding((open) => !open)}
        >
          {isAdding ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {isAdding ? "Close form" : "Add chapter"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Chapter</TableHead>
                <TableHead>Lessons</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.map((chapter) => {
                const lessonRoute = lessonRouteById.get(chapter.id) ?? "#";
                return (
                  <TableRow
                    key={chapter.id}
                    draggable
                    onDragStart={() => setDraggingId(chapter.id)}
                    onDragEnd={() => setDraggingId(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggingId) handleReorder(draggingId, chapter.id);
                    }}
                    className={draggingId === chapter.id ? "bg-secondary/60" : undefined}
                  >
                    <TableCell className="text-muted-foreground">
                      <button type="button" className="cursor-grab text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                      </button>
                    </TableCell>
                    <TableCell className="p-0">
                      <Link href={lessonRoute} className="block px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold text-foreground">
                            {chapter.order}. {chapter.title}
                          </div>
                          <p className="text-xs text-muted-foreground">{chapter.description}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="p-0 text-sm text-muted-foreground">
                      <Link href={lessonRoute} className="block px-4 py-3">
                        {chapter.lessons}
                      </Link>
                    </TableCell>
                    <TableCell className="p-0">
                      <Link href={lessonRoute} className="block px-4 py-3">
                        <Badge
                          variant={
                            chapter.publicationStatus === "published" ? "success" : "warning"
                          }
                        >
                          {chapter.publicationStatus === "published" ? "Published" : "Draft"}
                        </Badge>
                      </Link>
                    </TableCell>
                    <TableCell className="p-0">
                      <div
                        className="relative flex justify-end px-4 py-3"
                        onBlur={(event) => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                            setOpenMenuId(null);
                          }
                        }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setOpenMenuId((prev) => (prev === chapter.id ? null : chapter.id))
                          }
                          aria-haspopup="menu"
                          aria-expanded={openMenuId === chapter.id}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                        {openMenuId === chapter.id && (
                          <div
                            role="menu"
                            className="absolute right-4 top-12 z-10 w-40 rounded-md border bg-background p-1 text-sm shadow-md"
                          >
                            <button
                              type="button"
                              role="menuitem"
                              className="w-full rounded px-3 py-2 text-left text-sm font-semibold text-destructive transition hover:bg-destructive/10"
                              onClick={() => handleDelete(chapter.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            {chapters.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-sm text-muted-foreground">
                  No chapters yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {hasPendingOrder && (
        <div className="flex justify-center border-t px-6 py-4">
          <Button type="button" onClick={handleSaveOrder}>
            Save order
          </Button>
        </div>
      )}

      {isAdding && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl rounded-lg border bg-background shadow-lg">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold">Add chapter</h2>
                <p className="text-sm text-muted-foreground">Create a new chapter for this course.</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAdding(false);
                  resetForm();
                }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Chapter title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, description: event.target.value }))
                    }
                    placeholder="Describe the focus of this chapter."
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex flex-wrap justify-end gap-2">
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
                <Button type="submit">Save as draft</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
}
