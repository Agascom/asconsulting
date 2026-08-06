import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validators";
import { sendContactNotification } from "@/lib/mail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return Response.json(
      { error: first?.message ?? "Formulaire invalide" },
      { status: 422 }
    );
  }

  const data = parsed.data;

  if (data.website) {
    return Response.json({ ok: true });
  }

  const record = await db.contactRequest.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company || null,
      phone: data.phone || null,
      email: data.email,
      service: data.service || null,
      message: data.message,
      status: "nouveau",
    },
  });

  await sendContactNotification({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    company: data.company,
    service: data.service,
    message: data.message,
  });

  return Response.json({ ok: true, id: record.id }, { status: 201 });
}
