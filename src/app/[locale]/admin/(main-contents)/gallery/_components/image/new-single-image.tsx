'use client'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { DialogClose } from "@/components/ui/dialog"
import { imageUrlSchema } from "@/types/image-url-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useActionState, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { FlexRow } from "@/components/ui/flexbox"
import { buildFolderTree } from "@/lib/utils"
import { useNewImageContext } from "./new-image-provider"
import { createImageUrl } from "../../_actions/create"
import { SingleImageForm } from "./form/single-image-form"
import { useGalleryContext } from "../gallery-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function NewSingleImage() {
  const t = useTranslations()
  const { selectedUrl, setSelectedUrl } = useNewImageContext()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)

  const [error, setError] = useState('')

  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const { folders: paramFolders } = useParams<{ folders?: string[] }>()
  const currentPath = paramFolders?.length ? decodeURIComponent(paramFolders.join('/')) : '.'

  const form = useForm<z.infer<typeof imageUrlSchema>>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: {
      url: '',
      name: '',
      folderPath: currentPath
    },
    mode: "onChange"
  })

  const [_, action, pending] = useActionState(async () => {
    const validation = await form.trigger()
    if (!validation) return

    const values = form.getValues()
    const parse = await imageUrlSchema.parseAsync(values)
    const { error } = await createImageUrl(parse)

    if (error) {
      return setError(error.message)
    }
    setSelectedUrl('')
  }, null)

  useEffect(() => {
    form.setValue('url', selectedUrl)
  }, [selectedUrl, form])

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-5 h-[calc(100%-2.5rem)]">
        <SingleImageForm form={form} folderTree={folderTree} />

        {error && (
          <Alert variant="destructive">
            <AlertDescription className="flex gap-2 items-center">
              <AlertCircle size={16} />
              {error}
            </AlertDescription>
          </Alert>
        )}

        <FlexRow gap={3} className="ml-auto mt-auto">
          <DialogClose asChild>
            <Button type="button" ref={closeBtnRef} variant={'outline'}>
              {t('common.close')}
            </Button>
          </DialogClose>
          <Button isPending={pending} type="submit" className="w-fit">
            {t('common.submit')}
          </Button>
        </FlexRow>
      </form>
    </Form>
  )
}