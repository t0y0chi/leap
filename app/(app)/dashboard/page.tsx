import Link from "next/link";
import { BookOpen, Clock, Flame, Target, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses, learnerProfile, learningTimeline, notifications } from "@/lib/mock-data";

export default function DashboardPage() {
  const focusCourse = courses.find((course) => course.id === learnerProfile.focusCourseId);
  const firstIncompleteChapter = focusCourse?.chapters.find((chapter) => chapter.progress < 100);
  const nextItem = firstIncompleteChapter?.items.find((item) => item.status !== "completed");
  const unread = notifications.filter((n) => !n.read);

  const pendingItems =
    focusCourse?.chapters
      .flatMap((chapter) =>
        chapter.items
          .filter((item) => item.status !== "completed")
          .map((item) => ({
            ...item,
            chapter: chapter.title,
          })),
      )
      .slice(0, 3) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {learnerProfile.name}</h1>
          <p className="text-sm text-muted-foreground">
            Stay on track with the Annotation Fundamentals course.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Flame className="h-4 w-4 text-orange-500" />
          {learnerProfile.streak}-day streak
          <span className="mx-2 h-4 w-px bg-border" />
          <Clock className="h-4 w-4" />
          {learnerProfile.learningMinutes} min this week
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">Course progress</CardTitle>
              <CardDescription>Annotation Fundamentals</CardDescription>
            </div>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-end justify-between text-sm font-semibold">
              <span>{focusCourse?.progress ?? 0}% completed</span>
              <span className="text-muted-foreground">{focusCourse?.duration}</span>
            </div>
            <Progress value={focusCourse?.progress ?? 0} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              {focusCourse?.chapters.length} chapters · {focusCourse?.tags.join(", ")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">Weekly momentum</CardTitle>
              <CardDescription>Keep your streak alive</CardDescription>
            </div>
            <Flame className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-end justify-between text-sm font-semibold">
              <span>{learnerProfile.learningMinutes} minutes</span>
              <span className="text-muted-foreground">Goal: 240</span>
            </div>
            <Progress value={(learnerProfile.learningMinutes / 240) * 100} />
            <p className="text-xs text-muted-foreground">
              Short sessions count—finish the next lesson to extend your streak.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">Achievements</CardTitle>
              <CardDescription>Recent highlights</CardDescription>
            </div>
            <Trophy className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-md border bg-secondary px-3 py-2">
              <div>
                <p className="font-semibold">Quality badge unlocked</p>
                <p className="text-xs text-muted-foreground">
                  Completed the guideline quiz with 92%
                </p>
              </div>
              <Badge variant="success">New</Badge>
            </div>
            <div className="space-y-1 text-muted-foreground">
              {learnerProfile.badges.map((badge) => (
                <div key={badge} className="flex items-center justify-between">
                  <span>{badge}</span>
                  <span className="text-xs">+10 pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">Continue learning</CardTitle>
              <CardDescription>
                {firstIncompleteChapter?.title ?? "All caught up"}
              </CardDescription>
            </div>
            <Badge variant="secondary">{firstIncompleteChapter?.progress ?? 0}% of chapter</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextItem ? (
              <>
                <div className="flex items-start justify-between rounded-md border px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">{nextItem.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {nextItem.type.toUpperCase()} · {nextItem.duration}
                    </p>
                  </div>
                  <Badge variant="outline">{nextItem.status}</Badge>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/learn/courses/${focusCourse?.id}/chapters/${firstIncompleteChapter?.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Jump back in
                  </Link>
                  <Link
                    href={`/courses/${focusCourse?.id}`}
                    className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                  >
                    View syllabus
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">You are fully up to date!</div>
            )}
            <div className="grid gap-3 md:grid-cols-3">
              {pendingItems.map((item) => (
                <div key={item.id} className="rounded-md border bg-muted/60 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{item.title}</p>
                    <Badge variant="neutral" className="capitalize">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.chapter}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>What changed since you left</CardDescription>
            </div>
            <Badge variant="secondary">{unread.length} unread</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 4).map((note) => (
              <div
                key={note.id}
                className="flex items-start justify-between rounded-md border px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold">{note.title}</p>
                  <p className="text-xs text-muted-foreground">{note.timestamp}</p>
                </div>
                {!note.read && <span className="mt-1 h-2 w-2 rounded-full bg-primary" />}
              </div>
            ))}
            <Link
              href="/notifications"
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              View all updates
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Last sessions and score changes</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {learningTimeline.map((activity) => (
            <div
              key={activity.id}
              className="rounded-md border bg-white/80 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <p className="text-sm font-semibold">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
              <p className="mt-2 text-sm text-emerald-600">{activity.delta}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
