import { EditorConcise } from "./schema-editor"

export type AccessToken = {
  token: string
  name: string
  createdAt: Date
  expiresAt: Date
  author?: EditorConcise
}