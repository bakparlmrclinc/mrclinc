// app/admin/(dashboard)/cases/export/page.tsx
// Cases Export Page

import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { ExportForm } from "./ExportForm";

export default async function CasesExportPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/cases"
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back to Cases
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Export Cases</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-lg">
        <p className="text-sm text-gray-600 mb-6">
          Export case data as CSV. Select filters to narrow down the export.
        </p>
        <ExportForm />
      </div>
    </div>
  );
}
