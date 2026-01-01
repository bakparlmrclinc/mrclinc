import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              MrClinc
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Antalya-based pathway coordination platform connecting UK patients with Turkish healthcare providers.
            </p>
            <p className="mt-4 text-gray-500 text-xs">
              We coordinate pathways only. We do not provide medical advice, diagnosis, or treatment.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#aesthetic" className="text-gray-400 hover:text-white transition-colors">
                  Aesthetic Surgery
                </Link>
              </li>
              <li>
                <Link href="/services#cancer" className="text-gray-400 hover:text-white transition-colors">
                  Cancer Surgery
                </Link>
              </li>
              <li>
                <Link href="/services#general" className="text-gray-400 hover:text-white transition-colors">
                  General Surgery
                </Link>
              </li>
              <li>
                <Link href="/services#second-opinion" className="text-gray-400 hover:text-white transition-colors">
                  Free Second Opinion
                </Link>
              </li>
            </ul>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Patients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/why-antalya" className="text-gray-400 hover:text-white transition-colors">
                  Why Antalya
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white transition-colors">
                  Submit Request
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-400 hover:text-white transition-colors">
                  Track Request
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & PD */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="text-gray-400">
                info@mrclinc.com
              </li>
            </ul>

            <h3 className="font-semibold text-white mt-6 mb-4">For PDs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pd" className="text-gray-400 hover:text-white transition-colors">
                  Become a PD
                </Link>
              </li>
              <li>
                <Link href="/pd/login" className="text-gray-400 hover:text-white transition-colors">
                  PD Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} MrClinc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
