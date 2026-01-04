import { LegalLayout } from "@/components/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="January 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          This Cookie Policy explains how the MrClinc platform uses cookies and similar technologies.
        </p>
        <p className="text-gray-600">
          MrClinc is committed to protecting your privacy and being transparent about the technologies we use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. What Are Cookies</h2>
        <p className="text-gray-600">
          Cookies are small text files stored on your device when you visit a website. They help the website function properly and can provide information to the site owner.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Cookies</h2>
        <p className="text-gray-600 mb-4">MrClinc uses cookies for the following purposes only:</p>
        
        <h3 className="text-lg font-medium text-gray-800 mb-3">3.1 Essential Cookies</h3>
        <p className="text-gray-600 mb-3">These cookies are necessary for the platform to function. They enable:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
          <li>User authentication and session management</li>
          <li>Security features</li>
          <li>Basic platform functionality</li>
        </ul>
        <p className="text-gray-600 mb-6">
          These cookies cannot be disabled without affecting platform functionality.
        </p>

        <h3 className="text-lg font-medium text-gray-800 mb-3">3.2 Analytics Cookies</h3>
        <p className="text-gray-600 mb-3">We use basic analytics to understand how the platform is used. This includes:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Traffic-level data (page views, visit duration)</li>
          <li>General geographic region</li>
          <li>Device type and browser</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. What We Do NOT Do</h2>
        <p className="text-gray-600 mb-3">MrClinc does not use cookies for:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Profiling or behavioural tracking</li>
          <li>Advertising or remarketing</li>
          <li>Cross-platform tracking</li>
          <li>Selling data to third parties</li>
          <li>Building user profiles</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Third-Party Cookies</h2>
        <p className="text-gray-600 mb-3">We may use third-party analytics services. These services:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Do not track you across other websites</li>
          <li>Do not build advertising profiles</li>
          <li>Process data in accordance with applicable privacy laws</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Choices</h2>
        <p className="text-gray-600">
          You can control cookies through your browser settings. Note that disabling essential cookies may affect platform functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Consent</h2>
        <p className="text-gray-600 mb-4">
          By using the MrClinc platform, you consent to the use of essential cookies.
        </p>
        <p className="text-gray-600">
          For analytics cookies, we will request your consent where required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
        <p className="text-gray-600">
          This Cookie Policy may be updated to reflect changes in technology or regulatory requirements. The most recent version will be available on the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact</h2>
        <p className="text-gray-600 mb-2">
          For questions about cookies: <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">info@mrclinc.com</a>
        </p>
        <p className="text-sm text-gray-500">
          This email address is actively monitored. We aim to respond within 5 business days.
        </p>
      </section>
    </LegalLayout>
  );
}
