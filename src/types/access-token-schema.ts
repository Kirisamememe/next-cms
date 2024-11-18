import { Editor } from "./editor-schema"

export type AccessToken = {
  token: string
  name: string
  createdAt: Date
  expiresAt: Date
  author?: Editor
}