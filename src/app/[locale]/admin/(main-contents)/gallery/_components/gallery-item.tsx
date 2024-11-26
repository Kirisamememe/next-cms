'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { ImageUrl } from "@/types/image"
import { useDraggableItem } from "../_hooks/use-draggable-item"
import { useCallback } from "react"
import { updateImageUrlFolder } from "../_actions/update"
import { FlexColumn } from "@/components/ui/flexbox"
import { EditSingleImage } from "./edit-single-image"
import { Badge } from "@/components/ui/badge"


type Props = {
  imageUrl: ImageUrl
}

export function GalleryItem({ imageUrl }: Props) {

  const onDrop = useCallback(async (targetPath: string) => {
    return await updateImageUrlFolder(imageUrl.id, targetPath)
  }, [imageUrl.id])

  const { isDragging, props } = useDraggableItem({ dropData: { data: imageUrl.id.toString(), type: 'image' }, onDrop })

  return (
    <div {...props} >

      <Link href={`/admin/gallery/preview/${imageUrl.id}`} scroll={false} draggable={false}>
        <AspectRatio ratio={1}>
          <Image
            src={imageUrl.url}
            quality={20} draggable={false}
            width={1000} height={1000} alt="image" loading='lazy'
            className="pointer-events-none object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105" />
        </AspectRatio>
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