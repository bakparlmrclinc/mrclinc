import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import CookieConsentBanner from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "MrClinc - Healthcare Pathway Coordination",
  description: "Healthcare pathway coordination platform supporting patients navigating complex treatment decisions.",
=======

export const metadata: Metadata = {
  title: "MrClinc - Healthcare Pathway Coordination",
  description: "Connecting UK patients with Antalya healthcare providers. Submit your request, receive quotes directly from clinics, and make your own informed decision.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
<<<<<<< HEAD
        <CookieConsentBanner />
=======
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      </body>
    </html>
  );
}
