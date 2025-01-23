import { Input } from "@/components/ui/input";
import { CategorySelector } from "../../../../_components/category/category-selector";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form";
import { ContentCategory, JsonContentForClient, jsonContentSchema, JsonNodeData } from "@/types";
import { JsonFileUploader } from "./json-file-uploader";
import { FlexColumn } from "@/components/ui/flexbox";
import { JsonEditorProvider } from "../json-editor-provider";
import { useEffect, useState } from "react";
import { convertToJsonNodeData, convertToJsonValue } from "../../_hooks/json-convert";
import { CircleSpinLoading } from "@/components/circle-spin-loading";
import { DateTimePopover } from "../../../../_components/content/datetime-popover";
import { Submit } from "@/components/ui/submit-button";
import { z } from "zod";
import { FormError } from "@/app/[locale]/admin/_components/content/form-error";
import { useScrollState } from "@/app/[locale]/admin/_components/scroll-state-provider";
import { FormAuthorState } from "@/app/[locale]/admin/_components/content/form-editor-state";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import { FormDataVersionState } from "@/app/[locale]/admin/_components/content/form-data-version-state";

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

  const { setHeaderFixed } = useScrollState()

  useEffect(() => {
    setHeaderFixed(true)
    return () => {
      setHeaderFixed(false)
    }
  }, [setHeaderFixed])

  return (
    <Form {...form}>
      <form action={action} className="appear flex flex-col w-full @[54rem]:flex-row h-fit @[54rem]:h-[calc(100vh-4rem)]">
        <Tabs defaultValue="upload" className="relative flex flex-col w-full h-full border-r gap-0 overflow-scroll">
          <TabsList className="sticky top-0 bg-background h-fit sm:w-full justify-start gap-8 p-0 px-6 rounded-none border-b [&>button]:text-base [&>button]:font-semibold [&>button]:rounded-none [&>button]:h-14 z-30">
            <TabsTrigger value="upload" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--foreground))]">
              {t('jsonContent.form.tabs.upload')}
            </TabsTrigger>
            <TabsTrigger value="jsonEditor" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--foreground))]">
              {t('jsonContent.form.tabs.editor')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="min-h-80 flex-grow w-full p-4 mt-0 ">
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
          <TabsContent value="jsonEditor" className="min-h-80 flex-grow mt-0 ">
            <JsonEditorProvider>
              <JsonEditor jsonData={jsonNodeData} setJsonData={setJsonData} />
            </JsonEditorProvider>
          </TabsContent>
        </Tabs>


        <FlexColumn className="shrink-0 w-full @[54rem]:w-[22.5rem] @[80rem]:w-96 h-fit @[54rem]:h-[calc(100vh-4rem)] overflow-scroll">
          {jsonContent?.author && jsonContent?.lastEditor && jsonContent?.updatedAt &&
            <FormAuthorState
              authorName={jsonContent.author.nickname || jsonContent.author.name || "Anonymous"}
              editorName={jsonContent.lastEditor.nickname || jsonContent.lastEditor.name || "Anonymous"}
              updatedAt={jsonContent.updatedAt}
              sameEditor={jsonContent.author.id === jsonContent.lastEditor.id}
              authorImage={jsonContent.author.image || ""}
              editorImage={jsonContent.lastEditor.image || ""}
            />
          }
          <FlexColumn p={4} gap={4} className="shrink-0">
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
                    <Textarea placeholder={t('jsonContent.form.description.placeholder')} {...field} className="resize-none" />
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
          </FlexColumn>

          <FlexColumn p={4} gap={4} className="sticky bottom-0 shrink-0 pt-4 @[80rem]:pt-8 bg-gradient-to-t from-background via-background to-background/0 ">
            <FormError message={error?.message} />
            <Submit isPending={isPending}>
              {t('common.save')}
            </Submit>
          </FlexColumn>

          {jsonContent &&
            <FormDataVersionState
              createdAt={jsonContent.createdAt}
              updatedAt={jsonContent.updatedAt}
              archivedAt={jsonContent.archivedAt}
              version={jsonContent.jsonAtom.version}
            />
          }

        </FlexColumn>
      </form>
    </Form>
  )
};