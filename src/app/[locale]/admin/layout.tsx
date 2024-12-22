import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"
import { Header } from "./_components/header";
import { SideNav } from "./_components/sidenav/sidenav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollStateProvider } from "./_components/scroll-state-provider";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  if (!session?.user) {
    return children
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <SideNav />
        <SidebarInset className="@container">
          <ScrollStateProvider>
            <Header />
            {children}
          </ScrollStateProvider>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}