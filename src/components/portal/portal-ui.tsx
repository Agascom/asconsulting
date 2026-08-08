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

const TAB_ROUTES: Record<PageTab, string> = {
  home: "/",
  about: "/a-propos",
  services: "/services",
  creation: "/creation-entreprise",
  "client-space": "/espace-client",
  location: "/contact",
  contact: "/contact",
};

export function usePortalNavigation() {
  const router = useRouter();
  return useCallback(
    (tab: PageTab) => {
      router.push(TAB_ROUTES[tab] ?? "/");
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
