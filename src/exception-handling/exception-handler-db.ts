export const dbExceptionHandler = (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.stack)
  }
  // console.error("Database Error", error)
  return null
}