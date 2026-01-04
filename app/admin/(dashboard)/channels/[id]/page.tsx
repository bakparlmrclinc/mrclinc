// app/admin/(dashboard)/channels/[id]/page.tsx
// Clinical Channel Detail & Edit

import { prisma } from "@/lib/db";
import { requireAuth, canEditChannels } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChannelForm } from "./ChannelForm";
import { ProvidersList } from "./ProvidersList";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChannelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const user = await requireAuth();
  const canEdit = canEditChannels(user.role);

  // Handle "new" route
  if (id === "new") {
    if (!canEdit) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">You do not have permission to create channels.</p>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/channels"
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            New Clinical Channel
          </h1>
        </div>
        <ChannelForm channel={null} canEdit={true} />
      </div>
    );
  }

  const channel = await prisma.clinicalChannel.findUnique({
    where: { id },
    include: {
      providers: {
        orderBy: { displayName: "asc" },
      },
      cases: {
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          trackingCode: true,
          patientName: true,
          status: true,
          createdAt: true,
        },
      },
      _count: {
        select: { cases: true },
      },
    },
  });

  if (!channel) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/channels"
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {channel.name}
            </h1>
            <p className="text-sm text-gray-500">{channel.city}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            channel.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {channel.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <ChannelForm channel={channel} canEdit={canEdit} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Statistics</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Total Cases</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {channel._count.cases}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Providers</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {channel.providers.length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Response SLA</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {channel.responseSlaHours ? `${channel.responseSlaHours} hours` : "Not set"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Recent Cases */}
          {channel.cases.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Recent Cases
              </h3>
              <ul className="space-y-3">
                {channel.cases.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/admin/cases/${c.id}`}
                      className="block hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                    >
                      <div className="text-sm font-medium text-blue-600">
                        {c.trackingCode}
                      </div>
                      <div className="text-xs text-gray-500">
                        {c.patientName} • {c.status}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Providers Section */}
      <ProvidersList
        channelId={channel.id}
        providers={channel.providers}
        canEdit={canEdit}
      />
    </div>
  );
}
