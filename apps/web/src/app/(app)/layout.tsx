import { Sidebar } from "@/components/layout/Sidebar";
import { SessionGuard } from "@/components/layout/SessionGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </SessionGuard>
  );
}
