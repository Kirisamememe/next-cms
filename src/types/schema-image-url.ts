import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { EditorConcise } from "./schema-editor";

export const imageUrlSchema = z.object({
  name: z.string().max(32, '32文字以下で入力してください').default(createId()),
  url: z.string().min(1, '1文字以上512文字以下で入力してください').max(512, '1文字以上512文字以下で入力してください'),
  archivedAt: z.date().nullish(),
  folderPath: z.string().default('.')
})

export const multipleImageUrlSchema = z.object({
  urls: z.array(z.string()).min(1, 'URLを1つ以上入力してください').max(512, ''),
  folderPath: z.string().default('.')
})



const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];


const validateImageType = (files: File[]) => {
  return !files.some((file) => !IMAGE_TYPES.includes(file.type));
}


export const imageFilesSchema = z.object({
  images: z.custom<File[]>()
    .refine(validateImageType, { message: '' })
})




export type ImageUrl = {
  id: number
  name: string
  url: string

  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null

  folderPath: string
  authorId: number
  lastEditedBy: number

  author?: EditorConcise
}


export type ImageFile = {
  url: string
  file: File
  uploadingState: {
    progress: number
    error?: {
      message: string
    }
  },
  abortController: AbortController
}