'use server'

import { accessTokenService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { dbError } from "@/types"
import { revalidatePath } from "next/cache"

export async function deleteAccessToken(token: string) {
  await getSession()
  const data = await accessTokenService.delete(token)
  if (!data) {
    return dbError
  }
  revalidatePath('/admin/restful-api')
  return {
    isSuccess: true
  }
}