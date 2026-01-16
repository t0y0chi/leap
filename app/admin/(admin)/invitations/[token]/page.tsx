import { notFound } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminInvites } from "@/lib/admin-data";

export default async function AdminInvitationAcceptPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = adminInvites.find((entry) => entry.token === token);
  if (!invite) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Invitation</h1>
          <p className="text-sm text-muted-foreground">
            Accept access to the LEAP admin workspace.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/admins/invitations">Back to invitations</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CardTitle>{invite.email}</CardTitle>
            <Badge variant="outline">{invite.role}</Badge>
            <Badge
              variant={
                invite.status === "accepted"
                  ? "success"
                  : invite.status === "pending"
                    ? "warning"
                    : "neutral"
              }
            >
              {invite.status}
            </Badge>
          </div>
          <CardDescription>
            Sent {invite.sentAt}. {invite.expiresAt === "accepted" ? "Already accepted." : `Expires ${invite.expiresAt}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Admins can grade, manage courses, and invite other reviewers.</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled={invite.status !== "pending"}>Accept invitation</Button>
            <Button variant="outline">Decline</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
