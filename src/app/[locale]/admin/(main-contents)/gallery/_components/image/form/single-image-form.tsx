'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { FolderSelect } from "../../folder-select"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"
import { MediaFolder } from "@/types/media-folder-schema"


type Props = {
  form: UseFormReturn<{
    name: string;
    url: string;
    folderPath: string;
    archivedAt?: Date | null | undefined;
  }, any, undefined>
  folderTree: MediaFolder[]
}



export function SingleImageForm({ form, folderTree }: Props) {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('gallery.imageUrl.form.url')}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={3} placeholder={t('gallery.imageUrl.form.urlPlaceholder')}
                className="resize-none" />
            </FormControl>
            <FormDescription hidden>
              {t('gallery.imageUrl.form.urlDescription')}
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
              {t('gallery.imageUrl.form.name')}
            </FormLabel>
            <FormControl>
              <Input placeholder={t('gallery.imageUrl.form.namePlaceholder')} {...field} />
            </FormControl>
            <FormDescription hidden>
              {t('gallery.imageUrl.form.nameDescription')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="folderPath"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('gallery.imageUrl.form.folderPath')}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('gallery.imageUrl.form.folderPathPlaceholder')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <FolderSelect folders={folderTree} value={'.'}>
                  {('Gallery')}
                </FolderSelect>
              </SelectContent>
            </Select>
            <FormDescription hidden>
              {t('gallery.imageUrl.form.folderPathDescription')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}