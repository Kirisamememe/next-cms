'use client'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { imageUrlSchema } from "@/types/image-url-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useActionState, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { FlexRow } from "@/components/ui/flexbox"
import { buildFolderTree, cn } from "@/lib/utils"
import { SingleImageForm } from "./image/form/single-image-form"
import { useGalleryContext } from "./gallery-provider"
import { ImageUrl } from "@/types/image"
import { updateImageUrl } from "../_actions/update"
import { AlertCircle, PenLine } from "lucide-react"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"


type Props = {
  imageUrl: ImageUrl
}

export function EditSingleImage({ imageUrl }: Props) {
  const t = useTranslations()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)

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
    <Popover open={open} onOpenChange={onOpenChange} modal>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"icon"}
          className={cn(
            "group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none absolute top-2 right-2 rounded-full bg-background/50 size-8",
            open && "opacity-100"
          )}>
          <PenLine size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Form {...form}>
          <form action={action} className="flex flex-col gap-5">
            <SingleImageForm form={form} folderTree={folderTree} />

            {error && (
              <Alert variant="destructive">
                <AlertDescription className="flex gap-2 items-center">
                  <AlertCircle size={16} />
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <FlexRow gap={3} className="ml-auto mt-3">
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