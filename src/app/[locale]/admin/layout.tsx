import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"
import { Header } from "./_components/header";
import { SideNav } from "./_components/sidenav/sidenav";
import { Flexbox } from "@/components/ui/flexbox";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
          <Header />
          <Flexbox className="h-full gap-4 p-4 @[40rem]:p-6">
            {children}
          </Flexbox>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}