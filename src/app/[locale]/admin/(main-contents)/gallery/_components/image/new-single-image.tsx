'use client'

import { FormState, imageUrlSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useActionState, useEffect } from "react"
import { useParams } from "next/navigation"
import { buildFolderTree } from "@/lib"
import { useImagePickerContext } from "./image-picker-provider"
import { createImageUrl } from "../../_actions/create"
import { SingleImageForm } from "./form/single-image-form"
import { useGalleryContext } from "../gallery-provider"
import { useRouter } from "@/i18n"

export function NewSingleImage() {
  const { selectedUrl } = useImagePickerContext()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)

  const router = useRouter()

  const { folders: paramFolders } = useParams<{ folders?: string[] }>()
  const currentFolders = (paramFolders && paramFolders.length) ? ['.', ...paramFolders] : ['.']
  const currentPath = decodeURIComponent(currentFolders.join('/'))

  const form = useForm<z.infer<typeof imageUrlSchema>>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: {
      url: '',
      name: '',
      folderPath: currentPath
    },
    mode: "onChange"
  })

  const [state, action, pending] = useActionState<FormState>(async () => {
    const validation = await form.trigger()
    if (!validation) return { isSuccess: false }

    const values = form.getValues()
    const parse = await imageUrlSchema.parseAsync(values)
    const res = await createImageUrl(parse)

    if (!res.isSuccess) {
      return res
    }

    return res
  }, { isSuccess: false })


  useEffect(() => {
    form.setValue('url', selectedUrl)
  }, [selectedUrl, form])


  const handleClose = () => {
    router.back()
  }

  return (
    <SingleImageForm
      form={form}
      folderTree={folderTree}
      action={action}
      pending={pending}
      error={state.error}
      handleClose={handleClose}
    />
  )
}