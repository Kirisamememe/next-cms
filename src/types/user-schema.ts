import { object, string } from "zod"

export const editorProfileSchema = object({
  nickname: string({ required_error: "Name is required" })
    .min(1, "Name is required")
})