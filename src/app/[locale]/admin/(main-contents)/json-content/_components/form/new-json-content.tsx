'use client'

import { useForm } from "react-hook-form"
import { JsonContentForm } from "./json-content-form"
import { useActionState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormState, jsonContentSchema } from "@/types"
import { z } from "zod"
import { createJsonContent } from "../../_actions/create"
import { redirect } from "next/navigation"

export const NewJsonContent = () => {
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

  const [state, action] = useActionState<FormState>(
    async () => {
      const validation = await form.trigger()
      if (!validation) return { isSuccess: false }

      const values = form.getValues()
      if (values.categoryId === 0) {
        values.categoryId = null
      }
      console.log(values)
      await createJsonContent(values)

      redirect(`/admin/json-content`)
    },
    { isSuccess: false }
  )

  return (
    <JsonContentForm action={action} form={form} error={state.error} />
  )
}