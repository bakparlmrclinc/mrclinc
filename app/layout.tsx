import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MrClinc - Healthcare Pathway Coordination",
  description: "Connecting UK patients with Antalya healthcare providers. Submit your request, receive quotes directly from clinics, and make your own informed decision.",
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
      </body>
    </html>
  );
}
