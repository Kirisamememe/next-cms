import { signIn } from "@/auth"
import { FcGoogle } from 'react-icons/fc';
import { Flexbox, FlexRow } from "../../../../components/ui/flexbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heading } from "../../../../components/ui/typography"
import { Separator } from "../../../../components/ui/separator"
import LocaleSwitcher from "../../../../components/locale-switcher";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/translator";

type Props = {
  locale: Locale
}

export async function SignIn({ locale }: Props) {

  const dictionary = await getDictionary(locale);

  return (
    <Flexbox className="mt-[calc(50vh-12rem)] h-full justify-center items-center">
      <Flexbox className="flex flex-col gap-6 border p-6 rounded-lg w-full max-w-[28rem] min-w-[22.5rem]">
        <FlexRow className="justify-between items-center">
          <Heading size={24}>
            {dictionary["auth"].signIn}
          </Heading>
          <LocaleSwitcher />
        </FlexRow>
        <form action={async () => {
          'use server'
          await signIn("google")
        }} className="flex flex-col">
          <Button>
            <FcGoogle />
            {dictionary["auth"].signInWithGoogle}
          </Button>
        </form>

        <FlexRow center gap={4}>
          <Separator className="shrink" />
          or
          <Separator className="shrink" />
        </FlexRow>

        <form action={async (formData) => {
          'use server'
          await signIn("Resend", formData)
        }} className="flex flex-col gap-4">
          <Flexbox gap={2}>
            <Input name="email" type="email" placeholder={dictionary["auth"].emailPlaceholder} />
          </Flexbox>
          <Button type="submit">
            {dictionary["auth"].signInWithMagicLink}
          </Button>
        </form>
      </Flexbox>

    </Flexbox>
  )
}