import { Flexbox } from "@/components/ui/flexbox";
import { Input } from "@/components/ui/input";
import { Submit } from "@/components/ui/submit-button";
import { Heading } from "@/components/ui/typography";
import { prisma } from "@/prisma";
import { newEditorSchema } from "@/types/editor-schema";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function NewEditorFormPage() {
  const t = await getTranslations()

  const action = async (formData: FormData) => {
    'use server'

    const parse = newEditorSchema.safeParse({ email: formData.get('email') })
    if (parse.error) {
      const errorMsg = parse.error.format().email?._errors
      console.error(errorMsg)
      redirect(`/admin/editors/new?formError=${errorMsg}`,)
    }

    const res = await prisma.allowedEmail.create({
      data: {
        email: parse.data.email
      }
    })

    if (!res.id) {
      redirect(`/admin/editors/new?formError=failed`,)
    }

    redirect(`/admin/editors?message=success`)
  }

  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0 gap-6 bg-background">
      <Heading size={18} mx={1}>
        {t('editor.newEditor')}
      </Heading>
      <form action={action} className="flex flex-col gap-3">
        <label className="flex flex-col gap-2 text-sm">
          <span className="ml-1 font-semibold">
            {t('editor.email.name')}
          </span>
          <Input name="email" type="email" placeholder={t('editor.email.placeholder')} aria-description={t('editor.email.description')} />
        </label>
        <Submit className="mt-4">
          {t("common.submit")}
        </Submit>
      </form>
    </Flexbox>
  )
}