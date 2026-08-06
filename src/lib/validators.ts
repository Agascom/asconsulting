import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis").max(100),
  lastName: z.string().min(1, "Le nom est requis").max(100),
  company: z.string().max(150).optional().or(z.literal("")),
  phone: z
    .string()
    .max(30)
    .optional()
    .or(z.literal(""))
    .or(z.string().regex(/^[+\d][\d\s.-]*$/, "Numéro de téléphone invalide")),
  email: z.string().email("Adresse e-mail invalide"),
  service: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10, "Votre message est trop court").max(4000),
  // Champ anti-spam honeypot : doit rester vide
  website: z.literal("").optional().or(z.undefined()),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const serviceSchema = z.object({
  slug: z.string().min(1).max(150),
  title: z.string().min(1).max(150),
  shortDesc: z.string().min(1).max(300),
  description: z.string().min(1).max(6000),
  items: z.array(z.string().min(1).max(200)).min(1, "Ajoutez au moins une prestation"),
  icon: z.string().max(50).optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export const postSchema = z.object({
  slug: z.string().min(1).max(150),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1).max(30000),
  published: z.boolean().default(true),
});

export const faqSchema = z.object({
  question: z.string().min(1).max(300),
  answer: z.string().min(1).max(4000),
  order: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export const settingsSchema = z.object({
  phone: z.string().max(50).default(""),
  email: z.string().email().or(z.literal("")),
  address: z.string().max(300).default(""),
  hours: z.string().max(200).default(""),
  whatsapp: z.string().max(30).default(""),
});

export const requestStatusSchema = z.enum(["nouveau", "en_cours", "traite", "archive"]);
