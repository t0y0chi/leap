"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, FileUp, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type LearningLesson } from "@/lib/mock-data";

const typeLabel: Record<LearningLesson["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

interface LessonContentProps {
  lesson: LearningLesson;
  onReadyForContinue?: (ready: boolean) => void;
}

export function LessonContent({ lesson, onReadyForContinue }: LessonContentProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [uploadSelected, setUploadSelected] = useState(false);

  const isCorrect = useMemo(() => {
    if (!checked || !selectedChoice) return null;
    const choice = lesson.choices?.find((c) => c.id === selectedChoice);
    return choice?.correct ?? false;
  }, [checked, selectedChoice, lesson.choices]);

  useEffect(() => {
    if (onReadyForContinue) {
      if (lesson.type === "quiz" || lesson.type === "assignment") {
        onReadyForContinue(lesson.status === "completed" || assignmentSubmitted);
      } else {
        onReadyForContinue(true);
      }
    }
  }, [lesson, assignmentSubmitted, onReadyForContinue]);

  useEffect(() => {
    if (lesson.type !== "quiz" || !onReadyForContinue) return;
    if (!checked || isCorrect === null) return;
    onReadyForContinue(isCorrect);
  }, [checked, isCorrect, lesson.type, onReadyForContinue]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="neutral">{typeLabel[lesson.type]}</Badge>
        <span>·</span>
        <span>{lesson.duration}</span>
      </div>

      {lesson.type === "lecture" && lesson.videoUrl ? (
        <div className="overflow-hidden rounded-lg border bg-black/80">
          <iframe
            title={lesson.title}
            src={lesson.videoUrl}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      {lesson.type === "reading" && (
        <div className="space-y-2 px-1 text-sm">
          <div
            className="prose prose-sm max-w-none text-foreground [&_p]:mb-4 [&_p]:leading-relaxed [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-3 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-foreground [&_li]:mb-2 [&_hr]:my-6 [&_hr]:border-border"
            dangerouslySetInnerHTML={{
              __html: lesson.readingHtml ?? lesson.content ?? "",
            }}
          />
        </div>
      )}

      {lesson.type === "quiz" && lesson.questionType === "multiple-choice" && (
        <div className="space-y-3 rounded-lg border px-4 py-3">
          <p className="text-sm font-semibold">Check your understanding</p>
          <p className="text-sm text-muted-foreground">{lesson.content}</p>
          <div className="space-y-2">
            {lesson.choices?.map((choice) => (
              <label
                key={choice.id}
                className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition hover:bg-secondary"
              >
                <input
                  type="radio"
                  name="quiz-choice"
                  value={choice.id}
                  className="h-4 w-4"
                  onChange={() => {
                    setSelectedChoice(choice.id);
                    setChecked(false);
                  }}
                  checked={selectedChoice === choice.id}
                />
                <span className="flex-1">{choice.text}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              disabled={!selectedChoice}
              onClick={() => setChecked(true)}
            >
              Submit answer
            </Button>
            {checked && isCorrect !== null && (
              <span
                className={isCorrect ? "text-emerald-600" : "text-amber-600"}
              >
                {isCorrect ? "Correct!" : "Try a different option."}
              </span>
            )}
          </div>
        </div>
      )}

      {lesson.type === "assignment" && (
        <div className="space-y-3 rounded-lg border px-4 py-3">
          <p className="text-sm font-semibold">Submission</p>
          <p className="text-sm text-muted-foreground">
            {lesson.content ?? "Upload your annotated samples for review."}
          </p>
          <div className="flex flex-col gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold hover:bg-secondary">
              <FileUp className="h-4 w-4" />
              <span>Upload file</span>
              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setUploadSelected(true);
                  }
                }}
              />
            </label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                disabled={!uploadSelected}
                onClick={() => {
                  setAssignmentSubmitted(true);
                  onReadyForContinue?.(true);
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit
              </Button>
              {assignmentSubmitted && (
                <span className="text-xs text-emerald-600">Submitted.</span>
              )}
            </div>
            {!assignmentSubmitted && (
              <p className="text-xs text-muted-foreground">
                Upload and submit to unlock continue.
              </p>
            )}
          </div>
        </div>
      )}

      {lesson.type === "assignment" && (
        <div className="rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <p className="text-sm font-semibold">Scoring & feedback</p>
          {lesson.score ? (
            <p className="mt-2 text-sm">Latest score: {lesson.score}/100</p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Score will appear once graded.
            </p>
          )}
          {lesson.status === "completed" && (
            <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Marked as completed
            </div>
          )}
        </div>
      )}
    </div>
  );
}
