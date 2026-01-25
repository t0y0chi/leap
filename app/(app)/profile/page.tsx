import Link from "next/link";
import { Edit, Mail, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { learnerProfile } from "@/lib/mock-data";
import { formatFullName, getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const fullName = formatFullName(learnerProfile);
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm text-muted-foreground">Your learner identity.</p>
        </div>
        <Link
          href="/profile/edit"
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
            src={learnerProfile.avatar}
            alt={fullName}
            className="h-16 w-16"
            fallback={getInitials(learnerProfile)}
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold">{fullName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {learnerProfile.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {learnerProfile.phone}
            </div>
            <Badge variant="secondary" className="mt-2">
              {learnerProfile.role}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
