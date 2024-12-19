import { Input } from "@/components/ui/input";
import { CategorySelector } from "../../../../_components/category/category-selector";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form";
import { ContentCategory, JsonContentForClient, jsonContentSchema, JsonNodeData } from "@/types";
import { JsonFileUploader } from "./json-file-uploader";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { JsonEditorProvider } from "../json-editor-provider";
import { useState } from "react";
import { convertToJsonNodeData, convertToJsonValue } from "../../_hooks/json-convert";
import { CircleSpinLoading } from "@/components/circle-spin-loading";
import { Separator } from "@/components/ui/separator";
import { LabelText } from "@/components/ui/typography";
import { LastEditor } from "@/app/[locale]/admin/_components/content/last-editor";
import { DateTimePopover } from "../../../../_components/content/datetime-popover";
import { Submit } from "@/components/ui/submit-button";
import { z } from "zod";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FormError } from "@/app/[locale]/admin/_components/content/form-error";

const JsonEditor = dynamic(() => import("../editor/json-editor"), {
  ssr: false,
  loading: () => <CircleSpinLoading />
})

type Props = {
  action: () => void
  jsonContent?: JsonContentForClient
  form: UseFormReturn<z.infer<typeof jsonContentSchema>, any, undefined>
  categories: ContentCategory[]
  error?: { message: string }
  isPending: boolean
}

export const JsonContentForm = ({ action, jsonContent, form, categories, error, isPending }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const [jsonNodeData, setJsonNodeData] = useState<JsonNodeData>(jsonContent?.jsonAtom.content
    ? convertToJsonNodeData(jsonContent.jsonAtom.content, { isRoot: true })
    : {
      id: 'root',
      valueType: 'object',
      children: []
    }
  )

  const setJsonData = (data: JsonNodeData) => {
    setJsonNodeData(data)
    form.setValue('json', convertToJsonValue(data))
  }

  return (
    <Form {...form}>
      <form action={action} className="appear flex border rounded-lg max-w-[90rem] w-full h-full mx-auto">
        <Tabs defaultValue="upload" className="flex flex-col max-w-[calc(100%-22.5rem)] w-full h-full border-r gap-0">
          <TabsList className="bg-transparent h-fit sm:w-full justify-start gap-8 p-0 px-6 rounded-none border-b [&>button]:text-base [&>button]:font-semibold [&>button]:rounded-none [&>button]:h-14">
            <TabsTrigger value="upload" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--foreground))]">
              {t('jsonContent.form.tabs.upload')}
            </TabsTrigger>
            <TabsTrigger value="jsonEditor" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--foreground))]">
              {t('jsonContent.form.tabs.editor')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="flex-grow w-full p-4 mt-0">
            <FormField
              control={form.control}
              name="json"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <JsonFileUploader
                      onValueChange={(value) => {
                        field.onChange(value)
                        setJsonNodeData(convertToJsonNodeData(value, { isRoot: true }))
                      }}
                      value={convertToJsonValue(jsonNodeData)} />
                  </FormControl>
                  <FormDescription hidden>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="jsonEditor" className="flex-grow p-6 mt-0 ">
            <JsonEditorProvider>
              <JsonEditor jsonData={jsonNodeData} setJsonData={setJsonData} />
            </JsonEditorProvider>
          </TabsContent>
        </Tabs>


        <FlexColumn p={4} gap={4} className="shrink-0 w-[22.5rem]">
          {jsonContent?.author && jsonContent?.lastEditor && jsonContent?.updatedAt &&
            <>
              <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0 px-1">
                <div className="relative">
                  <Image src={jsonContent.author.image || ""} width={36} height={36} alt="avatar" className="rounded-full" />
                  {jsonContent.author.id !== jsonContent.lastEditor.id &&
                    <Image src={jsonContent.lastEditor.image || ""} width={20} height={20} alt="avatar" className="absolute -right-1 -bottom-1 rounded-full ring-background ring-2" />
                  }
                </div>
                <FlexColumn gap={0.5}>
                  <LabelText size={14} weight={500}>
                    {t('article.author', { name: jsonContent.author?.nickname || jsonContent.author.name })}
                  </LabelText>
                  <LastEditor className="@[52rem]:text-xs" nickname={jsonContent.lastEditor?.nickname} name={jsonContent.lastEditor.name} updatedAt={jsonContent.updatedAt} locale={locale} />
                </FlexColumn>
              </FlexRow>
              <Separator className="" />
            </>
          }

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('jsonContent.form.slug.name')}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('jsonContent.form.slug.placeholder')} {...field} />
                </FormControl>
                <FormDescription hidden>
                  {t('jsonContent.form.slug.description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField

            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('jsonContent.form.title.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('jsonContent.form.title.placeholder')} {...field} />
                </FormControl>
                <FormDescription hidden>
                  {t('jsonContent.form.title.description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('jsonContent.form.description.name')}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('jsonContent.form.description.placeholder')} {...field} />
                </FormControl>
                <FormDescription hidden>
                  {t('jsonContent.form.description.description')}
                </FormDescription>
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
                  {t('jsonContent.form.authorNote.name')}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('jsonContent.form.authorNote.placeholder')} {...field} />
                </FormControl>
                <FormDescription hidden>
                  {t('jsonContent.form.authorNote.description')}
                </FormDescription>
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
                  {t("jsonContent.form.publishedAt.name")}
                </FormLabel>
                <FormControl>
                  <DateTimePopover value={field.value} onChange={field.onChange} defaultDate={form.formState.defaultValues?.publishedAt} />
                </FormControl>
                <FormDescription hidden>{t("jsonContent.form.publishedAt.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {jsonContent?.jsonAtom.version && (
            <p>version: {jsonContent?.jsonAtom.version}</p>
          )}

          <FormError message={error?.message} />

          <Submit isPending={isPending}>
            {t('common.submit')}
          </Submit>
        </FlexColumn>
      </form>
    </Form>
  )
};