'use client'

import { useToast } from "@/hooks/use-toast"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { MDXEditorMethods } from "@mdxeditor/editor"
import React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArticleForm } from "./article-form"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { createArticle } from "../_actions/create"



export function NewArticle() {
  const ref = React.useRef<MDXEditorMethods>(null)
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof articleSubmitFormSchema>>({
    resolver: zodResolver(articleSubmitFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      image: "",
      body: "",
      commitMsg: "",
      authorNote: "",
    }
  });

  const onSubmit = (values: z.infer<typeof articleSubmitFormSchema>) => {
    const markdown = ref.current?.getMarkdown()
    if (!markdown) return;

    startTransition(async () => {
      const res = await createArticle(values)

      if (!res.id) {
        toast({
          title: t('common.form.databaseError'),
          variant: "destructive"
        })
        console.error("失敗した")
      }

      toast({
        title: t('common.form.saved'),
      })
      router.push(`/admin/articles/edit/${res.articleId}`)
    })
  }

  return (
    <ArticleForm ref={ref} markdown="" form={form} onSubmit={onSubmit} isPending={isPending} />
  )
}