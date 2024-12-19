'use client'

import {
  Form,
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
import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Badge } from "@/components/ui/badge"
import { LabelText } from "@/components/ui/typography"
import { MediaFolder, multipleImageUrlSchema } from "@/types"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Submit } from "@/components/ui/submit-button"
import { FormError } from "@/app/[locale]/admin/_components/content/form-error"


type Props = {
  form: UseFormReturn<z.infer<typeof multipleImageUrlSchema>, any, undefined>
  selectedUrls: string[]
  folderTree: MediaFolder[]
  action: () => void,
  pending: boolean
  handleClose: () => void
  error?: { message: string }
}

export function MultipleImagesForm({ form, selectedUrls, folderTree, action, pending, handleClose, error }: Props) {
  const t = useTranslations()

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-4 h-full">
        <FormItem>
          <FormLabel>
            {t('gallery.imageUrl.form.url')}
          </FormLabel>
          <FlexColumn gap={1} border radius={'md'} px={3} py={2} className="relative h-48 overflow-scroll">
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

        <FormError message={error?.message} />

        <FlexRow gap={3} className="mr-auto mt-auto">
          <Submit isPending={pending} className="w-fit">
            {t('common.submit')}
          </Submit>
          <Button type="button" variant={'outline'} onClick={handleClose}>
            {t('common.close')}
          </Button>
        </FlexRow>
      </form>
    </Form>
  )
}