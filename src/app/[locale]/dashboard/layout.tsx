import { Header } from "@/components/header";
import { Nav } from "@/components/nav/nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Locale } from "@/i18n-config";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <Header />
        <Nav />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </>
  )
}