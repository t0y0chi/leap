import Link from "next/link";
import { Edit, Mail, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { courses, learnerProfile, learningTimeline } from "@/lib/mock-data";

export default function ProfilePage() {
  const focusCourse = courses[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm text-muted-foreground">Your learner identity and progress.</p>
        </div>
        <Link
          href="/profile/edit"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold hover:bg-secondary"
        >
          <Edit className="h-4 w-4" />
          Edit profile
        </Link>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={learnerProfile.avatar} alt={learnerProfile.name} className="h-16 w-16" fallback="AC" />
            <div>
              <p className="text-lg font-semibold">{learnerProfile.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {learnerProfile.email}
              </div>
              <Badge variant="secondary" className="mt-2">
                {learnerProfile.role}
              </Badge>
            </div>
          </div>
          <div className="rounded-lg border bg-secondary/60 px-4 py-3 text-sm">
            <p className="font-semibold">Current course</p>
            <p className="text-muted-foreground">{focusCourse.title}</p>
            <Progress value={focusCourse.progress} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Completion rate</CardTitle>
            <CardDescription>Course-wide</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{Math.round(learnerProfile.completionRate * 100)}%</p>
            <p className="text-sm text-muted-foreground">Keep up the steady pace.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Streak</CardTitle>
            <CardDescription>Daily practice</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{learnerProfile.streak} days</p>
            <p className="text-sm text-muted-foreground">Short sessions still count.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Badges</CardTitle>
            <CardDescription>Quality signals</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {learnerProfile.badges.map((badge) => (
              <Badge key={badge} variant="neutral">
                {badge}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Last few sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {learningTimeline.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg border bg-white px-4 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div>
                  <p className="text-sm font-semibold">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">{activity.delta}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Account</CardTitle>
            <CardDescription>Security and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 rounded-md border px-3 py-2">
              <Shield className="h-4 w-4" />
              Email verified · Password set
            </div>
            <p>Use edit mode to update your name, avatar, or password.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
