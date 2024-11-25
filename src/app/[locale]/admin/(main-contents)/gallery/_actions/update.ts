'use server'

import { getSession } from "@/lib/getSession"
import { imageUrlService } from "@/services/image-url-service"
import { mediaFolderService } from "@/services/media-folder-service"
import { imageUrlSchema } from "@/types/image-url-schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function revalidateGallery() {
  revalidatePath('/admin/gallery')
}


export async function updateImageUrlFolder(imageId: number, folderPath: string) {
  const { operatorId } = await getSession()
  const res = await imageUrlService.move(imageId, operatorId, folderPath)
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath('/admin/gallery')
}

export async function updateFolderPath(path: string, name: string, parentPath: string) {
  await getSession()
  const res = await mediaFolderService.move(path, name, parentPath)
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath('/admin/gallery')
}

export async function updateImageUrl(imageId: number, values: z.infer<typeof imageUrlSchema>) {
  const { operatorId } = await getSession()
  await imageUrlSchema.parseAsync(values).catch(() => {
    redirect('/admin/gallery?formError=common.form.invalidData')
  })

  const res = await imageUrlService.update(imageId, operatorId, values)
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath(`/admin/gallery`)
  return res
}


export async function editFolderName(path: string, folderName: string, parentPath: string) {
  await getSession()
  const res = await mediaFolderService.update(path, { name: folderName, parentPath })
  if (!res) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath(`/admin/gallery`)
  return res
}