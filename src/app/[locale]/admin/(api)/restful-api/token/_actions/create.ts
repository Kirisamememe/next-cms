'use server'

import { accessTokenService } from "@/di/services";
import { getSession } from "@/lib-server-only";
import { revalidatePath } from "next/cache";

export async function generateToken(name: string) {
  const { operatorId } = await getSession()
  const data = await accessTokenService.create(operatorId, name)
  if (!data) {
    throw new Error('作成できませんでした')
  }
  revalidatePath('/admin/restful-api')
  return data
}