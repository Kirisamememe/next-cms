import { auth } from "@/auth";
import { Dashboard } from "@/app/[locale]/admin/(overview)/dashboard/components/dashboard";
import { LabelText } from "@/components/ui/typography";
import { Locale } from "@/i18n/config";

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <>
      <DateComp />
      {/* <Revalidate /> */}
      <Dashboard name={session?.user?.name} email={session?.user?.email} role={session?.user?.role} image={session?.user?.image} />
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