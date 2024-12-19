'use client'

import { buildFolderTree } from "@/lib"
import { useActionState } from "react"
import { useParams } from "next/navigation"
import { FormState, multipleImageUrlSchema } from "@/types"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useImagePickerContext } from "./image-picker-provider"
import { createManyImageUrls } from "../../_actions/create"
import { MultipleImagesForm } from "./form/multiple-images-form"
import { useGalleryContext } from "../gallery-provider"
import { useRouter } from "@/i18n"


export function NewMultipleImages() {
  const { selectedUrls, setSelectedUrls } = useImagePickerContext()
  const { folders } = useGalleryContext()
  const folderTree = buildFolderTree(folders)

  const router = useRouter()

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

  const [state, action, pending] = useActionState<FormState>(async () => {
    form.setValue('urls', selectedUrls)
    const validation = await form.trigger()
    if (!validation) return { isSuccess: false }

    const values = form.getValues()

    const res = await createManyImageUrls(values)
    setSelectedUrls([])
    return res
  }, { isSuccess: false })

  const handleClose = () => {
    setSelectedUrls([])
    router.back()
  }

  return (
    <MultipleImagesForm
      form={form}
      selectedUrls={selectedUrls}
      folderTree={folderTree}
      action={action}
      pending={pending}
      error={state.error}
      handleClose={handleClose}
    />
  )
}