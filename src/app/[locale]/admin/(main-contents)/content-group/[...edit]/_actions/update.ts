'use server'

import { contentGroupService } from "@/di/services";
import { getSession } from "@/lib-server-only";
import { contentGroupSchema } from "@/types";
import { z } from "zod";

export async function updateContentGroup(groupId: number, values: z.infer<typeof contentGroupSchema>) {
  const { operatorId } = await getSession()

  const result = contentGroupSchema.safeParse(values)
  if (!result.success) {
    return {
      isSuccess: false,
      error: {
        message: 'common.form.invalidData'
      },
      errors: result.error.flatten().fieldErrors
    }
  }

  const res = await contentGroupService.update(groupId, operatorId, values)
  if (!res) {
    return { isSuccess: false, error: { message: "common.form.databaseError" } }
  }

  return { isSuccess: true }
}