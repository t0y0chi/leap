import type { Chapter, Course, LessonProgressStatus } from "@/lib/mock-data";

function isCompleted(status: LessonProgressStatus) {
  return status === "completed";
}

export function getLessonProgressStatus(
  lessonId: string,
  progressByLessonId: Record<string, LessonProgressStatus> = {},
): LessonProgressStatus {
  return progressByLessonId[lessonId] ?? "not-started";
}

export function getChapterProgress(
  chapter: Chapter,
  progressByLessonId: Record<string, LessonProgressStatus> = {},
): number {
  const total = chapter.lessons.length;
  if (total === 0) return 0;
  const completed = chapter.lessons.filter((lesson) =>
    isCompleted(getLessonProgressStatus(lesson.id, progressByLessonId)),
  ).length;
  return Math.round((completed / total) * 100);
}

export function getCourseProgress(
  course: Course,
  progressByLessonId: Record<string, LessonProgressStatus> = {},
): number {
  const lessons = course.chapters.flatMap((chapter) => chapter.lessons);
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((lesson) =>
    isCompleted(getLessonProgressStatus(lesson.id, progressByLessonId)),
  ).length;
  return Math.round((completed / lessons.length) * 100);
}
