import { auth } from "@/auth";
import { Dashboard } from "@/app/[locale]/admin/(overview)/dashboard/components/dashboard";
import { Flexbox } from "@/components/ui/flexbox";
import { LabelText } from "@/components/ui/typography";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/translator";
import { Revalidate } from "./revalidate";

export default async function DashboardPage({
  params
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale);
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <>
      <DateComp />
      {/* <Revalidate /> */}
      <Dashboard dictionary={dictionary} name={session?.user?.name} email={session?.user?.email} role={session?.user?.role} image={session?.user?.image} />
    </>

  )
}

function DateComp() {
  const data = new Date().toUTCString()

  return (
    <LabelText>
      {data}
    </LabelText>
  )
}