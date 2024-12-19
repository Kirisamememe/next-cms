'use client'

import { imageUrlSchema, ImageUrl, FormState } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useActionState, useEffect } from "react"
import { buildFolderTree } from "@/lib"
import { SingleImageForm } from "./image/form/single-image-form"
import { useGalleryContext } from "./gallery-provider"
import { updateImageUrl } from "../_actions/update"
import { useImagePickerContext } from "./image/image-picker-provider"
import { useRouter } from "@/i18n"


type Props = {
  imageUrl: ImageUrl
}

export function EditSingleImage({ imageUrl }: Props) {
  const { folders } = useGalleryContext()
  const { selectedUrl, setSelectedUrl } = useImagePickerContext()
  const folderTree = buildFolderTree(folders)

  const router = useRouter()

  const form = useForm<z.infer<typeof imageUrlSchema>>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: {
      url: imageUrl.url,
      name: imageUrl.name,
      folderPath: imageUrl.folderPath
    },
    mode: "onChange"
  })

  const [state, action, pending] = useActionState<FormState>(async () => {
    const validation = await form.trigger()
    if (!validation) return { isSuccess: false }

    const values = form.getValues()

    const parse = await imageUrlSchema.parseAsync(values)

    const res = await updateImageUrl(imageUrl.id, parse)
    if (!res.isSuccess) {
      return res
    }
    setSelectedUrl('')
    router.back()
    return { isSuccess: true }
  }, { isSuccess: false })

  const handleClose = () => {
    setSelectedUrl('')
    router.back()
  }

  useEffect(() => {
    form.setValue('url', selectedUrl || imageUrl.url)
  }, [selectedUrl, form, imageUrl.url])


  return (
    <SingleImageForm
      className="z-10 min-w-80 min-h-[24rem]"
      form={form}
      folderTree={folderTree}
      action={action}
      pending={pending}
      handleClose={handleClose}
      imageId={imageUrl.id}
      error={state.error}
    />
  )
}