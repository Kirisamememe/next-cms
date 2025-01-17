'use client'

import { FlexColumn } from "@/components/ui/flexbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Submit } from "@/components/ui/submit-button"
import { useTranslations } from "next-intl"
import { useGroupFormContext } from "./group-form-provider"
import { FormError } from "@/app/[locale]/admin/_components/content/form-error"
import { Textarea } from "@/components/ui/textarea"
import { ImageSelector } from "@/app/[locale]/admin/_components/content/image-selector"
import { ImageUrlSimpleItem, MediaFolder } from "@/types"
import { FormAuthorState } from "@/app/[locale]/admin/_components/content/form-editor-state"
import { FormDataVersionState } from "@/app/[locale]/admin/_components/content/form-data-version-state"

type Props = {
  images: Promise<ImageUrlSimpleItem[]>
  folders: Promise<MediaFolder[]>
}

export const GroupForm = ({ images, folders }: Props) => {
  const t = useTranslations()
  const { pending, form, state, groupValues } = useGroupFormContext()

  return (
    <FlexColumn className="sticky top-16 shrink-0 border-t mt-2 @[54rem]:mt-0 @[54rem]:border-t-0 @[54rem]:border-l w-full @[54rem]:w-[22.5rem] @[80rem]:w-96 overflow-scroll">
      {groupValues?.author && groupValues?.lastEditor && groupValues?.updatedAt &&
        <FormAuthorState
          authorName={groupValues.author.nickname || groupValues.author.name || "Anonymous"}
          editorName={groupValues.lastEditor.nickname || groupValues.lastEditor.name || "Anonymous"}
          updatedAt={groupValues.updatedAt}
          sameEditor={groupValues.author.id === groupValues.lastEditor.id}
          authorImage={groupValues.author.image || ""}
          editorImage={groupValues.lastEditor.image || ""}
        />
      }

      <FlexColumn gap={4} p={4} className="shrink-0">
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contentGroup.form.image.title')}
              </FormLabel>
              <FormControl>
                <ImageSelector selectedId={field.value} onValueChange={field.onChange} images={images} folders={folders} />
              </FormControl>
              <FormDescription hidden>
                {t('contentGroup.form.name.description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contentGroup.form.name.title')}
              </FormLabel>
              <FormControl>
                <Input placeholder={t('contentGroup.form.name.placeholder')} {...field} autoComplete="off" />
              </FormControl>
              <FormDescription hidden>
                {t('contentGroup.form.name.description')}
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
                {t('contentGroup.form.description.title')}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder={t('contentGroup.form.description.placeholder')}
                  rows={6}
                />
              </FormControl>
              <FormDescription hidden>
                {t('contentGroup.form.description.description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissionLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contentGroup.form.permissionLevel.title')}
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || "3"}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('contentGroup.form.permissionLevel.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      {t('contentGroup.form.permissionLevel.1')}
                    </SelectItem>
                    <SelectItem value="2">
                      {t('contentGroup.form.permissionLevel.2')}
                    </SelectItem>
                    <SelectItem value="3">
                      {t('contentGroup.form.permissionLevel.3')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription hidden>
                {t('contentGroup.form.permissionLevel.description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FlexColumn>

      <FlexColumn className="sticky bottom-0 p-4 pt-6 @[80rem]:pt-8 bg-gradient-to-t from-background via-background to-background/0 ">
        <FormError message={state.error?.message} />
        <Submit isPending={pending}>
          {t('common.save')}
        </Submit>
      </FlexColumn>

      {groupValues &&
        <FormDataVersionState
          createdAt={groupValues.createdAt}
          updatedAt={groupValues.updatedAt}
          archivedAt={null}
          version={0}
        />
      }
    </FlexColumn>
  )
}