import { Input } from "@/components/ui/input";
import { Submit } from "@/components/ui/submit-button";
import { Heading } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

type Props = {
  action: (formData: FormData) => Promise<never>
}

export function NewEditorForm({ action }: Props) {
  const t = useTranslations()

  return (
    <>
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
    </>
  )
}