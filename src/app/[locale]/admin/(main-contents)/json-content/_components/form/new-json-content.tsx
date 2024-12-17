'use client'

import { useForm } from "react-hook-form"
import { JsonContentForm } from "./json-content-form"
import { useActionState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContentCategory, FormState, jsonContentSchema } from "@/types"
import { z } from "zod"
import { createJsonContent } from "../../_actions/create"
import { useRouter } from "@/i18n"
import { Submit } from "@/components/ui/submit-button"
import { useTranslations } from "next-intl"

type Props = {
  categories: ContentCategory[]
}

export const NewJsonContent = ({ categories }: Props) => {
  const { push } = useRouter()
  const t = useTranslations()

  const form = useForm<z.infer<typeof jsonContentSchema>>({
    resolver: zodResolver(jsonContentSchema),
    defaultValues: {
      slug: '',
      title: '',
      description: '',
      adminOnly: false,
      permissionLevel: 0,
      authorNote: '',
      publishedAt: null,
      archivedAt: null,
    }
  })

  const [state, action, isPending] = useActionState<FormState>(
    async () => {
      const validation = await form.trigger()
      if (!validation) return { isSuccess: false }

      const values = form.getValues()
      if (values.categoryId === 0) {
        values.categoryId = null
      }
      const res = await createJsonContent(values)
      if (!res.isSuccess) {
        return res
      }

      push(`/admin/json-content`)
      return res
    },
    { isSuccess: false }
  )

  return (
    <JsonContentForm action={action} form={form} categories={categories}>
      <Submit error={state.error} isPending={isPending}>
        {t('common.submit')}
      </Submit>
    </JsonContentForm>
  )
}