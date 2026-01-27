import Link from "next/link";
import { Edit, Mail } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { adminProfile } from "@/lib/staff-data";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("");

export default function StaffProfilePage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Staff profile</h1>
          <p className="text-sm text-muted-foreground">Your staff account details.</p>
        </div>
        <Link
          href="/staff/profile/edit"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold hover:bg-secondary"
        >
          <Edit className="h-4 w-4" />
          Edit profile
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Basic information</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-6">
          <Avatar
            src={adminProfile.avatarUrl}
            alt={adminProfile.name}
            className="h-16 w-16"
            fallback={getInitials(adminProfile.name)}
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold">{adminProfile.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {adminProfile.email}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
