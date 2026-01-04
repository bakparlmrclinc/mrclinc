// app/admin/(dashboard)/earnings/PayoutActions.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PayoutActionsProps {
  entryId: string;
  currentStatus: string;
}

export function PayoutActions({ entryId, currentStatus }: PayoutActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (loading) return;
    
    const confirmed = confirm(
      `Mark this entry as ${newStatus}?`
    );
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/earnings/${entryId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error("Status update error:", error);
      alert(error instanceof Error ? error.message : "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus === "PAID") {
    return <span className="text-xs text-gray-400">Completed</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {currentStatus === "UNPAID" && (
        <button
          onClick={() => handleStatusChange("SCHEDULED")}
          disabled={loading}
          className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          Schedule
        </button>
      )}
      {(currentStatus === "UNPAID" || currentStatus === "SCHEDULED") && (
        <button
          onClick={() => handleStatusChange("PAID")}
          disabled={loading}
          className="text-xs text-green-600 hover:text-green-800 disabled:opacity-50"
        >
          Mark Paid
        </button>
      )}
    </div>
  );
}
