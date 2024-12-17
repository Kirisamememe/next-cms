import { useTranslations } from "next-intl"
import { createMainContentApi } from "../_actions/create"
import { Submit } from "@/components/ui/submit-button"

type Props = {
  apiName: string
  path: string
}

export function CreateMainContentApi({ apiName, path }: Props) {
  const t = useTranslations()

  const action = async () => {
    'use server'
    await createMainContentApi(apiName, path)
  }

  return (
    <form action={action}>
      <Submit className="w-fit">
        {t('api.card.btn')}
      </Submit>
    </form>
  )
}