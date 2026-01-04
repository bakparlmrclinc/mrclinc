import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  requireAuth,
  canEditCases,
  shouldMaskPII,
  maskEmail,
  maskPhone,
} from "@/lib/auth";
import CaseHeader from "./CaseHeader";
import CaseRequestSummary from "./CaseRequestSummary";
import CaseAssignment from "./CaseAssignment";
import CaseChannelProvider from "./CaseChannelProvider";
import CaseDocumentFlow from "./CaseDocumentFlow";
import CaseTimeline from "./CaseTimeline";
import CaseContactLog from "./CaseContactLog";
import CaseEscalations from "./CaseEscalations";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth();
  const { id } = await params;
  const canEdit = canEditCases(user.role);
  const maskPII = shouldMaskPII(user.role);

  const caseData = await prisma.case.findUnique({
    where: { id },
    include: {
      assignedPd: {
        select: { id: true, pdCode: true, fullName: true, city: true },
      },
      channel: { select: { id: true, name: true, city: true } },
      provider: { select: { id: true, displayName: true } },
      statusHistory: {
        include: { changedBy: { select: { name: true } } },
        orderBy: { changedAt: "desc" },
      },
      escalations: {
        include: {
          createdBy: { select: { name: true } },
          resolvedBy: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      contactLogs: {
        include: { adminActor: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!caseData) {
    notFound();
  }

  // Get available PDs and channels for assignment
  const [pds, channels, pools] = await Promise.all([
    prisma.pD.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, pdCode: true, fullName: true, city: true },
      orderBy: { fullName: "asc" },
    }),
    prisma.clinicalChannel.findMany({
      where: { status: "ACTIVE" },
      include: { providers: { where: { status: "ACTIVE" } } },
      orderBy: { name: "asc" },
    }),
    prisma.pool.findMany({
      where: { isActive: true },
      select: { id: true, city: true },
    }),
  ]);

  // Get pool backlog for this city
  const poolBacklog = caseData.poolCity
    ? await prisma.case.count({
        where: {
          poolCity: caseData.poolCity,
          assignedPdId: null,
          status: { notIn: ["completed", "closed"] },
        },
      })
    : 0;

  // Apply PII masking
  const displayCase = {
    ...caseData,
    patientEmail: maskPII ? maskEmail(caseData.patientEmail) : caseData.patientEmail,
    patientPhone: maskPII ? maskPhone(caseData.patientPhone) : caseData.patientPhone,
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <CaseHeader caseData={displayCase} canEdit={canEdit} userId={user.id} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Main info */}
        <div className="lg:col-span-2 space-y-6">
          <CaseRequestSummary caseData={displayCase} />
          <CaseTimeline history={caseData.statusHistory} />
          <CaseContactLog
            caseId={caseData.id}
            logs={caseData.contactLogs}
            canEdit={canEdit}
            userId={user.id}
          />
        </div>

        {/* Right column - Actions */}
        <div className="space-y-6">
          <CaseAssignment
            caseData={caseData}
            pds={pds}
            pools={pools}
            poolBacklog={poolBacklog}
            canEdit={canEdit}
            userId={user.id}
          />
          <CaseChannelProvider
            caseData={caseData}
            channels={channels}
            canEdit={canEdit}
            userId={user.id}
          />
          <CaseDocumentFlow
            caseData={caseData}
            canEdit={canEdit}
            userId={user.id}
          />
          <CaseEscalations
            caseId={caseData.id}
            escalations={caseData.escalations}
            canEdit={canEdit}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  );
}
