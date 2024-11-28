'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { Folder, FolderOpen } from "lucide-react";
import { useDraggableItem } from "../_hooks/use-draggable-item";
import { useCallback } from "react";
import { updateFolderPath } from "../_actions/update";
import { EditFolderName } from "./folder/edit-folder-name";
import { cn } from "@/lib";
import { useGalleryContext } from "./gallery-provider";
import { FlexColumn } from "@/components/ui/flexbox";
import { useDropAreaItem } from "../_hooks/use-drop-area-item";


type Props = {
  href: string
  name: string
  path: string
}

export function FolderItem({ href, name, path }: Props) {

  const { gridSize } = useGalleryContext()

  const onDrop = useCallback(async (targetPath: string) => {
    return await updateFolderPath(path, name, targetPath)
  }, [name, path])

  const { draggableHandlers, draggableClassNames } = useDraggableItem({
    dropData: { data: path, type: 'folder' },
    onDrop
  })

  const { isDragOver, dropAreaHandlers, dropAreaClassNames } = useDropAreaItem({
    areaData: path
  })

  return (
    <div {...draggableHandlers} {...dropAreaHandlers}
      className={cn(
        "group relative overflow-hidden aspect-square",
        draggableClassNames,
        dropAreaClassNames
      )}>

      <EditFolderName path={path} name={name} />

      <Link href={href} draggable={false} prefetch>
        <Button
          variant={'secondary'}
          className={cn(
            "flex-col w-full h-full rounded-none gap-1 [&>svg]:mt-4 unselectable p-1 active:scale-100 [&>div]:pointer-events-none"
          )}>
          <FlexColumn
            className={cn(
              "[&>svg]:w-full [&>svg]:h-full [&>svg]:flex-grow w-fit h-fit mt-3",
              gridSize === 1 && "[&>svg]:w-6 @[32rem]:[&>svg]:size-10 @[64rem]:[&>svg]:size-12",
              gridSize === 2 && "[&>svg]:size-8 @[32rem]:[&>svg]:size-10 @[64rem]:[&>svg]:size-14",
              gridSize === 3 && "[&>svg]:size-14 @[32rem]:[&>svg]:size-16 @[64rem]:[&>svg]:size-20",
              gridSize === 4 && "[&>svg]:size-16 @[32rem]:[&>svg]:size-20 @[64rem]:[&>svg]:size-24",
            )}
          >
            {isDragOver ?
              <FolderOpen /> :
              <Folder />
            }
          </FlexColumn>
          <div className={cn(
            "h-10 w-full text-center whitespace-pre-wrap line-clamp-2 unselectable text-sm px-1 shrink-0",
            gridSize === 1 && "text-xs h-8",
            gridSize === 2 && "text-xs h-8 @[40rem]:text-sm @[40rem]:h-10",
            gridSize === 4 && "text-base h-12"
          )}>
            {name}
          </div>
        </Button>
      </Link>
    </div>
  )
}