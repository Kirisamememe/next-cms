import { SignIn } from "@/components/auth/sign-in"
import { Locale } from "@/i18n-config"

export default async function Admin({
  params
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params

  return <SignIn locale={locale}/>
}