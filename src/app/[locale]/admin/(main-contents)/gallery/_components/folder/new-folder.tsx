'use client'

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { createFolder } from "../../_actions/create"
import { usePathname } from "@/i18n/routing"
import { FolderNameForm } from "./folder-name-form"


export function NewFolder() {
  const router = useRouter()
  const params = useParams<{ folders: string[] | undefined }>()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const query = searchParams.get('query')

  const [_, action, pending] = useActionState(async (_: any, payload: FormData) => {
    const folderName = payload.get('name')?.toString()
    if (!folderName) {
      return
    }
    const parentPath = params.folders?.length ? decodeURIComponent(params.folders.join('/')) : null
    await createFolder(folderName, parentPath)
      .then(() => router.push(pathname))
  }, undefined)

  if (!query || query !== 'newFolder') {
    return null
  }

  return (
    <form action={action} className="folder-appear flex flex-col p-4 w-full aspect-square gap-2 justify-center bg-muted/60 transition-all">
      <FolderNameForm pending={pending} />
    </form>
  )
}