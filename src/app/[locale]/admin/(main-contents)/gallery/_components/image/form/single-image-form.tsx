'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { FolderSelect } from "../../folder-select"
import { useTranslations } from "next-intl"
import { Textarea } from "@/components/ui/textarea"
import { imageUrlSchema, MediaFolder } from "@/types"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { HardDrive } from "lucide-react"
import { FlexRow } from "@/components/ui/flexbox"
import { DeleteImageBtn } from "../../delete-image"
import { Submit } from "@/components/ui/submit-button"
import { FC } from "react"
import { cn } from "@/lib"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/i18n"
import { FormError } from "@/app/[locale]/admin/_components/content/form-error"


type Props = {
  form: UseFormReturn<z.infer<typeof imageUrlSchema>, any, undefined>
  folderTree: MediaFolder[]
  action: () => void,
  pending: boolean
  handleClose: () => void
  imageId?: number,
  error?: { message: string }
} & React.ComponentPropsWithoutRef<"form">


export const SingleImageForm: FC<Props> = ({ form, folderTree, action, imageId, pending, error, handleClose, className }) => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const imagePicker = searchParams.get('imagePicker')
  const router = useRouter()
  const pathname = usePathname()

  const handleExpanded = () => {
    const params = new URLSearchParams(searchParams)

    if (imagePicker === 'true') {
      params.delete('imagePicker')
    } else {
      params.set('imagePicker', 'true')
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Form {...form}>
      <form action={action} className={cn("flex flex-col gap-4 h-full", className)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('gallery.imageUrl.form.url')}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    {...field}
                    rows={4} placeholder={t('gallery.imageUrl.form.urlPlaceholder')}
                    className="resize-none bg-background/50 border-foreground/15" />
                  {imageId && (
                    <Button
                      type="button" variant={'secondary'} size={'icon'}
                      className="absolute bottom-2 right-2 ml-auto size-8 bg-secondary/50 backdrop-blur-sm"
                      onClick={handleExpanded}
                    >
                      <HardDrive size={16} />
                    </Button>
                  )}
                </div>
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

        <FormError message={error?.message} />

        <FlexRow gap={3} className="mt-auto">
          <Submit isPending={pending} className="w-fit">
            {t('common.submit')}
          </Submit>
          <Button type="button" variant={'outline'} className="mr-auto" onClick={handleClose}>
            {t('common.close')}
          </Button>
          {imageId && (<DeleteImageBtn imageId={imageId} />)}
        </FlexRow>
      </form>
    </Form>
  )
}