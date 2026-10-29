import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://qiskitbrasil.com.br";
const DESCRIPTION =
  "Palestras, workshop e desafio de computação quântica para iniciantes, com a IBM. 24 a 26/11, na FIAP (São Paulo) e online, grátis e com certificado.";
// Light 1200x630 crop of hero-bg for link previews (WhatsApp skips heavy images);
// Google's event data keeps the full-resolution original
const SHARE_IMAGE = "/assets/illustrations/og-image.jpg";
const EVENT_IMAGE = "/assets/illustrations/hero-bg.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Qiskit Fall Fest 2026 | Computação quântica grátis na FIAP e online",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  // Google Search Console ownership check, keep it or the property loses verification
  verification: { google: "ey6xi0jy5NuAZl02F6rjqOL77eY-QTZFX25FwjmAOdA" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630 }],
  },
};

// schema.org Event, lets Google show date, place and "free" in search results.
// Times span the whole program: day 1 opening to day 3 closing (São Paulo, UTC-3).
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Qiskit Fall Fest 2026",
  description: DESCRIPTION,
  image: [SITE_URL + EVENT_IMAGE],
  startDate: "2026-11-24T18:00:00-03:00",
  endDate: "2026-11-26T20:30:00-03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  inLanguage: "pt-BR",
  isAccessibleForFree: true,
  location: [
    {
      "@type": "Place",
      name: "FIAP Paulista",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Paulista, 1106",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
    { "@type": "VirtualLocation", url: SITE_URL },
  ],
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: "https://forms.cloud.microsoft/r/YuW1uLvY6m",
  },
  organizer: [
    { "@type": "Organization", name: "Qiskit Fall Fest Brasil", url: SITE_URL },
    { "@type": "Organization", name: "IBM", url: "https://www.ibm.com" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never close the script tag
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
