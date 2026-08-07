"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import type { PageTab } from "@/lib/portal-data";
import { AppointmentModal } from "@/components/portal/appointment-modal";
import { GlobalSearchModal } from "@/components/portal/global-search-modal";

interface PortalUiContextValue {
  openAppointment: () => void;
  openSearch: () => void;
}

const PortalUiContext = createContext<PortalUiContextValue | null>(null);

const SECTION_IDS: Partial<Record<PageTab, string>> = {
  about: "a-propos",
  services: "services",
  creation: "creation",
  simulator: "simulator",
  location: "location",
  resources: "resources",
  "client-space": "espace-client",
};

export function usePortalNavigation() {
  const router = useRouter();
  return useCallback(
    (tab: PageTab) => {
      if (tab === "contact") {
        router.push("/contact");
        return;
      }
      const id = SECTION_IDS[tab];
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );
}

export function usePortalUi() {
  const ctx = useContext(PortalUiContext);
  if (!ctx) throw new Error("usePortalUi doit être utilisé dans PortalUiProvider");
  return ctx;
}

export function PortalUiProvider({ children }: { children: React.ReactNode }) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const handleNavigate = usePortalNavigation();

  return (
    <PortalUiContext.Provider
      value={{
        openAppointment: () => setAppointmentOpen(true),
        openSearch: () => setSearchOpen(true),
      }}
    >
      {children}
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </PortalUiContext.Provider>
  );
}
