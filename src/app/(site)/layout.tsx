import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { PortalUiProvider } from "@/components/portal/portal-ui";
import { COMPANY_INFO, CORE_SERVICES } from "@/lib/portal-data";

const SITE_URL = "https://asconsulting-gabon.com";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${SITE_URL}/#organisation`,
  name: COMPANY_INFO.name,
  alternateName: "Cabinet A&S Consulting",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/home.jpeg`,
  telephone: COMPANY_INFO.phonePrimary.replace(/\s/g, ""),
  email: COMPANY_INFO.email,
  priceRange: "$$",
  description: COMPANY_INFO.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${COMPANY_INFO.addressLine1}, ${COMPANY_INFO.addressLine2}`,
    addressLocality: "Libreville",
    addressCountry: "GA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 0.3901,
    longitude: 9.4544,
  },
  areaServed: { "@type": "Country", name: "Gabon" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "13:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services du cabinet A&S CONSULTING",
    itemListElement: CORE_SERVICES.map((service, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.shortDesc,
      },
    })),
  },
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <PortalUiProvider>
      <JsonLd data={localBusinessSchema} />
      <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PortalUiProvider>
  );
}
