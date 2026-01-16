import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, FileEdit, PlayCircle, ShieldCheck } from "lucide-react";

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
import { getAdminChapter, getAdminItems } from "@/lib/admin-data";

function getEditHref(type: string, itemId: string) {
  if (type === "lecture") return `/admin/items/${itemId}/lecture/edit`;
  if (type === "quiz") return `/admin/items/${itemId}/quiz/edit`;
  return `/admin/items/${itemId}/assignment/edit`;
}

export default async function AdminItemsPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapter = getAdminChapter(chapterId);
  const items = getAdminItems(chapterId);

  if (!chapter) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Items</h1>
          <p className="text-sm text-muted-foreground">
            Control content, gating, and grading readiness for {chapter.title}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/admin/courses/${chapter.courseId}/chapters`}>Back to chapters</Link>
          </Button>
          <Button variant="outline">Add item</Button>
        </div>
      </div>

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
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Graded</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{item.title}</div>
                    <p className="text-xs text-muted-foreground">{item.summary}</p>
                  </TableCell>
                  <TableCell className="text-sm capitalize text-muted-foreground">
                    {item.type}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {item.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "published"
                          ? "success"
                          : item.status === "maintenance"
                            ? "secondary"
                            : "outline"
                      }
                      className="capitalize"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.graded ? "neutral" : "outline"}>
                      {item.graded ? "Graded" : "Ungraded"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.updatedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={getEditHref(item.type, item.id)}>Edit</Link>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <PlayCircle className="h-4 w-4" />
                        Preview
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
