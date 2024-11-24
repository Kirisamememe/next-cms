'use client'

import { useParams, useRouter } from "next/navigation"
import { useActionState, useState } from "react"
import { usePathname } from "@/i18n/routing"
import { FolderNameForm } from "./folder-name-form"
import { editFolderName } from "../../_actions/update"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  path: string
  name: string
}

export function EditFolderName({ path, name }: Props) {
  const router = useRouter()
  const params = useParams<{ folders: string[] | undefined }>()
  const pathname = usePathname()

  const [isEditing, setIsEditing] = useState(false)

  const [_, action] = useActionState(async (_: any, payload: FormData) => {
    const folderName = payload.get('name')?.toString()
    if (!folderName) {
      return
    }
    const parentPath = params.folders?.length ? decodeURIComponent(params.folders.join('/')) : null
    await editFolderName(path, folderName, parentPath)
      .then(() => router.push(pathname))
  }, undefined)


  const handleEditName = () => {
    setIsEditing(true)
  }

  return (
    <>
      {isEditing ?
        <form action={action} className={"group absolute inset-0 flex flex-col p-4 w-full aspect-square gap-2 justify-center bg-muted transition-all z-50"}>
          <FolderNameForm name={name} setIsEditing={setIsEditing} />
        </form> :
        <Button
          variant={'secondary'} size={'icon'}
          onClick={handleEditName}
          className="group-hover:inline-flex hidden absolute top-2 right-2 rounded-full bg-background/50 size-8 hover:bg-background/30 z-50">
          <PenLine size={16} />
        </Button>
      }
    </>
  )
}