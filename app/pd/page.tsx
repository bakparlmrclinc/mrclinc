import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function PDInfoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge variant="primary" className="bg-primary-700 mb-4">Invite Only</Badge>
              <h1 className="text-4xl font-bold mb-4">Become a Pathway Developer</h1>
              <p className="text-xl text-primary-100">
                Join our network of independent professionals helping UK patients access healthcare pathways in Turkey.
              </p>
            </div>
          </div>
        </section>

        {/* What is a PD */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is a Pathway Developer?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A Pathway Developer (PD) is an <strong>independent professional</strong> who creates awareness about MrClinc within their own networks. PDs help patients discover our coordination services and ensure requests are submitted correctly.
              </p>
              
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-primary-900 mb-3">Important Distinctions</h3>
                <p className="text-primary-800 text-sm">
                  PDs are <strong>not</strong> employees, sales agents, or medical advisors. They are independent partners who operate within their own professional channels. PDs do not provide medical advice, recommend specific clinics, or handle patient payments.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">PD Responsibilities</h3>
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Build Your Own Channel</h4>
                    <p className="text-gray-600 text-sm">You choose where and how to create awareness - GP practices, pharmacies, community groups, etc.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ensure Quality Case Entry</h4>
                    <p className="text-gray-600 text-sm">Help patients understand the process and submit complete requests through the platform.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Follow Platform Standards</h4>
                    <p className="text-gray-600 text-sm">Maintain boundaries - no medical advice, no clinic recommendations, no pressure tactics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Partnership Earnings</h2>
              <p className="text-gray-600 mb-6">
                PDs earn partnership fees when cases they coordinate complete successfully. Earnings are paid twice monthly via bank transfer.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card variant="bordered">
                  <CardContent className="py-6 text-center">
                    <p className="text-3xl font-bold text-primary-600 mb-2">€250-€350</p>
                    <p className="text-gray-600">Per Aesthetic Surgery Case</p>
                  </CardContent>
                </Card>
                <Card variant="bordered">
                  <CardContent className="py-6 text-center">
                    <p className="text-3xl font-bold text-primary-600 mb-2">€1,000-€1,200</p>
                    <p className="text-gray-600">Per Medical Surgery Case</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-sm text-gray-500">
                Earnings include base fees plus performance bonuses. Only completed treatments generate earnings - incomplete or cancelled cases do not qualify.
              </p>
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="warning" className="mb-4">Invite Only Program</Badge>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Become a PD</h2>
              <p className="text-gray-600 mb-8">
                The Pathway Developer program is currently invite-only. We carefully select partners who align with our values of ethical, patient-centered coordination.
              </p>
              
              <div className="bg-gray-100 rounded-xl p-8">
                <h3 className="font-semibold text-gray-900 mb-4">Interested in Joining?</h3>
                <p className="text-gray-600 mb-6">
                  If you're a healthcare professional, community leader, or have a network that could benefit from our services, contact us to express interest.
                </p>
                <Link href="/contact">
                  <Button variant="primary">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Already a PD */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Already a Pathway Developer?</h2>
              <p className="text-primary-100 mb-6">
                Access your portal to view cases, track earnings, and complete education modules.
              </p>
              <Link href="/pd/login">
                <Button variant="outline" className="border-white text-white hover:bg-primary-800">
                  Login to PD Portal
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
