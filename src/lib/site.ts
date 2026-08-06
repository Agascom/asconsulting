import "server-only";

import { cache } from "react";
import { db } from "@/lib/db";
import {
  DEFAULTS,
  SETTING_KEYS,
  SITE,
  whatsappLink,
  type SiteSettings,
} from "@/lib/site-shared";

export { SITE, SETTING_KEYS, DEFAULTS, whatsappLink, type SiteSettings };

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const rows = await db.siteSetting.findMany();
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      phone: map.get(SETTING_KEYS.phone) ?? DEFAULTS.phone,
      email: map.get(SETTING_KEYS.email) ?? DEFAULTS.email,
      address: map.get(SETTING_KEYS.address) ?? DEFAULTS.address,
      hours: map.get(SETTING_KEYS.hours) ?? DEFAULTS.hours,
      whatsapp: map.get(SETTING_KEYS.whatsapp) ?? DEFAULTS.whatsapp,
    };
  } catch {
    return DEFAULTS;
  }
});

export async function updateSettings(next: SiteSettings) {
  const entries: { key: string; value: string }[] = [
    [SETTING_KEYS.phone, next.phone],
    [SETTING_KEYS.email, next.email],
    [SETTING_KEYS.address, next.address],
    [SETTING_KEYS.hours, next.hours],
    [SETTING_KEYS.whatsapp, next.whatsapp],
  ].map(([key, value]) => ({ key, value }));

  for (const entry of entries) {
    await db.siteSetting.upsert({
      where: { key: entry.key },
      update: { value: entry.value },
      create: entry,
    });
  }
}
