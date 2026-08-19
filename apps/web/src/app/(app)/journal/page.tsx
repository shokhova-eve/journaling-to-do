import { redirect } from "next/navigation";
import { todayISO } from "@/lib/date";

export default function JournalIndexPage() {
  redirect(`/journal/${todayISO()}`);
}
