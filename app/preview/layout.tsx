export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="relative pb-14">{children}</div>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-4 py-3 text-center text-xs font-semibold text-muted-foreground backdrop-blur">
        Preview mode — this is how learners see the course.
      </div>
    </div>
  );
}
