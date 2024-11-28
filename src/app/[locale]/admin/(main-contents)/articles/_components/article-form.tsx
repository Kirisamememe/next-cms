'use client'

import React from "react"
import Image from "next/image"
import { MDXEditor } from "./forward-ref-editor"
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor"
import { Flexbox, FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { ArticleForClient, articleSubmitFormSchema } from "@/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"
import { DateTimePopover } from "./article-form-popover"
import { LabelText } from "@/components/ui/typography"
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
    commitMsg?: string;
    authorNote?: string;
    publishedAt?: Date | null;
  }, any, undefined>
  onSubmit: (values: z.infer<typeof articleSubmitFormSchema>) => void
  article?: ArticleForClient
  isPending: boolean
}

export const ArticleForm = React.forwardRef<
  MDXEditorMethods, MDXEditorProps & Props
>(({ className, form, isPending, onSubmit, article, ...props }, ref) => {

  const t = useTranslations()
  const params = useParams<{ locale: string }>()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="appear flex flex-col @[54rem]:flex-row border rounded-lg justify-stretch max-w-[76rem] 2xl:w-[76rem] 2xl:m-auto">
        <FlexColumn className="p-3 flex-grow @[54rem]:border-r">
          <MDXEditor
            ref={ref} {...props}
            onChange={(text) => form.setValue('body', text)}
          />
        </FlexColumn>
        <Flexbox className="sticky top-[86px] shrink-0 w-full @[54rem]:w-80 2xl:w-96 h-[calc(100vh-7rem)] p-4 gap-4 overflow-scroll border-t @[54rem]:border-none">
          {article?.author && article?.lastEdited && article?.updatedAt &&
            <>
              <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0 px-1">
                <div className="relative">
                  <Image src={article.author.image || ""} width={36} height={36} alt="avatar" className="rounded-full" />
                  {article.author.id !== article.lastEdited.id &&
                    <Image src={article.lastEdited.image || ""} width={20} height={20} alt="avatar" className="absolute -right-1 -bottom-1 rounded-full ring-background ring-2" />
                  }
                </div>
                <FlexColumn gap={0.5}>
                  <LabelText size={14} weight={500}>
                    {t('article.author', { name: article.author?.nickname || article.author.name })}
                  </LabelText>
                  <LastEdit className="@[52rem]:text-xs" nickname={article.lastEdited?.nickname} name={article.lastEdited.name} updatedAt={article.updatedAt} locale={params.locale} />
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
            name="commitMsg"
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
            name="authorNote"
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
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("article.publishedAt.name")}
                </FormLabel>
                <DateTimePopover field={field} defaultDate={form.formState.defaultValues?.publishedAt} />
                <FormDescription hidden>{t("article.publishedAt.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" isPending={isPending} className="sticky bottom-0">
            {t("common.save")}
          </Button>

          <FlexColumn gap={2} className="shrink-0 py-2">
            {article?.createdAt &&
              <LabelText>
                {t('article.createdAt', { date: format(article?.createdAt, 'yyyy-MM-dd HH:mm:ss') })}
              </LabelText>
            }

            {article?.atom.version &&
              <LabelText>
                {`Version: ${article.atom.version}`}
              </LabelText>
            }

            {article?.archivedAt &&
              <LabelText>
                {t('article.archivedAt', { date: format(article?.archivedAt, 'yyyy-MM-dd HH:mm:ss') })}
              </LabelText>
            }
          </FlexColumn>

        </Flexbox>
      </form>
    </Form>
  )
})
ArticleForm.displayName = "ArticleForm"