'use client'

import { useParams } from "next/navigation"
import { useActionState } from "react"
import { createFolder } from "../../_actions/create"
import { FolderNameForm } from "./folder-name-form"
import { useGalleryContext } from "../gallery-provider"


export function NewFolder() {
  const params = useParams<{ folders: string[] | undefined }>()
  const { creatingNewFolder, setCreatingNewFolder } = useGalleryContext()

  const [_, action, pending] = useActionState(async (_: any, payload: FormData) => {
    const folderName = payload.get('name')?.toString()
    if (!folderName) return
    if (folderName.length > 64) {
      //バリデーション
      return
    }
    const parentPath = params.folders?.length ? decodeURIComponent(params.folders.join('/')) : '.'
    await createFolder(folderName, parentPath).then(() => {
      setCreatingNewFolder(false)
    })
  }, undefined)

  return creatingNewFolder ? (
    <div className="folder-appear">
      <FolderNameForm action={action} pending={pending} setIsEditing={setCreatingNewFolder} />
    </div>
  ) : null
}