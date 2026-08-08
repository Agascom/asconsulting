import "server-only";

import nodemailer from "nodemailer";

type MailArgs = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendMail({ to, subject, text, html }: MailArgs): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[mail] SMTP non configuré — email ignoré : "${subject}" -> ${to}`);
    }
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM ?? to,
      to,
      subject,
      text,
      html: html ?? text,
    });
    return true;
  } catch (err) {
    console.error("[mail] Échec d'envoi :", err);
    return false;
  }
}

export async function sendContactNotification(args: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const to = process.env.MAIL_TO ?? "asconsulting.ga@gmail.com";
  if (!to) return;

  const subject = `Nouvelle demande de contact — ${args.firstName} ${args.lastName}`;
  const text = [
    `Nouvelle demande reçue sur le site A&S Consulting :`,
    ``,
    `Nom : ${args.lastName} ${args.firstName}`,
    `Entreprise : ${args.company || "—"}`,
    `Email : ${args.email}`,
    `Téléphone : ${args.phone || "—"}`,
    `Service concerné : ${args.service || "Non précisé"}`,
    ``,
    `Message :`,
    args.message,
  ].join("\n");

  await sendMail({ to, subject, text });
}
