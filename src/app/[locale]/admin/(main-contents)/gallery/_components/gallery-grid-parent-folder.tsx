'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { FolderOutput } from "lucide-react";
import { useDraggableItem } from "../_hooks/use-draggable-item";
import { useCallback } from "react";
import { updateFolderPath } from "../_actions/update";
import { useGalleryContext } from "./gallery-provider";


type Props = {
  href: string
  name: string
  path: string
}

export function ParentFolderItem({ href, name, path }: Props) {

  const { itemsDragging } = useGalleryContext()

  const onDrop = useCallback(async (targetPath: string) => {
    return await updateFolderPath(path, name, targetPath)
  }, [name, path])

  const { dropAreaProps } = useDraggableItem({
    dropData: { data: path, type: 'folder' },
    onDrop
  })

  return (
    <div className="relative aspect-square">
      {itemsDragging && <div {...dropAreaProps} />}
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