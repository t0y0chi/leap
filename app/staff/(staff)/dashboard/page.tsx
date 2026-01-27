import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Staff dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track course readiness, grading backlog, and learner health.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/staff/courses/new">Create course</Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
