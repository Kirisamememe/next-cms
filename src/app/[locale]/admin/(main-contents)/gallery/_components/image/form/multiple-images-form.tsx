'use client'

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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { UseFormReturn } from "react-hook-form"
import { FolderSelect } from "../../folder-select"
import { FlexColumn } from "@/components/ui/flexbox"
import { Badge } from "@/components/ui/badge"
import { LabelText } from "@/components/ui/typography"
import { MediaFolder } from "@/types"


type Props = {
  form: UseFormReturn<{
    urls: string[];
    folderPath: string;
  }, any, undefined>
  selectedUrls: string[]
  folderTree: MediaFolder[]
}

export function MultipleImagesForm({ form, selectedUrls, folderTree }: Props) {
  const t = useTranslations()

  return (
    <>
      <FormItem>
        <FormLabel>
          {t('gallery.imageUrl.form.url')}
        </FormLabel>
        <FlexColumn gap={1} border radius={'md'} px={3} py={2} className="h-52 overflow-scroll">
          {!selectedUrls.length &&
            <LabelText className="whitespace-pre-line" size={14}>
              {t('gallery.imageUrl.form.urlsPlaceholder')}
            </LabelText>
          }
          {selectedUrls.map((url) => (
            <Badge key={url} variant={'secondary'} className="relative overflow-hidden shrink-0">
              <span className="absolute left-0 top-0 bg-gradient-to-r from-secondary via-secondary to-secondary/0 size-4"></span>
              <span className="inline-flex justify-end truncate">
                {url}
              </span>
            </Badge>
          ))}
        </FlexColumn>
      </FormItem>

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