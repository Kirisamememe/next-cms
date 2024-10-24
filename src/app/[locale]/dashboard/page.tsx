import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Flexbox } from "@/components/ui/flexbox";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/translator";

export default async function Dashboard({
  params
}: { 
  params: { locale: Locale } 
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale);

  return (
    <Flexbox gap={6} p={6}>
      {dictionary["dashboard"].summary}
      <form action={async () => {
        'use server'
        await signOut({ redirectTo: '/sign-in' })
      }}>
        <Button >
          {dictionary["auth"].signOut}
        </Button>
      </form>
    </Flexbox>
    
  )
}