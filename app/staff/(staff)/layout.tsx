import { StaffShell } from "@/components/staff-shell";
import { SonnerToaster } from "@/components/ui/sonner";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StaffShell>
      {children}
      <SonnerToaster />
    </StaffShell>
  );
}
