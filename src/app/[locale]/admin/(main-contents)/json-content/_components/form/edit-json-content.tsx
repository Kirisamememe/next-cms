'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { JsonContentForm } from "./json-content-form"
import { ContentCategory, FormState, JsonContentForClient, jsonContentSchema } from "@/types"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateJsonContent } from "../../_actions/update"
import { redirect } from "next/navigation"

type Props = {
  jsonContent: JsonContentForClient
  categories: ContentCategory[]
}

export const EditJsonContent = ({ jsonContent, categories }: Props) => {
  const form = useForm<z.infer<typeof jsonContentSchema>>({
    resolver: zodResolver(jsonContentSchema),
    defaultValues: {
      slug: jsonContent?.slug || '',
      title: jsonContent?.jsonAtom.title || '',
      description: jsonContent?.jsonAtom.description || '',
      categoryId: jsonContent?.categoryId === null ? undefined : jsonContent?.categoryId,
      adminOnly: jsonContent?.adminOnly || false,
      permissionLevel: jsonContent?.permissionLevel,
      authorNote: jsonContent?.authorNote || '',
      publishedAt: jsonContent?.publishedAt,
      archivedAt: jsonContent?.archivedAt,
      json: jsonContent?.jsonAtom.content
    },
  })

  const [state, action] = useActionState<FormState>(async () => {
    const validation = await form.trigger()
    if (!validation) return { isSuccess: false }

    const values = form.getValues()
    if (values.categoryId === 0) {
      values.categoryId = null
    }
    console.log(values)
    await updateJsonContent(jsonContent.id, values)

    redirect(`/admin/json-content`)
  },
    { isSuccess: false }
  )



  return (
    <>
      <JsonContentForm action={action} jsonContent={jsonContent} form={form} error={state.error} categories={categories} />
    </>
  )
}