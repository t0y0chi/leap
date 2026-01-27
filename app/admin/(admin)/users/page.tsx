"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutGrid, List, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { adminLearners } from "@/lib/admin-data";

export default function AdminUsersPage() {
  const [view, setView] = useState<"table" | "cards">("table");
  const renderStars = (value: number) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < value;
        return (
          <Star
            key={`${value}-${index}`}
            className={
              filled
                ? "h-3.5 w-3.5 text-amber-500 fill-amber-500"
                : "h-3.5 w-3.5 text-muted-foreground/40"
            }
          />
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            View learner enrollment and progress.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold">Learners</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-md border bg-background p-1">
              <Button
                type="button"
                size="sm"
                variant={view === "table" ? "secondary" : "ghost"}
                onClick={() => setView("table")}
              >
                <List className="mr-1 h-4 w-4" />
                Table
              </Button>
              <Button
                type="button"
                size="sm"
                variant={view === "cards" ? "secondary" : "ghost"}
                onClick={() => setView("cards")}
              >
                <LayoutGrid className="mr-1 h-4 w-4" />
                Cards
              </Button>
            </div>
          </div>
        </div>
        {view === "table" ? (
          <Table className="rounded-lg border bg-card">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminLearners.map((learner) => (
                  <TableRow key={learner.id}>
                    <TableCell className="p-0">
                      <Link
                        href={`/admin/users/${learner.id}`}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        <div className="h-9 w-9 overflow-hidden rounded-full border bg-secondary">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={learner.avatarUrl}
                            alt={`${learner.name} profile`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{learner.name}</div>
                      <p className="text-xs text-muted-foreground">{learner.email}</p>
                    </div>
                  </Link>
                </TableCell>
                    <TableCell className="p-0 text-sm text-muted-foreground">
                      <Link href={`/admin/users/${learner.id}`} className="block px-4 py-3">
                        {learner.activeCourseTitle}
                      </Link>
                    </TableCell>
                    <TableCell className="w-36 p-0">
                      <Link href={`/admin/users/${learner.id}`} className="block px-4 py-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{Math.round(learner.progress * 100)}%</span>
                        </div>
                        <Progress value={learner.progress * 100} className="mt-1" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {adminLearners.map((learner) => (
                <Link
                  key={learner.id}
                  href={`/admin/users/${learner.id}`}
                  className="group flex h-full flex-col gap-4 rounded-lg border bg-card p-4 transition hover:border-foreground/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full border bg-secondary">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={learner.avatarUrl}
                        alt={`${learner.name} profile`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{learner.name}</div>
                      <p className="text-xs text-muted-foreground">{learner.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Active course</p>
                    <p className="text-sm font-medium text-foreground">
                      {learner.activeCourseTitle}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{Math.round(learner.progress * 100)}%</span>
                    </div>
                    <Progress value={learner.progress * 100} className="mt-1" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Evaluation
                    </p>
                    <div className="space-y-2">
                      {learner.evaluations.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-3 text-xs"
                        >
                          <span className="text-muted-foreground">{item.label}</span>
                          {renderStars(item.value)}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
