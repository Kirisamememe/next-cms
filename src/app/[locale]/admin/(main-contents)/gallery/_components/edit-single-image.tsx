'use client'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { imageUrlSchema } from "@/types/image-url-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useActionState, useRef } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { FlexRow } from "@/components/ui/flexbox"
import { buildFolderTree } from "@/lib/utils"
import { SingleImageForm } from "./image/form/single-image-form"
import { useGalleryContext } from "./gallery-provider"
import { ImageUrl } from "@/types/image"
import { updateImageUrl } from "../_actions/update"

type Props = {
  imageUrl: ImageUrl
}

export function EditSingleImage({ imageUrl }: Props) {
  const t = useTranslations()
  const router = useRouter()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)

  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const form = useForm<z.infer<typeof imageUrlSchema>>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: {
      url: imageUrl.url,
      name: imageUrl.name,
      folderPath: imageUrl.folderPath || undefined
    },
    mode: "onChange"
  })

  const [_, action, pending] = useActionState(async () => {
    const validation = await form.trigger()
    if (!validation) return

    const values = form.getValues()
    if (values.folderPath === '.') {
      values.folderPath = ''
    }
    const parse = await imageUrlSchema.parseAsync(values)
    await updateImageUrl(imageUrl.id, parse)
    closeBtnRef.current?.click()
  }, null)

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-5">
        <SingleImageForm form={form} folderTree={folderTree} />

        <FlexRow gap={3} className="ml-auto mt-3">
          <Button type="button" ref={closeBtnRef} variant={'outline'} onClick={() => router.back()}>
            {t('common.close')}
          </Button>
          <Button isPending={pending} type="submit" className="w-fit">
            {t('common.submit')}
          </Button>
        </FlexRow>
      </form>
    </Form>
  )
}