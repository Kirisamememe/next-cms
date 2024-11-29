export type ServiceResponse<T> = {
  data?: T
  error?: ServiceErrorResponse
}

export type ServiceErrorResponse = {
  message: string
  detail?: Error
}