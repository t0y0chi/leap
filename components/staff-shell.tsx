"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  CheckSquare,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { adminProfile, adminSubmissions } from "@/lib/staff-data";
import { questions } from "@/lib/mock-data";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  comingSoon?: boolean;
};

const navItems: NavItem[] = [
  { href: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/staff/courses", label: "Courses", icon: BookOpenCheck },
  { href: "/staff/assignments/submissions", label: "Submissions", icon: CheckSquare },
  { href: "/staff/users", label: "Users", icon: Users },
  { href: "/staff/qna", label: "Q&A", icon: MessageCircle },
  { href: "/staff/staff/invitations", label: "Staff", icon: Settings },
];

interface StaffShellProps {
  children: React.ReactNode;
}

export function StaffShell({ children }: StaffShellProps) {
  const pathname = usePathname();
  const pendingSubmissions = adminSubmissions.filter(
    (submission) => submission.submissionStatus === "pending",
  ).length;
  const pendingQnaThreads = questions.filter((question) => !question.answered).length;
  const initials = adminProfile.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("");

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/staff/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-sm">
              S
            </div>
            <div className="leading-tight">
              <p className="text-sm text-muted-foreground">LEAP</p>
              <p className="text-lg font-semibold">Staff Console</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item: NavItem) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/staff/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                    isActive && "bg-secondary text-foreground shadow-sm",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.href === "/staff/assignments/submissions" && pendingSubmissions > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                      {pendingSubmissions}
                    </span>
                  )}
                  {item.href === "/staff/qna" && pendingQnaThreads > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                      {pendingQnaThreads}
                    </span>
                  )}
                  {item.comingSoon && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/staff/profile" className="hidden md:block">
              <Avatar
                src={adminProfile.avatarUrl}
                alt={`${adminProfile.name} profile`}
                fallback={initials}
              />
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
