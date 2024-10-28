'use client'

import React, { useTransition } from "react"
import { MDXEditor } from "./forward-ref-editor"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { createArticle, updateArticle } from "@/actions/articles"
import { useParams } from "next/navigation"
import { Flexbox, FlexColumn } from "@/components/ui/flexbox"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Article, articleSubmitFormSchema } from "@/types/article-schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  article?: Article | null
}

export default function ArticleForm({ article }: Props) {
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
      if (article) {
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
      }


      const res = await createArticle(values)

      if (!res.id) {
        toast({
          title: "投稿できませんでした",
          variant: "destructive"
        })
        console.error("失敗した")
      }

      toast({
        title: "記事の投稿が完了しました！",
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="appear flex border rounded-lg justify-stretch">
        <FlexColumn className="p-3 flex-grow border-r">
          <MDXEditor
            ref={ref} markdown={article?.article_atoms[0].body || ""}
            onChange={(text) => form.setValue('body', text)}
          />
        </FlexColumn>
        <Flexbox className="sticky top-[86px] shrink-0 w-72 h-[calc(100vh-7rem)] p-4 gap-4 overflow-scroll">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.title.name")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("article.title.placeholder")} {...field} />
                </FormControl>
                <FormDescription hidden>{t("article.title.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.slug.name")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("article.slug.placeholder")} {...field} />
                </FormControl>
                <FormDescription hidden>{t("article.slug.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.summary.name")}
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" placeholder={t("article.summary.placeholder")} {...field} />
                </FormControl>
                <FormDescription hidden>{t("article.summary.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.image.name")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("article.image.placeholder")} {...field} />
                </FormControl>
                <FormDescription hidden>{t("article.image.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commit_msg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.commitMsg.name")}
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" placeholder={t("article.commitMsg.placeholder")} {...field} />
                </FormControl>
                <FormDescription hidden>{t("article.commitMsg.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author_note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.authorNote.name")}
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" placeholder={t("article.authorNote.placeholder")} {...field} />
                </FormControl>
                <FormDescription hidden>{t("article.authorNote.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" disabled={isPending}
            className="sticky bottom-0"
          >
            {t("common.submit")}
          </Button>
        </Flexbox>
      </form>
    </Form>
  )
}