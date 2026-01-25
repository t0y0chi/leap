"use client";

import { useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EvaluationScore = {
  label: string;
  value: number;
};

type EvaluationRadarClientProps = {
  scores: EvaluationScore[];
};

const clampScore = (value: number) => Math.min(5, Math.max(1, value));

export default function EvaluationRadarClient({ scores }: EvaluationRadarClientProps) {
  const initialValues = useMemo(
    () =>
      scores.map((score) => ({
        ...score,
        value: clampScore(score.value),
      })),
    [scores]
  );
  const [values, setValues] = useState<EvaluationScore[]>(() => initialValues);

  const chartData = useMemo(
    () => values.map((score) => ({ metric: score.label, score: score.value })),
    [values]
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
      <div className="flex h-full items-stretch">
        <div className="flex h-full w-full items-center justify-center rounded-lg border bg-secondary p-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius="75%">
              <PolarGrid stroke="#d9dee6" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "#334155" }} />
              <PolarRadiusAxis
                angle={90}
                domain={[1, 5]}
                tickCount={5}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                stroke="#e2e8f0"
              />
              <Radar
                dataKey="score"
                stroke="#10b981"
                fill="rgba(16, 185, 129, 0.25)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex h-full flex-col justify-center space-y-3">
        {values.map((score, index) => (
          <div
            key={score.label}
            className="rounded-lg border bg-white px-3 py-2"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">{score.label}</div>
              <Badge variant="outline">{score.value}/5</Badge>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={score.value}
                onChange={(event) => {
                  const nextValue = clampScore(Number(event.target.value));
                  setValues((prev) =>
                    prev.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, value: nextValue } : item
                    )
                  );
                }}
                className={cn(
                  "h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200",
                  "accent-emerald-500"
                )}
              />
              <span className="w-6 text-right text-xs text-muted-foreground">{score.value}</span>
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => setValues(initialValues)}>
            Reset
          </Button>
          <Button type="button">Save</Button>
        </div>
      </div>
    </div>
  );
}
