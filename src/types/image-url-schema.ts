import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

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
// const MAX_IMAGE_SIZE = Number(process.env.MAX_IMAGE_SIZE);
// const MB_TO_BYTE = 1024 * 1024

// const validateImageSize = (file: File) => {
//   return file.size <= MAX_IMAGE_SIZE * MB_TO_BYTE;
// }

const validateImageType = (files: File[]) => {
  return !files.some((file) => !IMAGE_TYPES.includes(file.type));
}


export const imageFilesSchema = z.object({
  images: z.custom<File[]>()
    .refine(validateImageType, { message: '' })
})