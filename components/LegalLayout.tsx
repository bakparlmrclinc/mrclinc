import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <img src="/images/logo.svg" alt="MR.CLINC" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {lastUpdated}</p>
          
          <div className="prose prose-gray max-w-none">
            {children}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-4 max-w-2xl mx-auto">
              MrClinc is a healthcare pathway coordination platform. MrClinc does not provide medical advice, 
              recommend doctors or clinics, guarantee outcomes, or discuss pricing. All medical decisions are 
              made between the patient and the healthcare provider. MrClinc does not act as an agent, broker, 
              or referral service.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <Link href="/terms" className="hover:text-gray-700">Terms of Use</Link>
              <span className="text-gray-300">|</span>
              <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
              <span className="text-gray-300">|</span>
              <Link href="/cookies" className="hover:text-gray-700">Cookie Policy</Link>
              <span className="text-gray-300">|</span>
              <Link href="/complaints" className="hover:text-gray-700">Complaints</Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              © {new Date().getFullYear()} MR.CLINC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
