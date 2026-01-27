import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ notificationId: string }>;
}) {
  const { notificationId } = await params;
  const notification = notifications.find((note) => note.id === notificationId);
  if (!notification) return notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Notification</h1>
          <p className="text-sm text-muted-foreground">Update details.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/notifications">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to notifications
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Notification
            </p>
            <CardTitle className="text-xl">{notification.title}</CardTitle>
            <CardDescription>{notification.createdAt}</CardDescription>
          </div>
          {!notification.read && <Badge variant="warning">Unread</Badge>}
        </CardHeader>
        <CardContent className="space-y-6">
          {notification.meta && notification.meta.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Details
              </p>
              <div className="rounded-lg border bg-white p-4 text-sm text-foreground">
                <ul className="space-y-2">
                  {notification.meta.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {notification.body && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Message
              </p>
              <div className="rounded-lg border bg-white p-4 text-sm text-foreground">
                {notification.body}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {notification.ctaHref && notification.ctaLabel && (
              <Button asChild>
                <Link href={notification.ctaHref}>{notification.ctaLabel}</Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href="/notifications">Back to notifications</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
