import { Bell, CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";

const typeLabels: Record<string, string> = {
  grading: "Grading",
  announcement: "Announcement",
  system: "Reminder",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Score updates, reminders, and course news.
          </p>
        </div>
        <Badge variant="secondary">
          <Bell className="mr-1 h-4 w-4" />
          {notifications.filter((n) => !n.read).length} unread
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent updates</CardTitle>
          <CardDescription>Sorted by most recent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                  {note.type === "grading" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{note.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    {note.timestamp}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral">{typeLabels[note.type]}</Badge>
                {!note.read && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
