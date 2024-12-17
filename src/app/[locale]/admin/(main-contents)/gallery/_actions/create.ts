'use server'


import { imageUrlService, mediaFolderService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { dbError, imageUrlSchema, multipleImageUrlSchema } from "@/types"
import { revalidatePath } from "next/cache"
import { z } from "zod"


export async function createFolder(folderName: string, parentPath: string) {
  await getSession()
  const res = await mediaFolderService.create({ name: folderName, parentPath })
  if (!res) {
    return dbError
  }
  revalidatePath(`/admin/gallery`)
  return res
}




export async function createImageUrl(values: z.infer<typeof imageUrlSchema>) {
  const { operatorId } = await getSession()
  await imageUrlSchema.parseAsync(values).catch(() => {
    return dbError
  })

  const res = await imageUrlService.create(operatorId, values)
  if (!res) {
    return dbError
  }
  revalidatePath(`/admin/gallery`)
  return res
}

export async function createManyImageUrls(values: z.infer<typeof multipleImageUrlSchema>) {
  const { operatorId } = await getSession()
  await multipleImageUrlSchema.parseAsync(values).catch(() => {
    return dbError
  })

  const res = await imageUrlService.createMany(operatorId, values)
  if (!res) {
    return dbError
  }
  revalidatePath(`/admin/gallery`)
  return res
}

