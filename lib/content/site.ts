export const SITE_CONFIG = {
  name: "MrClinc",
  tagline: "Pathway Coordination Platform",
  description:
    "Connecting UK patients with Antalya healthcare providers through independent Pathway Developers.",
  url: "https://mrclinc.com",
  email: "info@mrclinc.com",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Why Antalya", href: "/why-antalya" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  services: {
    title: "Services",
    links: [
      { label: "Aesthetic Surgery", href: "/services#aesthetic" },
      { label: "Cancer Surgery", href: "/services#cancer" },
      { label: "General Surgery", href: "/services#general" },
      { label: "Free Second Opinion", href: "/services#second-opinion" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Why Antalya", href: "/why-antalya" },
      { label: "Contact", href: "/contact" },
      { label: "Patient FAQ", href: "/patient/faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  pd: {
    title: "Pathway Developers",
    links: [
      { label: "About PD Program", href: "/pd" },
      { label: "PD Login", href: "/pd/login" },
    ],
  },
};
