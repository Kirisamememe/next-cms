'use client'

import { Link } from "@/i18n/routing"
import { ImageUrl } from "@/types/image"
import { useDraggableItem } from "../_hooks/use-draggable-item"
import { useCallback } from "react"
import { updateImageUrlFolder } from "../_actions/update"
import { FlexColumn } from "@/components/ui/flexbox"
import { EditSingleImage } from "./edit-single-image"
import { Badge } from "@/components/ui/badge"
import { GalleryImageItem } from "./image-item"


type Props = {
  imageUrl: ImageUrl
}

export function GalleryItem({ imageUrl }: Props) {

  const onDrop = useCallback(async (targetPath: string) => {
    return await updateImageUrlFolder(imageUrl.id, targetPath)
  }, [imageUrl.id])

  const { isDragging, draggableItemProps } = useDraggableItem({ dropData: { data: imageUrl.id.toString(), type: 'image' }, onDrop })

  return (
    <div {...draggableItemProps} >

      <Link href={`/admin/gallery/preview/${imageUrl.id}`} scroll={false} draggable={false}>
        <GalleryImageItem url={imageUrl.url} />
      </Link>

      {!isDragging && (
        <>
          <EditSingleImage imageUrl={imageUrl} />
          <FlexColumn
            px={4} py={2}
            className="absolute bottom-0 left-0 group-hover:flex hidden bg-gradient-to-t from-black/80 to-black/0 w-full h-16 text-sm font-semibold justify-end">
            <Badge className="-ml-0.5 w-fit h-fit rounded-sm px-1 py-0 group-hover:flex hidden bg-black/50" variant={'secondary'}>
              {imageUrl.id}
            </Badge>
            <span className="truncate h-fit">
              {imageUrl.name}
            </span>
          </FlexColumn>
        </>
      )}

    </div>
  )
}