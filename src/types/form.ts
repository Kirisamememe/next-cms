export type FormState = {
  isSuccess: boolean,
  error?: {
    message: string
  }
}

export const dbError = {
  isSuccess: false,
  error: {
    message: "common.form.databaseError"
  }
}