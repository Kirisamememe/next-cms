'use server'

import { getSession } from "@/lib-server-only";
import { accessTokenService } from "@/services/access-token-service";
import { revalidatePath } from "next/cache";

export async function generateToken(name: string) {
  const { operatorId } = await getSession()
  const { data, error } = await accessTokenService.create(operatorId, name)
  if (error) {
    console.error(error)
    throw new Error('DB Error')
  }
  revalidatePath('/admin/restful-api')
  return data
}