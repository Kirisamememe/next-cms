'use server'

import { apiService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { revalidatePath } from "next/cache"

export async function toggleActive(apiId: number, state: boolean) {
  const { operatorId } = await getSession()
  const data = await apiService.toggleActive(apiId, operatorId, state)
  if (!data) {
    return !state
  }
  revalidatePath('/admin/restful-api')
  return !!data.activatedAt
}