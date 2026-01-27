"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Reply = {
  id: string;
  author: string;
  body: string;
};

const currentUser = "Staff";

export function RepliesClient({ initialReplies }: { initialReplies: Reply[] }) {
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [draft, setDraft] = useState("");

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    const nextReply: Reply = {
      id: `local-${Date.now()}`,
      author: currentUser,
      body: trimmed,
    };

    setReplies((prev) => [nextReply, ...prev]);
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold">Reply as staff</p>
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write an official response..."
          className="min-h-[120px]"
        />
        <div className="flex justify-end">
          <Button type="button" onClick={handleSubmit} disabled={!draft.trim()}>
            Post reply
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Replies ({replies.length})</p>
        </div>

        {replies.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No replies yet.
          </div>
        ) : (
          <div className="space-y-3">
            {replies.map((reply) => (
              <div key={reply.id} className="rounded-lg border bg-white p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold">{reply.author}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{reply.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
