import Link from "next/link";
import { Send } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminInvitePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Invite admin</h1>
          <p className="text-sm text-muted-foreground">
            Send a secure invitation to a reviewer or workspace owner.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/admins/invitations">View invitations</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invitation</CardTitle>
          <CardDescription>Define scope and send a short welcome note.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="reviewer@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" placeholder="Reviewer / Workspace Admin" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Welcome aboard! We will align on rubric updates this week."
            />
          </div>
          <div className="flex gap-2">
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send invite
            </Button>
            <Button variant="outline">Copy invite link</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
