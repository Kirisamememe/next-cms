'use server'

import { apiService } from "@/di/services"
import { getSession } from "@/lib-server-only"

export async function toggleActive(apiId: number, state: boolean) {
  const { operatorId } = await getSession()
  return await apiService.toggleActive(apiId, operatorId, state)
}