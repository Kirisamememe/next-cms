'use server'

import { getSession } from "@/lib-server-only"
import { apiService } from "@/services/api-service"

export async function toggleActive(apiId: number, state: boolean) {
  const { operatorId } = await getSession()
  return await apiService.toggleActive(apiId, operatorId, state)
}