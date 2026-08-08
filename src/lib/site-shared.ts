export const SITE = {
  name: "A&S Consulting",
  legalName: "A&S CONSULTING SARL",
  tagline:
    "Cabinet de gestion comptable, fiscale, sociale et administrative à Libreville",
  facebook: "https://www.facebook.com/profile.php?id=100087006793876",
  defaultPhone: "+241 07 75 79 908",
  defaultEmail: "asconsulting.ga@gmail.com",
  defaultAddress: "Carrefour Léon Mba, Libreville — Gabon",
  defaultHours: "Lun – Ven : 8h00 – 17h30 · Sam : 9h00 – 13h00",
};

export const SETTING_KEYS = {
  phone: "contact.phone",
  email: "contact.email",
  address: "contact.address",
  hours: "contact.hours",
  whatsapp: "contact.whatsapp",
} as const;

export type SiteSettings = {
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
};

export const DEFAULTS: SiteSettings = {
  phone: SITE.defaultPhone,
  email: SITE.defaultEmail,
  address: SITE.defaultAddress,
  hours: SITE.defaultHours,
  whatsapp: "",
};

export function whatsappLink(number: string, text?: string) {
  const clean = number.replace(/[^\d]/g, "");
  if (!clean) return "";
  return `https://wa.me/${clean}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
