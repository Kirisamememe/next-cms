'use client'

import { useToast } from "@/hooks/use-toast"
import { articleSubmitFormSchema, ArticleForClient, ContentCategory } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useRouter } from "next/navigation"
import React from "react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArticleForm } from "./article-form"
import { useTranslations } from "next-intl"
import { updateArticle, updateArticleCreateNewAtom } from "../_actions/update"

type Props = {
  article: ArticleForClient
  categories: ContentCategory[]
}

export function EditArticle({ article, categories }: Props) {
  const ref = React.useRef<MDXEditorMethods>(null)
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof articleSubmitFormSchema>>({
    resolver: zodResolver(articleSubmitFormSchema),
    mode: "onChange",
    defaultValues: {
      title: article.atom.title || "",
      slug: article.slug || "",
      summary: article.atom.summary || "",
      image: article.atom.image || "",
      body: article.atom.body || "",
      commitMsg: article.atom.commitMsg || "",
      authorNote: article.authorNote || "",
      publishedAt: article.publishedAt || null,
      categoryId: article.categoryId === null ? undefined : article.categoryId
    }
  });

  const onSubmit = (values: z.infer<typeof articleSubmitFormSchema>) => {
    const markdown = ref.current?.getMarkdown()
    if (!markdown) return;

    const hasAtomChanged = () => {
      const contentFields = ['title', 'summary', 'image', 'body', 'commitMsg'] as const
      return contentFields.some(field =>
        values[field] !== article.atom[field]
      )
    }

    startTransition(async () => {
      let res

      if (hasAtomChanged()) {
        res = await updateArticleCreateNewAtom(article.id, values)
      } else {
        res = await updateArticle(article.id, values)
      }

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
      router.push('/admin/articles')
      return
    })
  }

  return (
    <ArticleForm
      ref={ref} form={form}
      markdown={article.atom.body}
      onSubmit={onSubmit}
      isPending={isPending}
      article={article}
      categories={categories}
    />
  )
}