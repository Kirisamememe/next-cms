'use server'

import { articleCategoryService, jsonContentCategoryService } from "@/di/services";
import { getSession } from "@/lib-server-only";
import { FormState } from "@/types";
import { categorySchema } from "@/types/schema-category";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createArticleCategory(
  values: z.infer<typeof categorySchema>
): Promise<FormState> {
  await getSession()
  const res = await articleCategoryService.create(values)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Create article category failed"
      }
    }
  }
  revalidatePath('/admin/articles', 'layout')
  return {
    isSuccess: true
  }
}

export async function createJsonContentCategory(
  values: z.infer<typeof categorySchema>
): Promise<FormState> {
  await getSession()
  const res = await jsonContentCategoryService.create(values)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Create JSON content category failed"
      }
    }
  }
  revalidatePath('/admin/json-content')
  return {
    isSuccess: true
  }
}