'use client'

import React from "react"
import Image from "next/image"
import { MDXEditor } from "./forward-ref-editor"
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor"
import { Flexbox, FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"
import { DateTimePopover } from "@/app/[locale]/admin/(main-contents)/articles/components/article-form-popover"
import { LabelText } from "@/components/ui/typography"
import { Editor } from "@/types/editor-schema"
import { LastEdit } from "./article-card"
import { useParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { format } from 'date-fns'


type Props = {
  form: UseFormReturn<{
    body: string;
    slug: string;
    summary?: string;
    title?: string;
    image?: string;
    commit_msg?: string;
    author_note?: string;
    author_id: number;
    published_at?: Date | null;
  }, any, undefined>
  onSubmit: (values: z.infer<typeof articleSubmitFormSchema>) => void
  author?: Editor
  lastEdit?: Editor
  createdAt?: Date
  updatedAt?: Date
  isPending: boolean
}

export const ArticleForm = React.forwardRef<
  MDXEditorMethods, MDXEditorProps & Props
>(({ className, form, isPending, onSubmit, author, lastEdit, createdAt, updatedAt, ...props }, ref) => {

  const t = useTranslations()
  const params = useParams<{ locale: string }>()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="appear flex border rounded-lg justify-stretch max-w-[76rem] 2xl:w-[76rem] 2xl:m-auto">
        <FlexColumn className="p-3 flex-grow border-r">
          <MDXEditor
            ref={ref} {...props}
            onChange={(text) => form.setValue('body', text)}
          />
        </FlexColumn>
        <Flexbox className="sticky top-[86px] shrink-0 w-80 2xl:w-96 h-[calc(100vh-7rem)] p-4 gap-4 overflow-scroll">
          {author && lastEdit && updatedAt &&
            <>
              <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0 px-1">
                <div className="relative">
                  <Image src={author.image || ""} width={36} height={36} alt="avatar" className="rounded-full" />
                  {author.id !== lastEdit.id &&
                    <Image src={lastEdit.image || ""} width={20} height={20} alt="avatar" className="absolute -right-1 -bottom-1 rounded-full ring-background ring-2" />
                  }
                </div>
                <FlexColumn gap={0.5}>
                  <LabelText size={14} weight={500}>
                    {t('article.author', { name: author?.nickname || author.name })}
                  </LabelText>
                  <LastEdit className="@[52rem]:text-xs" nickname={lastEdit?.nickname} name={lastEdit.name} updatedAt={updatedAt} locale={params.locale} />
                </FlexColumn>
              </FlexRow>
              <Separator className="" />
            </>
          }

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
          <FormField
            control={form.control}
            name="published_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.publishedAt.name")}
                </FormLabel>
                <DateTimePopover field={field} defaultDate={form.formState.defaultValues?.published_at} />
                <FormDescription hidden>{t("article.publishedAt.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" isPending={isPending} className="sticky bottom-0">
            {t("common.save")}
          </Button>

          {createdAt &&
            <LabelText>
              {t('article.createdAt', { date: format(createdAt, 'yyyy-MM-dd HH:mm:ss') })}
            </LabelText>
          }
        </Flexbox>
      </form>
    </Form>
  )
})
ArticleForm.displayName = "ArticleForm"