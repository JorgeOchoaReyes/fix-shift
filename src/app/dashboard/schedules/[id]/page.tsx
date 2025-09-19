import React from "react";
import { useSearchParams } from "next/navigation";

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("id");

  

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-primary">Schedule Details</h1>
        <p className="text-muted-foreground">This is a placeholder for schedule details page.</p>
      </div>
    </div>
  );
}