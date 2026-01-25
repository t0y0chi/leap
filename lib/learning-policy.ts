import type { LearningMode } from "@/lib/learning-routes";

export function getMaxAccessibleIndex(
  mode: LearningMode,
  completedIndex: number,
) {
  if (mode === "preview") return Number.POSITIVE_INFINITY;
  return completedIndex + 1;
}

export function isLessonLocked(
  mode: LearningMode,
  lessonIndex: number,
  completedIndex: number,
) {
  if (mode === "preview") return false;
  return lessonIndex > getMaxAccessibleIndex(mode, completedIndex);
}
