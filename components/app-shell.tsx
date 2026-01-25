"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BookOpen, LayoutDashboard, MessageCircle, User } from "lucide-react";

import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "https://example.com", label: "Q&A", icon: MessageCircle, external: true },
];

interface AppShellProps {
  children: React.ReactNode;
  activePath?: string;
}

export function AppShell({ children, activePath }: AppShellProps) {
  const pathname = usePathname();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentPath = activePath ?? pathname ?? "";

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              LEAP
            </div>
            <div className="leading-tight">
              <p>LEAP</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !item.external && currentPath.startsWith(item.href);
              const linkClassName = cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                isActive && "bg-secondary text-foreground",
              );

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={linkClassName}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.href} href={item.href} className={linkClassName}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {item.href === "/notifications" && unreadCount > 0 && (
                    <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition hover:bg-secondary"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-secondary"
            >
              <Avatar
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
                alt="Learner avatar"
                className="h-9 w-9"
                fallback="AC"
              />
              <div className="hidden text-left text-sm leading-tight md:block">
                <p className="font-semibold">Alex Carter</p>
                <span className="text-xs text-muted-foreground">Annotator</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
