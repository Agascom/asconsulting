import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://asconsulting-gabon.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "A&S CONSULTING — Cabinet comptable, fiscal & création d'entreprise à Libreville",
    template: "%s | A&S CONSULTING",
  },
  description:
    "Cabinet comptable à Libreville (Gabon) : tenue de comptabilité SYSCOHADA, déclarations fiscales & TVA, paie & cotisations CNSS, création d'entreprise au Gabon (NIF, RCCM). Contact : +241 07 75 79 908.",
  keywords: [
    "cabinet comptable Libreville",
    "expert comptable Gabon",
    "tenue de comptabilité Libreville",
    "comptabilité SYSCOHADA",
    "déclaration fiscale Gabon",
    "quitus fiscal Libreville",
    "création d'entreprise Gabon",
    "NIF RCCM Gabon",
    "paie CNSS Gabon",
    "A&S Consulting",
  ],
  applicationName: "A&S CONSULTING",
  authors: [{ name: "A&S CONSULTING", url: SITE_URL }],
  category: "comptabilité, fiscalité, conseil aux entreprises",
  openGraph: {
    type: "website",
    locale: "fr_GA",
    url: SITE_URL,
    siteName: "A&S CONSULTING",
    title:
      "A&S CONSULTING — Cabinet comptable, fiscal & création d'entreprise à Libreville",
    description:
      "Tenue de comptabilité SYSCOHADA, fiscalité & TVA, paie & CNSS, création d'entreprise au Gabon (NIF, RCCM). Contact : +241 07 75 79 908.",
    images: [
      {
        url: "/images/home.jpeg",
        width: 1200,
        height: 630,
        alt: "A&S CONSULTING — cabinet comptable à Libreville",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "A&S CONSULTING — Cabinet comptable, fiscal & création d'entreprise à Libreville",
    description:
      "Comptabilité SYSCOHADA, fiscalité, paie et création d'entreprise au Gabon.",
    images: ["/images/home.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
