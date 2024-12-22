'use client'

import React, { FC, useEffect } from "react"
import Image from "next/image"
import { MDXEditor } from "./forward-ref-editor"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { ArticleForClient, articleSubmitFormSchema, ContentCategory } from "@/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"
import { DateTimePopover } from "../../../_components/content/datetime-popover"
import { LabelText } from "@/components/ui/typography"
import { useParams } from "next/navigation"
import { format } from 'date-fns'
import { CategorySelector } from "../../../_components/category/category-selector"
import { LastEditor } from "../../../_components/content/last-editor"
import { useScrollState } from "../../../_components/scroll-state-provider"
import { cn } from "@/lib"
import { AIAssistant } from "./ai-assistant"
import { useDebouncedCallback } from 'use-debounce';


type Props = {
  form: UseFormReturn<z.infer<typeof articleSubmitFormSchema>, any, undefined>
  onSubmit: (values: z.infer<typeof articleSubmitFormSchema>) => void
  article?: ArticleForClient
  isPending: boolean
  categories: ContentCategory[],
}

export const ArticleForm: FC<Props> = ({ form, isPending, onSubmit, article, categories }) => {
  const ref = React.useRef<MDXEditorMethods>(null)
  const t = useTranslations()
  const params = useParams<{ locale: string }>()
  const { setHeaderFixed } = useScrollState()

  useEffect(() => {
    ref.current?.setMarkdown(form.getValues('body'))
    setHeaderFixed(true)
    return () => {
      setHeaderFixed(false)
    }
  }, [form, setHeaderFixed])


  const handleBodyChange = useDebouncedCallback((text: string) => {
    form.setValue('body', text)
  }, 300)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="appear flex flex-col @[54rem]:flex-row justify-stretch h-fit">
        <FlexColumn className="relative p-4 flex-grow @[54rem]:border-r">
          <MDXEditor
            ref={ref}
            markdown={article?.atom.body || ''}
            className={cn(
              "@[72rem]:w-[48rem] @[72rem]:mx-auto [&>div[role=toolbar]]:top-20 [&>div[role=toolbar]]:@[72rem]:min-w-[42rem]",
            )}
            onChange={handleBodyChange}
          />
          <AIAssistant form={form} mdxRef={ref} />
        </FlexColumn>
        <FlexColumn className="sticky top-16 shrink-0 w-full @[54rem]:w-[22.5rem] @[80rem]:w-96 h-fit @[54rem]:h-[calc(100vh-4rem)] overflow-scroll border-t @[54rem]:border-none">
          {article?.author && article?.lastEdited && article?.updatedAt &&
            <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0 px-4 py-4 border-b bg-card">
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
                <LastEditor className="@[52rem]:text-xs" nickname={article.lastEdited?.nickname} name={article.lastEdited.name} updatedAt={article.updatedAt} locale={params.locale} />
              </FlexColumn>
            </FlexRow>
          }

          <FlexColumn gap={4} className="shrink-0 p-4">
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('jsonContent.form.category.name')}
                  </FormLabel>
                  <FormControl>
                    <CategorySelector
                      categories={categories}
                      placeholder={t('jsonContent.form.category.placeholder')}
                      className="mb-4"
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value ? `${field.value}` : undefined}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t('jsonContent.form.category.description')}
                  </FormDescription>
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
                  <DateTimePopover value={field.value} onChange={field.onChange} defaultDate={form.formState.defaultValues?.publishedAt} />
                  <FormDescription hidden>{t("article.publishedAt.description")}</FormDescription>
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

          </FlexColumn>

          <FlexColumn className="sticky bottom-0 shrink-0 p-4 py-6 @[80rem]:pt-8 bg-gradient-to-t from-background via-background to-background/0 ">
            <Button type="submit" isPending={isPending} className="">
              {t("common.save")}
            </Button>
          </FlexColumn>

          <FlexColumn gap={2} className="shrink-0 p-4">
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


        </FlexColumn>
      </form>
    </Form>
  )
}