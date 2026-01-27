"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Choice = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  correctChoiceId?: string;
};

const makeId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

const createChoice = (id?: string): Choice => ({
  id: id ?? makeId(),
  text: "",
});

const createQuestion = (id?: string): Question => ({
  id: id ?? makeId(),
  prompt: "",
  choices: [createChoice(), createChoice(), createChoice(), createChoice()],
  correctChoiceId: undefined,
});

const createInitialQuestion = (): Question => ({
  id: "question-1",
  prompt: "",
  choices: [
    createChoice("question-1-choice-1"),
    createChoice("question-1-choice-2"),
    createChoice("question-1-choice-3"),
    createChoice("question-1-choice-4"),
  ],
  correctChoiceId: undefined,
});

const choiceLabel = (index: number) => {
  const letter = String.fromCharCode(65 + (index % 26));
  return `Choice ${letter}`;
};

export default function QuizEditClient() {
  const [questions, setQuestions] = useState<Question[]>(() => [createInitialQuestion()]);
  const hasMultipleQuestions = questions.length > 1;

  const questionIndex = useMemo(
    () => new Map(questions.map((question, index) => [question.id, index + 1])),
    [questions]
  );

  const updateQuestion = (id: string, updater: (question: Question) => Question) => {
    setQuestions((prev) => prev.map((question) => (question.id === id ? updater(question) : question)));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createQuestion()]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((question) => question.id !== id);
    });
  };

  const addChoice = (questionId: string) => {
    updateQuestion(questionId, (question) => ({
      ...question,
      choices: [...question.choices, createChoice()],
    }));
  };

  const removeChoice = (questionId: string, choiceId: string) => {
    updateQuestion(questionId, (question) => {
      if (question.choices.length === 1) return question;
      const nextChoices = question.choices.filter((choice) => choice.id !== choiceId);
      const nextCorrect = question.correctChoiceId === choiceId ? undefined : question.correctChoiceId;
      return {
        ...question,
        choices: nextChoices,
        correctChoiceId: nextCorrect,
      };
    });
  };

  const updateChoiceText = (questionId: string, choiceId: string, text: string) => {
    updateQuestion(questionId, (question) => ({
      ...question,
      choices: question.choices.map((choice) =>
        choice.id === choiceId ? { ...choice, text } : choice
      ),
    }));
  };

  const updatePrompt = (questionId: string, prompt: string) => {
    updateQuestion(questionId, (question) => ({
      ...question,
      prompt,
    }));
  };

  const setCorrectChoice = (questionId: string, choiceId: string) => {
    updateQuestion(questionId, (question) => ({
      ...question,
      correctChoiceId: choiceId,
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Questions</h2>
        <p className="text-sm text-muted-foreground">Add questions and select one correct answer.</p>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4 rounded-lg border bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">
                Question {questionIndex.get(question.id) ?? 1}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!hasMultipleQuestions}
                onClick={() => removeQuestion(question.id)}
              >
                Remove
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`prompt-${question.id}`}>Question prompt</Label>
              <Textarea
                id={`prompt-${question.id}`}
                name={`prompt-${question.id}`}
                rows={4}
                value={question.prompt}
                placeholder="Enter the question prompt"
                onChange={(event) => updatePrompt(question.id, event.target.value)}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Answer choices</p>
              <div className="space-y-3">
                {question.choices.map((choice, index) => (
                  <div
                    key={choice.id}
                    className={cn(
                      "space-y-2 rounded-lg border p-3",
                      choice.id === question.correctChoiceId
                        ? "border-emerald-400 bg-emerald-50"
                        : "bg-white"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={choice.id === question.correctChoiceId}
                          onChange={() => setCorrectChoice(question.id, choice.id)}
                        />
                        {choiceLabel(index)}
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={question.choices.length === 1}
                        onClick={() => removeChoice(question.id, choice.id)}
                      >
                        Remove
                      </Button>
                    </div>
                    <Input
                      value={choice.text}
                      placeholder="Choice text"
                      onChange={(event) => updateChoiceText(question.id, choice.id, event.target.value)}
                    />
                  </div>
                ))}
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => addChoice(question.id)}>
                + Add choice
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={addQuestion}>
          + Add question
        </Button>
      </div>
    </div>
  );
}
