'use server'

import { jsonContentService } from "@/di/services";
import { getSession } from "@/lib-server-only";
import { jsonContentSchema } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createJsonContent(values: z.infer<typeof jsonContentSchema>) {
  const { operatorId } = await getSession()
  const res = await jsonContentService.create(operatorId, values)
  if (!res) {
    redirect('/admin/json-content?formError=common.form.databaseError')
  }
  revalidatePath(`/admin/json-content`)
  return res
} 