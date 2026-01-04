import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Link href="/">
            <img src="/images/logo.svg" alt="MrClinc" className="h-12 w-auto mx-auto" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-gray-400">404</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="primary">
                Go to Homepage
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-primary-600 hover:underline">
              Services
            </Link>
            <Link href="/how-it-works" className="text-primary-600 hover:underline">
              How It Works
            </Link>
            <Link href="/faq" className="text-primary-600 hover:underline">
              FAQ
            </Link>
            <Link href="/pd/login" className="text-primary-600 hover:underline">
              PD Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
