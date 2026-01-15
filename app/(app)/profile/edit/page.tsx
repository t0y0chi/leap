'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Avatar } from "@/components/ui/avatar";

export default function EditProfilePage() {
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(learnerProfile.avatar);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>
        <Badge variant="secondary">Mock mode</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
          <CardDescription>Update your basic details. Changes are not persisted in mock mode.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex cursor-pointer">
                  <Avatar src={avatarPreview} alt="Avatar" className="h-14 w-14" fallback="AC" />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const url = e.target?.result?.toString();
                          if (url) setAvatarPreview(url);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground shadow">
                    <Camera className="h-3 w-3" />
                  </span>
                </label>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" defaultValue={learnerProfile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={learnerProfile.email} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancel
              </Link>
              <Button type="submit" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
