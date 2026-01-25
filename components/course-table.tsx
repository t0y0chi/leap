'use client';
/* eslint react-hooks/incompatible-library: "off" */

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Clock, PlayCircle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { type Course, type EnrollmentStatus } from "@/lib/mock-data";

type CourseTableRow = Course & {
  progressPct: number;
  status: EnrollmentStatus;
};

const columns: ColumnDef<CourseTableRow>[] = [
  {
    accessorKey: "title",
    header: "Course",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div>
          <div className="font-semibold text-foreground">{course.title}</div>
          <p className="text-sm text-muted-foreground">
            {course.category}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "progressPct",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("progressPct") as number;
      return (
        <div className="w-32">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progress}%</span>
            <span>{progress < 100 ? "In progress" : "Done"}</span>
          </div>
          <Progress value={progress} className="mt-1.5" />
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        {row.getValue("duration") as string}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "completed"
              ? "success"
              : status === "in-progress"
                ? "secondary"
                : "outline"
          }
          className="capitalize"
        >
          {status.replace("-", " ")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <PlayCircle className="h-4 w-4" />
          Resume
        </Link>
      );
    },
  },
];

interface CourseTableProps {
  data: CourseTableRow[];
}

export function CourseTable({ data }: CourseTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    cell.column.id === "actions" ? "text-right" : "",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No courses yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
