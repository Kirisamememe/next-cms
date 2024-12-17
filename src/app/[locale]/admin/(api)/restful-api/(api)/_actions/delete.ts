'use server'

import { accessTokenService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { revalidatePath } from "next/cache"

export async function deleteAccessToken(token: string) {
  await getSession()
  const data = await accessTokenService.delete(token)
  if (!data) {
    throw new Error("")
  }
  revalidatePath('/admin/restful-api')
}