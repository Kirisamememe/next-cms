'use server'

import { imageUrlService, mediaFolderService } from "@/di/services"

import { getSession } from "@/lib-server-only"
import { imageUrlSchema } from "@/types"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function revalidateGallery() {
  revalidatePath('/admin/gallery')
}


// ImageUrl ===================================================================


export async function updateImageUrlFolder(imageId: number, folderPath: string) {
  const { operatorId } = await getSession()
  const res = await imageUrlService.move(imageId, operatorId, folderPath)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  }
  revalidatePath('/admin/gallery')
}


export async function updateImageUrl(imageId: number, values: z.infer<typeof imageUrlSchema>) {
  const { operatorId } = await getSession()
  await imageUrlSchema.parseAsync(values).catch(() => {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  })

  const res = await imageUrlService.update(imageId, operatorId, values)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  }
  revalidatePath(`/admin/gallery`)
  return { isSuccess: true }
}





// MediaFolder ===================================================================


export async function updateFolderPath(path: string, name: string, parentPath: string) {
  await getSession()
  const res = await mediaFolderService.move(path, name, parentPath)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  }
  revalidatePath('/admin/gallery')
}

export async function editFolderName(path: string, folderName: string, parentPath: string) {
  await getSession()
  const res = await mediaFolderService.update(path, { name: folderName, parentPath })
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "common.form.databaseError"
      }
    }
  }
  revalidatePath(`/admin/gallery`)
  return res
}