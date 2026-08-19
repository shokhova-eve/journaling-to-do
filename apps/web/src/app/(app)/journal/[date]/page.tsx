import { JournalDayView } from "@/components/journal/JournalDayView";

export default async function JournalDayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return <JournalDayView dateISO={date} />;
}
