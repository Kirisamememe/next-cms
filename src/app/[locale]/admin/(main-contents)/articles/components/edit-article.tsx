'use client'

import { updateArticle } from "@/actions/articles"
import { useToast } from "@/hooks/use-toast"
import { Article, articleSubmitFormSchema } from "@/types/article-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArticleForm } from "./article-form"

type Props = {
  article: Article

}

export function EditArticle({ article }: Props) {
  const ref = React.useRef<MDXEditorMethods>(null)
  const { id } = useParams()
  const { toast } = useToast()
  const t = useTranslations()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof articleSubmitFormSchema>>({
    resolver: zodResolver(articleSubmitFormSchema),
    mode: "onChange",
    defaultValues: {
      title: article?.article_atoms[0].title || "",
      slug: article?.slug || "",
      summary: article?.article_atoms[0].summary || "",
      image: article?.article_atoms[0].image || "",
      body: ref.current?.getMarkdown() || "",
      commit_msg: article?.article_atoms[0].commit_msg || "",
      author_id: article?.author_id
    }
  });

  const onSubmit = (values: z.infer<typeof articleSubmitFormSchema>) => {
    const markdown = ref.current?.getMarkdown()
    if (!markdown) return;

    startTransition(async () => {
      const res = await updateArticle(Number(id), values)
      if (!res.id) {
        toast({
          title: "変更が保存できませんでした",
          variant: "destructive"
        })
        console.error("失敗した")
        return
      }

      toast({
        title: "変更が保存されました！",
      })
      return
    })
  }

  return (
    <ArticleForm ref={ref} markdown={article.article_atoms[0].body} form={form} onSubmit={onSubmit} isPending={isPending} />
  )
}