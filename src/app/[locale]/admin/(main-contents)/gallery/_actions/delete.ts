'use server'

import { getSession } from "@/lib/getSession"
import { imageUrlService } from "@/services/image-url-service"
import { mediaFolderService } from "@/services/media-folder-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteImage(id: number) {
  await getSession()
  const data = await imageUrlService.delete(id)
  if (!data) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath('/admin/gallery')
}


export async function deleteFolder(path: string) {
  await getSession()
  const data = await mediaFolderService.delete(path)
  if (!data) {
    redirect('/admin/gallery?formError=common.form.databaseError')
  }
  revalidatePath('/admin/gallery')
}