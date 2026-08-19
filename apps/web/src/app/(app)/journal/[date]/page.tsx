export default async function JournalDayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return (
    <main className="dotted-grid min-h-screen p-8">
      <p className="text-ink-soft">Journal page for {date} — coming in Phase 1.</p>
    </main>
  );
}
