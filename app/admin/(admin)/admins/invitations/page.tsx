"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock3, MoreHorizontal } from "lucide-react";

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
import { cn } from "@/lib/utils";

export default function AdminInvitationsPage() {
  const [teamMembers, setTeamMembers] = useState(adminTeam);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const canDelete = teamMembers.length > 1;
  const [inviteTab, setInviteTab] = useState<"all" | "pending" | "accepted" | "expired">("all");

  const toggleMenu = (memberId: string) => {
    setOpenMenuId((prev) => (prev === memberId ? null : memberId));
  };

  const handleDelete = (memberId: string) => {
    if (!canDelete) return;
    const member = teamMembers.find((item) => item.id === memberId);
    if (!member) return;
    const confirmed = window.confirm(`Delete ${member.name}? This cannot be undone.`);
    if (!confirmed) return;
    setTeamMembers((prev) => prev.filter((member) => member.id !== memberId));
    setOpenMenuId(null);
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "accepted", label: "Accepted" },
    { id: "expired", label: "Expired" },
  ] as const;

  const filteredInvites =
    inviteTab === "all"
      ? adminInvites
      : adminInvites.filter((invite) => invite.status === inviteTab);

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
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{member.name}</div>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.status === "active" ? "success" : "warning"}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-0">
                    <div
                      className="relative flex justify-end px-4 py-3"
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                          setOpenMenuId(null);
                        }
                      }}
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleMenu(member.id)}
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === member.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open actions</span>
                      </Button>
                      {openMenuId === member.id && (
                        <div
                          role="menu"
                          className="absolute right-4 top-12 z-10 w-40 rounded-md border bg-background p-1 text-sm shadow-md"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            className={cn(
                              "w-full rounded px-3 py-2 text-left text-sm font-semibold transition",
                              canDelete
                                ? "text-destructive hover:bg-destructive/10"
                                : "cursor-not-allowed text-muted-foreground",
                            )}
                            onClick={() => handleDelete(member.id)}
                            disabled={!canDelete}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </TableCell>
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
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setInviteTab(tab.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  inviteTab === tab.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-secondary",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredInvites.map((invite) => (
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
              </div>
            </div>
          ))}
          {filteredInvites.length === 0 && (
            <div className="flex items-center gap-2 rounded-lg border bg-secondary p-3 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              <span>No invitations in this tab.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
