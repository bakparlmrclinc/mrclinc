import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<<<<<<< HEAD
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column - Takes 2 cols on lg */}
            <div className="lg:col-span-2">
              {/* Logo on light surface for visibility - mobile: 52px, desktop: 62px (+30%) */}
              <Link href="/" className="inline-block">
                <div className="bg-white rounded-lg p-3 inline-block">
                  <img
                    src="/images/logo.svg"
                    alt="MrClinc"
                    className="h-[52px] md:h-[62px] w-auto"
                  />
                </div>
              </Link>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
                Antalya-based pathway coordination platform connecting UK patients with Turkish healthcare providers.
              </p>
              {/* CTA */}
              <Link 
                href="/apply"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Submit Your Request
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2.5 text-sm">
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
              <ul className="space-y-2.5 text-sm">
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

            {/* Contact & PDs */}
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2.5 text-sm">
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
              <ul className="space-y-2.5 text-sm">
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
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Disclaimer - 16px top padding, content separated */}
        <div className="py-4">
          <p className="text-gray-500 text-xs text-center max-w-3xl mx-auto leading-relaxed">
            MrClinc coordinates pathways only. We do not provide medical advice, diagnosis, or treatment. 
            All medical decisions are made directly between patients and healthcare providers.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Copyright - 24px bottom padding */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Logo icon with invert for visibility on dark bg */}
              <img
                src="/images/logo-icon.svg"
                alt="MrClinc"
                className="h-5 w-5 brightness-0 invert opacity-50"
              />
              <p className="text-gray-500 text-sm">
                © {currentYear} MrClinc. All rights reserved.
              </p>
            </div>
=======
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
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
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
