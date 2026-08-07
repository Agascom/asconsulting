import { z } from "zod";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";

const newsletterSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return Response.json(
      { error: first?.message ?? "Formulaire invalide" },
      { status: 422 }
    );
  }

  const email = parsed.data.email.trim().toLowerCase();

  const existing = await db.contactRequest.findFirst({
    where: { email, service: "Newsletter" },
  });
  if (existing) {
    return Response.json({ ok: true, duplicate: true });
  }

  const record = await db.contactRequest.create({
    data: {
      firstName: "Newsletter",
      lastName: "Abonné",
      company: null,
      phone: null,
      email,
      service: "Newsletter",
      message: "Inscription à la lettre d'information fiscale",
      status: "nouveau",
    },
  });

  const to = process.env.MAIL_TO ?? "";
  if (to) {
    await sendMail({
      to,
      subject: `Nouvelle inscription newsletter — ${email}`,
      text: `Nouvelle inscription à la lettre d'information A&S Consulting.\n\nEmail : ${email}`,
    });
  }

  return Response.json({ ok: true, id: record.id }, { status: 201 });
}
