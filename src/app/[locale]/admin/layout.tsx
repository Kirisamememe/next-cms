import { auth } from "@/auth";
import { Header } from "@/app/[locale]/admin/components/header";
import { SideNav } from "@/app/[locale]/admin/components/sidenav/sidenav";
import { Flexbox } from "@/components/ui/flexbox";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/translator";

export default async function DashboardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale }
}>) {
  const session = await auth()
  if (!session?.user) {
    return <>{children}</>
  }

  const { locale } = await params
  const dictionary = await getDictionary(locale);

  return (
    <SidebarProvider>
      <SideNav dictionary={dictionary} />
      <Flexbox className="w-full">
        <Header dictionary={dictionary} />
        <Flexbox gap={6} p={6}>
          {children}
        </Flexbox>
      </Flexbox>
    </SidebarProvider>
  )
}