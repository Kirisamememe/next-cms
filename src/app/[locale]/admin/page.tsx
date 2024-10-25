import { SignIn } from "@/app/[locale]/admin/components/sign-in";
import { Locale } from "@/i18n-config";
import { redirect } from "next/navigation";

type Props = {
  params: { locale: Locale }
}

export default async function AdminPage({ params }: Props) {

  const { locale } = await params

  return <SignIn locale={locale} />
}