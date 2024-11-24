'use client'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { buildFolderTree } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useActionState, useRef } from "react"
import { useParams } from "next/navigation"
import { multipleImageUrlSchema } from "@/types/image-url-schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@/components/ui/dialog"
import { useNewImageContext } from "./new-image-provider"
import { createManyImageUrls } from "../../_actions/create"
import { MultipleImagesForm } from "./form/multiple-images-form"
import { FlexRow } from "@/components/ui/flexbox"
import { useGalleryContext } from "../gallery-provider"


export function NewMultipleImages() {
  const t = useTranslations()
  const { selectedUrls, setSelectedUrls } = useNewImageContext()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)

  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const { folders: paramFolders } = useParams<{ folders?: string[] }>()
  const currentPath = paramFolders?.length ? decodeURIComponent(paramFolders.join('/')) : '.'

  const form = useForm<z.infer<typeof multipleImageUrlSchema>>({
    resolver: zodResolver(multipleImageUrlSchema),
    defaultValues: {
      urls: [],
      folderPath: currentPath
    },
    mode: "onChange"
  })

  const [_, action, pending] = useActionState(async () => {
    form.setValue('urls', selectedUrls)
    const validation = await form.trigger()
    if (!validation) return

    const values = form.getValues()
    if (values.folderPath === '.') {
      values.folderPath = ''
    }

    await createManyImageUrls(values)
    setSelectedUrls([])
  }, null)

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-5">
        <MultipleImagesForm form={form} selectedUrls={selectedUrls} folderTree={folderTree} />

        <FlexRow gap={3} className="ml-auto mt-3">
          <DialogClose asChild>
            <Button ref={closeBtnRef} variant={'outline'}>
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