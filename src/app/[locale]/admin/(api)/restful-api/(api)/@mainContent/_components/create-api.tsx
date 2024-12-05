import { useTranslations } from "next-intl"
import { createMainContentApi } from "../_actions/create"
import { Submit } from "@/components/ui/submit-button"

type Props = {
  apiName: string
}

export function CreateMainContentApi({ apiName }: Props) {
  const t = useTranslations()

  const action = async () => {
    'use server'
    await createMainContentApi(apiName)
  }

  return (
    <form action={action}>
      <Submit className="w-fit">
        {t('restfulApi.mainApi.card.btn')}
      </Submit>
    </form>
  )
}