'use server'

import { apiService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { dbError } from "@/types"
import { revalidatePath } from "next/cache"

export async function createMainContentApi(name: string, path: string) {
  const { operatorId } = await getSession()
  const res = await apiService.createMainApi(
    operatorId,
    {
      name: name,
      path: path
    }
  )
  if (!res) {
    return dbError
  }
  revalidatePath('/admin/restful-api')
  return {
    isSuccess: true
  }
}