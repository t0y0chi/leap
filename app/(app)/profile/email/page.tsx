'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { learnerProfile } from "@/lib/mock-data";

export default function ChangeEmailPage() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/profile/edit"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to edit profile
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change email</CardTitle>
          <CardDescription>Use a dedicated email for course updates and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="currentEmail">Current email</Label>
              <Input id="currentEmail" name="currentEmail" type="email" defaultValue={learnerProfile.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">New email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailConfirmation">Confirm new email</Label>
              <Input
                id="emailConfirmation"
                name="emailConfirmation"
                type="email"
                placeholder="Re-enter your new email"
                required
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancel
              </Link>
              <Button type="submit" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save email"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
