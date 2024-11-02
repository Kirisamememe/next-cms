'use client'

import { updateArticle } from "@/actions/articles"
import { useToast } from "@/hooks/use-toast"
import { articleSubmitFormSchema, ArticleWithAuthor } from "@/types/article-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArticleForm } from "./article-form"
import { useTranslations } from "next-intl"

type Props = {
  article: ArticleWithAuthor
  operatorId: number
}

export function EditArticle({ article, operatorId }: Props) {
  const ref = React.useRef<MDXEditorMethods>(null)
  const { slug } = useParams<{ slug: string[] }>()
  const { toast } = useToast()
  const router = useRouter()
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
      body: article.article_atoms[0].body || "",
      commit_msg: article?.article_atoms[0].commit_msg || "",
      author_note: article?.author_note || "",
      author_id: article?.author_id,
      published_at: article?.published_at || null
    }
  });

  const onSubmit = (values: z.infer<typeof articleSubmitFormSchema>) => {
    const markdown = ref.current?.getMarkdown()
    if (!markdown) return;

    startTransition(async () => {
      // atomに変更がない場合は、atomを新しく作らない
      const res = await updateArticle(Number(slug[1]), operatorId, values)
      if (!res.id) {
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
      router.push('/admin/articles')
      return
    })
  }

  return (
    <ArticleForm
      ref={ref} form={form}
      markdown={article.article_atoms[0].body}
      onSubmit={onSubmit}
      isPending={isPending}
      author={article.author}
      lastEdit={article.last_edited}
      createdAt={article.created_at}
      updatedAt={article.updated_at}
    />
  )
}