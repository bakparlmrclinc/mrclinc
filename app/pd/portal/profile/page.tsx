import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import PDPortalHeader from "../PDPortalHeader";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function PDProfilePage() {
  // Server-side session validation
  const session = await getPDSessionFromCookies();
  
  if (!session) {
    redirect("/pd/login");
  }

  // Fetch full PD profile from database
  const pd = await prisma.pD.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      pdCode: true,
      fullName: true,
      email: true,
      phone: true,
      profession: true,
      country: true,
      city: true,
      languages: true,
      status: true,
      verificationState: true,
      createdAt: true,
      casesActiveCount: true,
      casesCompletedCount: true,
    },
  });

  if (!pd || pd.status !== "ACTIVE") {
    redirect("/pd/login");
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PDPortalHeader pdCode={pd.pdCode} pdName={pd.fullName} />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Link
              href="/pd/portal"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/pd/portal/earnings"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Earnings
            </Link>
            <Link
              href="/pd/portal/education"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Education
            </Link>
            <Link
              href="/pd/portal/profile"
              className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium text-sm"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Your account information and settings.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Info */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">PD Code</dt>
                  <dd className="text-sm font-mono font-medium text-gray-900 mt-1">{pd.pdCode}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Full Name</dt>
                  <dd className="text-sm font-medium text-gray-900 mt-1">{pd.fullName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      pd.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}>
                      {pd.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Verification</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      pd.verificationState === "VERIFIED" 
                        ? "bg-green-100 text-green-800" 
                        : pd.verificationState === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {pd.verificationState}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Member Since</dt>
                  <dd className="text-sm text-gray-900 mt-1">{formatDate(pd.createdAt)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900 mt-1">{pd.email || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900 mt-1">{pd.phone || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900 mt-1">{pd.city}, {pd.country}</dd>
                </div>
                {pd.profession && (
                  <div>
                    <dt className="text-sm text-gray-500">Profession</dt>
                    <dd className="text-sm text-gray-900 mt-1">{pd.profession}</dd>
                  </div>
                )}
                {pd.languages && pd.languages.length > 0 && (
                  <div>
                    <dt className="text-sm text-gray-500">Languages</dt>
                    <dd className="text-sm text-gray-900 mt-1">{pd.languages.join(", ")}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Active Cases</dt>
                  <dd className="text-sm font-medium text-gray-900">{pd.casesActiveCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Completed Cases</dt>
                  <dd className="text-sm font-medium text-gray-900">{pd.casesCompletedCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Total Cases</dt>
                  <dd className="text-sm font-medium text-gray-900">{pd.casesActiveCount + pd.casesCompletedCount}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  To update your email or phone number, please contact support.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                >
                  Contact Support
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <Card variant="bordered" className="mt-6">
          <CardHeader>
            <CardTitle>PD Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Access your PD framework documents and agreements.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/pd/docs/agreement"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">PD Agreement</span>
              </Link>
              <Link
                href="/pd/docs/compensation"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Compensation Schedule</span>
              </Link>
              <Link
                href="/pd/docs/conduct"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Code of Conduct</span>
              </Link>
              <Link
                href="/pd/docs/data"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Data Processing Addendum</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
