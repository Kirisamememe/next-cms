'use client'

import { useParams } from "next/navigation"
import { useActionState, useState } from "react"
import { FolderNameForm } from "./folder-name-form"
import { editFolderName } from "../../_actions/update"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  path: string
  name: string
}

export function EditFolderName({ path, name }: Props) {
  const params = useParams<{ folders: string[] | undefined }>()

  const [isEditing, setIsEditing] = useState(false)

  const [_, action, pending] = useActionState(async (_: any, payload: FormData) => {
    const folderName = payload.get('name')?.toString()
    if (!folderName) return
    if (folderName.length > 64) {
      //バリデーション
      return
    }
    const parentPath = params.folders?.length ? decodeURIComponent(params.folders.join('/')) : '.'
    await editFolderName(path, folderName, parentPath).then(() => {
      setIsEditing(false)
    })
  }, undefined)


  const handleEditName = () => {
    setIsEditing(true)
  }

  return (
    <>
      {isEditing ?
        <div className="absolute inset-0 z-10">
          <FolderNameForm action={action} pending={pending} name={name} setIsEditing={setIsEditing} />
        </div>
        :
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