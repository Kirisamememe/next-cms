'use client'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { imageUrlSchema } from "@/types/image-url-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useActionState, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { buildFolderTree, cn } from "@/lib/utils"
import { SingleImageForm } from "./image/form/single-image-form"
import { useGalleryContext } from "./gallery-provider"
import { ImageUrl } from "@/types/image"
import { updateImageUrl } from "../_actions/update"
import { AlertCircle, PenLine, X } from "lucide-react"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heading, LabelText } from "@/components/ui/typography"
import { format } from "date-fns"
import { getLocaleForFns } from "@/i18n/get-locale"


type Props = {
  imageUrl: ImageUrl
}

export function EditSingleImage({ imageUrl }: Props) {
  const t = useTranslations()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)
  const locale = getLocaleForFns(useLocale())

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')


  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const form = useForm<z.infer<typeof imageUrlSchema>>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: {
      url: imageUrl.url,
      name: imageUrl.name,
      folderPath: imageUrl.folderPath
    },
    mode: "onChange"
  })

  const [_, action, pending] = useActionState(async () => {
    const validation = await form.trigger()
    if (!validation) return

    const values = form.getValues()

    const parse = await imageUrlSchema.parseAsync(values)

    const { error } = await updateImageUrl(imageUrl.id, parse)
    if (error) {
      return setError(error.message)
    }
    closeBtnRef.current?.click()
  }, null)


  const onOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) {
      setError('')
      form.reset()
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange} >

      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"icon"}
          className={cn(
            "group-hover:opacity-100 group-active:opacity-0 group-hover:pointer-events-auto opacity-0 pointer-events-none absolute top-2 right-2 rounded-full bg-background/70 size-8 hover:bg-foreground hover:text-background hover:shadow-xl",
            open && "opacity-100 "
          )}>
          {open ? <X size={16} /> : <PenLine size={16} />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit">
        <FlexColumn gap={1} className="mb-4">
          <Heading>
            {t('gallery.imageUrl.edit.title', { id: imageUrl.id })}
          </Heading>
          <LabelText>
            {t('gallery.imageUrl.edit.createdAt', { datetime: format(imageUrl.createdAt, 'PPP p', { locale }) })}
          </LabelText>
          <LabelText>
            {t('gallery.imageUrl.edit.updatedAt', { datetime: format(imageUrl.createdAt, 'PPP p', { locale }) })}
          </LabelText>
          <LabelText>
            {t('gallery.imageUrl.edit.author', { author: imageUrl.author?.nickname || imageUrl.author?.name })}
          </LabelText>
        </FlexColumn>

        <Form {...form}>
          <form action={action} className="flex flex-col gap-4 min-w-80">
            <SingleImageForm form={form} folderTree={folderTree} />

            {error && (
              <Alert variant="destructive">
                <AlertDescription className="flex gap-2 items-center">
                  <AlertCircle size={16} />
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <FlexRow gap={3} className="ml-auto mt-2">
              <PopoverClose asChild>
                <Button type="button" ref={closeBtnRef} variant={'outline'}>
                  {t('common.close')}
                </Button>
              </PopoverClose>
              <Button isPending={pending} type="submit" className="w-fit">
                {t('common.submit')}
              </Button>
            </FlexRow>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}