import { Suspense } from "react";
import DashboardClientView from "./dashboard-client-view";

export const metadata = {
  title: "Client Portal & Sessions | Bhagyashree Counselling",
  description: "Access your upcoming therapy sessions, joining links, rescheduling, and payment receipts.",
};

export default function DashboardPage() {
  return (
    <div className="py-10 md:py-14">
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 text-xs text-[#5C6B64]">Loading client dashboard...</div>}>
        <DashboardClientView />
      </Suspense>
    </div>
  );
}
