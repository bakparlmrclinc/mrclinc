import Link from "next/link";

interface PublicPDDocLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PublicPDDocLayout({ title, children }: PublicPDDocLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/images/logo.svg" alt="MR.CLINC" className="h-10 w-auto" />
          </Link>
          <Link 
            href="/pd" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to PD Program
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>
          
          <div className="prose prose-gray max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
