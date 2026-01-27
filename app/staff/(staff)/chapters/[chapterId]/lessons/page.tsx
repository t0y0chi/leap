import { notFound } from "next/navigation";
import { getAdminChapter, getAdminLessons } from "@/lib/staff-data";
import { AdminLessonsClient } from "./lessons-client";

export default async function AdminLessonsPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapter = getAdminChapter(chapterId);
  const lessons = getAdminLessons(chapterId);

  if (!chapter) return notFound();

  return <AdminLessonsClient chapter={chapter} initialLessons={lessons} />;
}
