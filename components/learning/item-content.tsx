"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileUp, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type LearningItem } from "@/lib/mock-data";

const typeLabel: Record<LearningItem["type"], string> = {
  lecture: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment",
};

interface ItemContentProps {
  item: LearningItem;
}

export function ItemContent({ item }: ItemContentProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = useMemo(() => {
    if (!checked || !selectedChoice) return null;
    const choice = item.choices?.find((c) => c.id === selectedChoice);
    return choice?.correct ?? false;
  }, [checked, selectedChoice, item.choices]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="neutral">{typeLabel[item.type]}</Badge>
        <span>·</span>
        <span>{item.duration}</span>
      </div>

      {item.type === "lecture" && item.videoUrl ? (
        <div className="overflow-hidden rounded-lg border bg-black/80">
          <iframe
            title={item.title}
            src={item.videoUrl}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      {item.type === "reading" && (
        <div className="space-y-2 rounded-lg border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Reading</p>
          <p>{item.readingText ?? item.content}</p>
        </div>
      )}

      {item.type === "quiz" && item.questionType === "multiple-choice" && (
        <div className="space-y-3 rounded-lg border px-4 py-3">
          <p className="text-sm font-semibold">Check your understanding</p>
          <p className="text-sm text-muted-foreground">{item.content}</p>
          <div className="space-y-2">
            {item.choices?.map((choice) => (
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

      {item.type === "assignment" && (
        <div className="space-y-3 rounded-lg border px-4 py-3">
          <p className="text-sm font-semibold">Submission</p>
          <p className="text-sm text-muted-foreground">
            {item.content ?? "Upload your annotated samples for review."}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Upload mock file
            </Button>
            <Button type="button" variant="ghost">
              Mark as submitted
            </Button>
          </div>
        </div>
      )}

      {item.type === "quiz" && item.questionType === "assignment" && (
        <div className="space-y-2 rounded-lg border px-4 py-3 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Upload your work</p>
          <p>{item.content}</p>
        </div>
      )}

      <div className="rounded-lg border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-sm font-semibold">Scoring & feedback</p>
        {item.score ? (
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-amber-500" />
            Latest score: {item.score}/100
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Score will appear once graded.
          </p>
        )}
        {item.status === "completed" && (
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Marked as completed
          </div>
        )}
      </div>
    </div>
  );
}
