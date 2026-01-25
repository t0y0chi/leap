import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  adminChapters,
  adminCourses,
  adminLearners,
  adminLessons,
  adminSubmissions,
} from "@/lib/admin-data";
import EvaluationRadarClient from "./evaluation-radar-client";
import ActivityTabsClient from "./activity-tabs-client";

type EvaluationScore = {
  label: string;
  value: number;
};

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const learner = adminLearners.find((user) => user.id === userId);
  const learnerSubmissions = adminSubmissions.filter(
    (submission) => submission.userId === userId,
  );
  const evaluationScores: EvaluationScore[] = [
    { label: "Motivation", value: 4 },
    { label: "Speed", value: 3 },
    { label: "Quality", value: 4 },
    { label: "Logical Thinking", value: 3 },
    { label: "Communication", value: 5 },
  ];

  if (!learner) return notFound();

  const activeCourse = adminCourses.find(
    (course) => course.title === learner.activeCourseTitle,
  );
  const courseChapters = adminChapters.filter(
    (chapter) => chapter.courseId === activeCourse?.id,
  );
  const chapterTitleById = new Map(courseChapters.map((chapter) => [chapter.id, chapter.title]));
  const quizLessons =
    courseChapters.length > 0
      ? adminLessons.filter(
          (lesson) =>
            lesson.type === "quiz" &&
            courseChapters.some((chapter) => chapter.id === lesson.chapterId),
        )
      : adminLessons.filter((lesson) => lesson.type === "quiz");
  const quizScores = [92, 86, 96, 78, 88];
  const quizzes = quizLessons.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    chapterTitle: chapterTitleById.get(lesson.chapterId) ?? "General",
    score: quizScores[index % quizScores.length],
    maxScore: lesson.maxScore ?? 100,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-full border bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={learner.avatarUrl}
              alt={`${learner.name} profile`}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{learner.name}</h1>
            <p className="text-sm text-muted-foreground">{learner.email}</p>
            <p className="text-sm text-muted-foreground">{learner.phone}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {learner.roles.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users">Back to users</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle>Evaluation</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated Jan 24, 2026 · Updated by Samira Patel
          </p>
        </CardHeader>
        <CardContent>
          <EvaluationRadarClient scores={evaluationScores} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Activity</CardTitle>
            <p className="text-sm text-muted-foreground">
              {learner.activeCourseTitle} · {learner.cohort}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ActivityTabsClient submissions={learnerSubmissions} quizzes={quizzes} />
        </CardContent>
      </Card>

    </div>
  );
}
