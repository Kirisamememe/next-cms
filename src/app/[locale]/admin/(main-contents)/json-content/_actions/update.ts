'use server'

import { jsonContentService } from "@/di/services";
import { getSession } from "@/lib-server-only";
import { dbError, jsonContentSchema } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateJsonContent(id: number, values: z.infer<typeof jsonContentSchema>) {
  const { operatorId } = await getSession()
  const res = await jsonContentService.updateAndCreateAtom(id, operatorId, values)
  if (!res) {
    return dbError
  }
  revalidatePath(`/admin/json-content`)
  return {
    isSuccess: true
  }
}