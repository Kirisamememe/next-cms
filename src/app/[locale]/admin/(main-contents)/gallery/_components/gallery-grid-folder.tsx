'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Folder, FolderOpen } from "lucide-react";
import { useDraggableItem } from "../_hooks/use-draggable-item";
import { useCallback } from "react";
import { updateFolderPath } from "../_actions/update";
import { EditFolderName } from "./folder/edit-folder-name";
import { cn } from "@/lib/utils";
import { useGalleryContext } from "./gallery-provider";
import { FlexColumn } from "@/components/ui/flexbox";


type Props = {
  href: string
  name: string
  path: string
}

export function FolderItem({ href, name, path }: Props) {

  const { gridSize, itemsDragging } = useGalleryContext()

  const onDrop = useCallback(async (targetPath: string) => {
    return await updateFolderPath(path, name, targetPath)
  }, [name, path])

  const { isDragging, isDragOver, draggableItemProps, dropAreaProps } = useDraggableItem({
    dropData: { data: path, type: 'folder' },
    onDrop
  })

  return (
    <div className={"group relative"}>
      {!isDragging &&
        <EditFolderName path={path} name={name} />
      }

      <div {...draggableItemProps}>
        {itemsDragging && (
          <div {...dropAreaProps} />
        )}

        <Link href={href} draggable={false} prefetch>
          <Button
            variant={'secondary'}
            className={cn(
              "flex-col w-full h-full rounded-none gap-1 [&>svg]:mt-4 unselectable p-1",
              isDragging && "active:scale-100"
            )}>
            <FlexColumn
              center
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
            <span className={cn(
              "h-10 w-full text-center whitespace-pre-wrap line-clamp-2 unselectable text-sm px-1 shrink-0",
              gridSize === 1 && "text-xs h-8",
              gridSize === 2 && "text-xs h-8 @[40rem]:text-sm @[40rem]:h-10",
              gridSize === 4 && "text-base h-12"
            )}>
              {name}
            </span>
          </Button>
        </Link>
      </div>

    </div>
  )
}