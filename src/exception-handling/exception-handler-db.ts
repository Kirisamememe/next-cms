export const dbExceptionHandler = (error: unknown) => {
  console.error("Database Error", error)
  return null
}