export type LearningMode = "learn" | "preview";

export function courseHref(mode: LearningMode, courseId: string) {
  return mode === "preview" ? `/preview/courses/${courseId}` : `/courses/${courseId}`;
}

export function learnCourseHref(mode: LearningMode, courseId: string) {
  return mode === "preview"
    ? `/preview/learn/courses/${courseId}`
    : `/learn/courses/${courseId}`;
}

export function learnChapterHref(
  mode: LearningMode,
  courseId: string,
  chapterId: string,
) {
  return `${learnCourseHref(mode, courseId)}/chapters/${chapterId}`;
}

export function learnLessonHref(
  mode: LearningMode,
  courseId: string,
  chapterId: string,
  lessonId: string,
) {
  return `${learnChapterHref(mode, courseId, chapterId)}/lessons/${lessonId}`;
}
