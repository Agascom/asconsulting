import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortalUiProvider } from "@/components/portal/portal-ui";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <PortalUiProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </PortalUiProvider>
  );
}
