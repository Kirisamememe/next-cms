import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"
import { Header } from "@/app/[locale]/admin/components/header";
import { SideNav } from "@/app/[locale]/admin/components/sidenav/sidenav";
import { Flexbox } from "@/components/ui/flexbox";
import { SidebarProvider } from "@/components/ui/sidebar";

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
        <Flexbox className="w-full">
          <Header />
          <Flexbox gap={4} p={6} className="@container h-full">
            {children}
          </Flexbox>
        </Flexbox>
      </SidebarProvider>
    </SessionProvider>
  )
}