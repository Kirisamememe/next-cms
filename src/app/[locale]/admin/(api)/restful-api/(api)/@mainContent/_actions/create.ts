'use server'

import { apiService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { revalidatePath } from "next/cache"

export async function createMainContentApi(name: string) {
  const { operatorId } = await getSession()
  const res = await apiService.createMainApi(
    operatorId,
    {
      name: name,
      path: `/api/${name}`
    }
  )
  revalidatePath('/admin/restful-api')
  return res
}