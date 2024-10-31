'use client'

import { updateArticle } from "@/actions/articles"
import { useToast } from "@/hooks/use-toast"
import { Article, articleSubmitFormSchema } from "@/types/article-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useParams, useRouter } from "next/navigation"
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
  const { slug } = useParams<{ slug: string[] }>()
  const { toast } = useToast()
  const router = useRouter()

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
      author_id: article?.author_id
    }
  });

  const onSubmit = (values: z.infer<typeof articleSubmitFormSchema>) => {
    const markdown = ref.current?.getMarkdown()
    if (!markdown) return;

    startTransition(async () => {
      const res = await updateArticle(Number(slug[1]), values)
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
      router.push('/admin/articles')
      return
    })
  }

  return (
    <ArticleForm ref={ref} markdown={article.article_atoms[0].body} form={form} onSubmit={onSubmit} isPending={isPending} />
  )
}