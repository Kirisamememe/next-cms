'use client'

import React from "react"
import { MDXEditor } from "./forward-ref-editor"
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor"
import { Flexbox, FlexColumn } from "@/components/ui/flexbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  form: UseFormReturn<{
    body: string;
    slug: string;
    summary?: string | undefined;
    title?: string | undefined;
    image?: string | undefined;
    commit_msg?: string | undefined;
    author_note?: string | undefined;
    author_id: number;
  }, any, undefined>
  onSubmit: (values: z.infer<typeof articleSubmitFormSchema>) => void
  isPending: boolean
  // article: Article
}

export const ArticleForm = React.forwardRef<
  MDXEditorMethods, MDXEditorProps & Props
>(({ className, form, isPending, onSubmit, ...props }, ref) => {

  const t = useTranslations()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="appear flex border rounded-lg justify-stretch max-w-[76rem] 2xl:w-[76rem] 2xl:m-auto">
        <FlexColumn className="p-3 flex-grow border-r">
          <MDXEditor
            ref={ref} {...props}
            onChange={(text) => form.setValue('body', text)}
          />
        </FlexColumn>
        <Flexbox className="sticky top-[86px] shrink-0 w-72 xl:w-80 2xl:w-96 h-[calc(100vh-7rem)] p-4 gap-4 overflow-scroll">
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
})
ArticleForm.displayName = "ArticleForm"