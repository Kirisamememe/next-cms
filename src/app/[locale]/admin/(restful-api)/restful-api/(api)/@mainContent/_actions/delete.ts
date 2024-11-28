'use server'

import { getSession } from "@/lib-server-only"
import { accessTokenService } from "@/services/access-token-service"
import { revalidatePath } from "next/cache"

export async function deleteAccessToken(token: string) {
  await getSession()
  const { error } = await accessTokenService.delete(token)
  if (error) {
    throw new Error(error)
  }
  revalidatePath('/admin/restful-api')
}