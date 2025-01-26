'use client'

import { useForm } from "react-hook-form"
import { JsonContentForm } from "./json-content-form"
import { useActionState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContentCategory, FormState, jsonContentSchema } from "@/types"
import { z } from "zod"
import { createJsonContent } from "../../_actions/create"
import { redirect } from "next/navigation"
import { createId } from "@paralleldrive/cuid2"

type Props = {
  categories: ContentCategory[]
}

export const NewJsonContent = ({ categories }: Props) => {
  const form = useForm<z.infer<typeof jsonContentSchema>>({
    resolver: zodResolver(jsonContentSchema),
    defaultValues: {
      slug: '',
      title: '',
      description: '',
      adminOnly: false,
      permissionLevel: 3,
      authorNote: '',
      publishedAt: null,
      archivedAt: null,
      json: {}
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
      if (!values.slug) {
        values.slug = createId()
      }
      const res = await createJsonContent(values)
      if (!res.isSuccess) {
        return res
      }

      redirect(`/admin/json-content`)
    },
    { isSuccess: false }
  )

  return (
    <JsonContentForm action={action} form={form} categories={categories} error={state.error} isPending={isPending} />
  )
}