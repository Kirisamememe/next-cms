'use client'

import { useToast } from "@/hooks/use-toast"
import { articleSubmitFormSchema, ContentCategory, ImageUrlSimpleItem, MediaFolder } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArticleForm } from "./article-form"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { createArticle } from "../_actions/create"


type Props = {
  categories: ContentCategory[]
  images: Promise<ImageUrlSimpleItem[]>
  folders: Promise<MediaFolder[]>
}

export function NewArticle({ categories, images, folders }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof articleSubmitFormSchema>>({
    resolver: zodResolver(articleSubmitFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      imageId: null,
      slug: "",
      summary: "",
      body: "",
      commitMsg: "",
      authorNote: "",
    }
  });

  const onSubmit = (values: z.infer<typeof articleSubmitFormSchema>) => {
    startTransition(async () => {
      const res = await createArticle(values)

      if (!res) {
        toast({
          title: t('common.form.databaseError'),
          variant: "destructive"
        })
        console.error("失敗した")
        return
      }

      toast({
        title: t('common.form.saved'),
      })
      router.push(`/admin/articles/edit/${res.articleId}`)
    })
  }

  return (
    <ArticleForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      categories={categories}
      images={images}
      folders={folders}
    />
  )
}