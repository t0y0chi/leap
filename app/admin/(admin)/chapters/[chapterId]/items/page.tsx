import { notFound } from "next/navigation";
import { getAdminChapter, getAdminItems } from "@/lib/admin-data";
import { AdminItemsClient } from "./items-client";

export default async function AdminItemsPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapter = getAdminChapter(chapterId);
  const items = getAdminItems(chapterId);

  if (!chapter) return notFound();

  return <AdminItemsClient chapter={chapter} initialItems={items} />;
}
