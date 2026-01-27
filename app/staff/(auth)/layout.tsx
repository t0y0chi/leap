export default function StaffAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            S
          </div>
          <div className="text-left">
            <p className="text-lg font-semibold text-slate-900">LEAP Staff</p>
            <p className="text-xs text-muted-foreground">Protected workspace</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
