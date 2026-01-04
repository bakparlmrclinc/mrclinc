import type { Metadata } from "next";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "MrClinc - Healthcare Pathway Coordination",
  description: "Healthcare pathway coordination platform supporting patients navigating complex treatment decisions.",
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
        <CookieConsentBanner />
      </body>
    </html>
  );
}
