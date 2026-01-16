import { BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Course and grading analytics will live here. Coming soon.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3 rounded-lg border border-dashed bg-secondary p-6 text-sm text-muted-foreground">
          <BarChart3 className="h-5 w-5" />
          <span>We will add throughput, SLA, and quality trend reports in this panel.</span>
        </CardContent>
      </Card>
    </div>
  );
}
