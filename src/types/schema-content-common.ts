import { z } from "zod";

export const publicationDateTimeForm = z.object({
  publishedAt: z.date().nullish()
})
