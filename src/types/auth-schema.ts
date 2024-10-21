import { object, string } from "zod"

export const signInSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required"),
})

export const signUpSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(16, "Name must be less than 16 characters"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})