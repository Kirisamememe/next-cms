'use server'

import { getSession } from "@/lib/getSession"
import { imageUrlService } from "@/services/image-url-service"
import { mediaFolderService } from "@/services/media-folder-service"
import { imageUrlSchema, multipleImageUrlSchema } from "@/types/image-url-schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function createFolder(folderName: string, parentPath: string | null) {
  await getSession()
  const res = await mediaFolderService.create({ name: folderName, parentPath })
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath(`/admin/gallery`)
  return res
}

export async function createImageUrl(values: z.infer<typeof imageUrlSchema>) {
  const { operatorId } = await getSession()
  await imageUrlSchema.parseAsync(values).catch(() => {
    redirect('/admin/gallery?formError=common.form.invalidData')
  })

  const res = await imageUrlService.create(operatorId, values)
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath(`/admin/gallery`)
  return res
}

export async function createManyImageUrls(values: z.infer<typeof multipleImageUrlSchema>) {
  const { operatorId } = await getSession()
  await multipleImageUrlSchema.parseAsync(values).catch(() => {
    redirect('/admin/gallery?formError=common.form.invalidData')
  })

  const res = await imageUrlService.createMany(operatorId, values)
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath(`/admin/gallery`)
  return res
}

