'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Folder, FolderOpen, FolderOutput } from "lucide-react";
import { useDraggableItem } from "../_hooks/use-draggable-item";
import { useCallback } from "react";
import { updateFolderPath } from "../_actions/update";
import { EditFolderName } from "./folder.tsx/edit-folder-name";


type Props = {
  href: string
  name: string
  path: string
  isParent?: boolean
}

export function FolderItem({ href, name, path, isParent = false }: Props) {

  const onDrop = useCallback(async (targetPath: string) => {
    return await updateFolderPath(path, name, targetPath)
  }, [name, path])

  const { isDragging, isDragOver, props } = useDraggableItem({
    dropData: { data: path, type: 'folder' },
    acceptable: true,
    onDrop
  })

  if (isParent) {
    return (
      <div {...props} draggable={false}>
        <Link href={href} draggable={false} prefetch>
          <Button
            variant={'secondary'}
            className={"flex-col w-full h-full rounded-none bg-muted/50 text-muted-foreground"}>
            <FolderOutput size={64} />
            {name}
          </Button>
        </Link>
      </div>
    )
  }


  return (
    <div className="group relative">
      {!isDragging &&
        <EditFolderName path={path} name={name} />
      }
      <div {...props}>
        <Link href={href} draggable={false} prefetch>
          <Button
            variant={'secondary'}
            className={"flex-col w-full h-full rounded-none"}>
            {isDragOver ? <FolderOpen size={64} /> : <Folder size={64} />}
            {name}
          </Button>
        </Link>
      </div>
    </div>
  )
}