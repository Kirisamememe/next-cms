'use server'

import { imageUrlService, mediaFolderService } from "@/di/services"

import { getSession } from "@/lib-server-only"
import { revalidatePath } from "next/cache"

export async function deleteImage(id: number) {
  await getSession()
  const data = await imageUrlService.delete(id)
  if (!data) {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  }
  revalidatePath('/admin/gallery')
}


export async function deleteFolder(path: string) {
  await getSession()
  const data = await mediaFolderService.delete(path)
  if (!data) {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  }
  revalidatePath('/admin/gallery')
}