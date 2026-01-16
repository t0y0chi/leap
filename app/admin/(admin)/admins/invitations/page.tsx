import Link from "next/link";
import { Check, Clock3, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminInvites, adminTeam } from "@/lib/admin-data";

export default function AdminInvitationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Admin invitations</h1>
          <p className="text-sm text-muted-foreground">
            Track invites and active admins in the workspace.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/admins/invite">Invite admin</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle>Active admins</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-4 w-4" />
            Workspace roles
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminTeam.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{member.name}</div>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{member.role}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "active" ? "success" : "warning"}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{member.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invitations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {adminInvites.map((invite) => (
            <div
              key={invite.token}
              className="flex flex-col gap-2 rounded-lg border bg-white p-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-foreground">{invite.email}</p>
                <p className="text-xs text-muted-foreground">
                  {invite.role} · Sent {invite.sentAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    invite.status === "accepted"
                      ? "success"
                      : invite.status === "pending"
                        ? "warning"
                        : "outline"
                  }
                >
                  {invite.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{invite.expiresAt}</span>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/invitations/${invite.token}`}>Open</Link>
                </Button>
              </div>
            </div>
          ))}
          {adminInvites.length === 0 && (
            <div className="flex items-center gap-2 rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              <span>No invitations yet.</span>
            </div>
          )}
          <div className="rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Use invites for auditability—avoid sharing logins.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
