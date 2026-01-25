'use client';

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import { ArrowLeft, Camera, Save } from "lucide-react";

import "react-phone-number-input/style.css";

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
import { formatFullName, getInitials } from "@/lib/utils";

export default function EditProfilePage() {
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(learnerProfile.avatar);
  const [phone, setPhone] = useState<string | undefined>(learnerProfile.phone);
  const fullName = formatFullName(learnerProfile);

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
                  <Avatar
                    src={avatarPreview}
                    alt={fullName}
                    className="h-14 w-14"
                    fallback={getInitials(learnerProfile)}
                  />
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
            <div className="space-y-2">
              <Label>Full name</Label>
              <div className="grid gap-2 sm:grid-cols-3">
                <Input id="givenName" name="givenName" defaultValue={learnerProfile.givenName} />
                <Input id="middleName" name="middleName" defaultValue={learnerProfile.middleName} />
                <Input id="familyName" name="familyName" defaultValue={learnerProfile.familyName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <PhoneInput
                id="phone"
                name="phone"
                defaultCountry="US"
                international
                value={phone}
                onChange={setPhone}
                className="flex gap-2"
                numberInputProps={{
                  className:
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  inputMode: "tel",
                  autoComplete: "tel",
                }}
                countrySelectProps={{
                  className:
                    "h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                }}
                placeholder="+1 415 555 0123"
                required
              />
            </div>
            <div className="rounded-lg border border-dashed p-4 text-sm">
              <p className="font-semibold">Account security</p>
              <p className="mt-1 text-muted-foreground">
                Update email address and password on their dedicated screens.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/profile/email" className="text-primary hover:underline">
                  Change email
                </Link>
                <Link href="/profile/password" className="text-primary hover:underline">
                  Change password
                </Link>
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
