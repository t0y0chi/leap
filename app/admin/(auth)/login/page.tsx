'use client';

import { useState } from "react";
import Link from "next/link";

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

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin sign-in</CardTitle>
        <CardDescription>
          Two-factor protected entry for reviewers and workspace owners.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Admin email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">One-time code</Label>
            <Input id="otp" name="otp" type="text" inputMode="numeric" placeholder="123456" />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Continue to console"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          Need an account?{" "}
          <Link href="/admin/admins/invite" className="font-semibold text-primary hover:underline">
            Request an invitation
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
