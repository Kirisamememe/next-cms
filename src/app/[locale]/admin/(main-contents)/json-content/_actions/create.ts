'use server'

import { jsonContentService } from "@/di/services";
import { getSession } from "@/lib-server-only";
import { dbError, jsonContentSchema } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createJsonContent(values: z.infer<typeof jsonContentSchema>) {
  const { operatorId } = await getSession()
  const res = await jsonContentService.create(operatorId, values)
  if (!res) {
    return dbError
  }
  revalidatePath(`/admin/json-content`)
  return {
    isSuccess: true
  }
} 