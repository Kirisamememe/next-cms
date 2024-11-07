import { getTranslations } from 'next-intl/server';
import { signIn } from "@/auth"
import { FcGoogle } from 'react-icons/fc';
import { Flexbox, FlexRow } from "@/components/ui/flexbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import LocaleSwitcher from "@/components/locale-switcher";

export async function SignIn() {

  const t = await getTranslations('auth');

  return (
    <Flexbox className="mt-[calc(50vh-12rem)] h-full justify-center items-center">
      <Flexbox className="flex flex-col gap-6 border p-6 rounded-lg w-full max-w-[28rem] min-w-[22.5rem]">
        <FlexRow className="justify-between items-center">
          <Heading size={24}>
            {t('signIn')}
          </Heading>
          <LocaleSwitcher align='start' sideOffset={4} />
        </FlexRow>
        <form action={async () => {
          'use server'
          await signIn("google")
        }} className="flex flex-col">
          <Button>
            <FcGoogle />
            {t('signInWithGoogle')}
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
            <Input name="email" type="email" placeholder={t('emailPlaceholder')} />
          </Flexbox>
          <Button type="submit">
            {t('signInWithMagicLink')}
          </Button>
        </form>
      </Flexbox>

    </Flexbox>
  )
}