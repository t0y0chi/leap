export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            LEAP
          </div>
          <div className="text-left">
            <p className="text-lg font-semibold">LEAP</p>
            <p className="text-xs text-muted-foreground">Annotation training</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
