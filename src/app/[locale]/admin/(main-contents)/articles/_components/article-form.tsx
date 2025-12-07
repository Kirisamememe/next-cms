import React, { FC, useEffect } from "react";
import { MDXEditor } from "./forward-ref-editor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { FlexColumn } from "@/components/ui/flexbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  ArticleForClient,
  articleSubmitFormSchema,
  ContentCategory,
  ImageUrlSimpleItem,
  MediaFolder,
} from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePopover } from "../../../_components/content/datetime-popover";
import { CategorySelector } from "../../../_components/category/category-selector";
import { useScrollState } from "../../../_components/scroll-state-provider";
import { cn } from "@/lib";
import { AIAssistant } from "./ai-assistant";
import { useDebouncedCallback } from "use-debounce";
import { ImageSelector } from "../../../_components/content/image-selector";
import { FormAuthorState } from "../../../_components/content/form-editor-state";
import { FormDataVersionState } from "../../../_components/content/form-data-version-state";

type Props = {
  form: UseFormReturn<z.infer<typeof articleSubmitFormSchema>>;
  onSubmit: (values: z.infer<typeof articleSubmitFormSchema>) => void;
  article?: ArticleForClient;
  isPending: boolean;
  categories: ContentCategory[];
  images: Promise<ImageUrlSimpleItem[]>;
  folders: Promise<MediaFolder[]>;
};

export const ArticleForm: FC<Props> = ({
  form,
  isPending,
  onSubmit,
  article,
  categories,
  images,
  folders,
}) => {
  const ref = React.useRef<MDXEditorMethods>(null);
  const t = useTranslations();
  const { setHeaderFixed } = useScrollState();

  useEffect(() => {
    ref.current?.setMarkdown(form.getValues("body"));
    setHeaderFixed(true);
    return () => {
      setHeaderFixed(false);
    };
  }, [form, setHeaderFixed]);

  const handleBodyChange = useDebouncedCallback((text: string) => {
    form.setValue("body", text);
  }, 300);

  const handlePublish = () => {
    form.setValue("publishedAt", new Date());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="appear flex flex-col @[54rem]:flex-row justify-stretch h-fit"
      >
        <FlexColumn className="relative p-4 flex-grow @[54rem]:border-r">
          <MDXEditor
            ref={ref}
            markdown={article?.atom.body || ""}
            className={cn(
              "@[72rem]:w-[48rem] @[72rem]:mx-auto [&>div[role=toolbar]]:top-20 [&>div[role=toolbar]]:@[72rem]:min-w-[42rem]"
            )}
            onChange={handleBodyChange}
          />
          <AIAssistant form={form} mdxRef={ref} />
        </FlexColumn>
        <FlexColumn className="sticky top-16 shrink-0 w-full @[54rem]:w-[22.5rem] @[80rem]:w-96 h-fit @[54rem]:h-[calc(100vh-4rem)] overflow-scroll border-t @[54rem]:border-none">
          {article?.author && article?.lastEdited && article?.updatedAt && (
            <FormAuthorState
              authorName={
                article.author.nickname || article.author.name || "Anonymous"
              }
              editorName={
                article.lastEdited.nickname ||
                article.lastEdited.name ||
                "Anonymous"
              }
              updatedAt={article.updatedAt}
              sameEditor={article.author.id === article.lastEdited.id}
              authorImage={article.author.image || ""}
              editorImage={article.lastEdited.image || ""}
            />
          )}

          <FlexColumn gap={4} className="shrink-0 p-4">
            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("article.image.name")}</FormLabel>
                  <FormControl>
                    <ImageSelector
                      selectedId={field.value}
                      onValueChange={field.onChange}
                      images={images}
                      folders={folders}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("article.image.description")}
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
                  <FormLabel>{t("article.title.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("article.title.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("article.title.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("article.slug.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("article.slug.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("article.slug.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("article.summary.name")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder={t("article.summary.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("article.summary.description")}
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
                  <FormLabel>{t("jsonContent.form.category.name")}</FormLabel>
                  <FormControl>
                    <CategorySelector
                      categories={categories}
                      placeholder={t("jsonContent.form.category.placeholder")}
                      className="mb-4"
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value ? `${field.value}` : undefined}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("jsonContent.form.category.description")}
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
                  <FormLabel>{t("article.publishedAt.name")}</FormLabel>
                  <DateTimePopover
                    value={field.value}
                    onChange={field.onChange}
                    defaultDate={form.formState.defaultValues?.publishedAt}
                  />
                  <FormDescription hidden>
                    {t("article.publishedAt.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commitMsg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("article.commitMsg.name")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder={t("article.commitMsg.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("article.commitMsg.description")}
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
                  <FormLabel>{t("article.authorNote.name")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder={t("article.authorNote.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    {t("article.authorNote.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FlexColumn>

          <FlexColumn className="sticky bottom-0 shrink-0 gap-4 p-4 pt-4 @[80rem]:pt-8 bg-gradient-to-t from-background via-background to-background/0 ">
            {(!article?.publishedAt || article?.publishedAt > new Date()) && (
              <Button
                type="submit"
                variant={"outline"}
                className="bg-secondary/50 backdrop-blur-md"
                isPending={isPending}
                onClick={handlePublish}
              >
                {t("common.publish")}
              </Button>
            )}
            <Button type="submit" isPending={isPending}>
              {t("common.save")}
            </Button>
          </FlexColumn>

          {article && (
            <FormDataVersionState
              createdAt={article.createdAt}
              updatedAt={article.updatedAt}
              archivedAt={article.archivedAt}
              version={article.atom.version}
            />
          )}
        </FlexColumn>
      </form>
    </Form>
  );
};
