import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/simulateur-devis",
          "/guides-fiscaux",
          "/pourquoi-nous",
          "/faq",
          "/actualites",
          "/services/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://asconsulting-gabon.com/sitemap.xml",
  };
}
