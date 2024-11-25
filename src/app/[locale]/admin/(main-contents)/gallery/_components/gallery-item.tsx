'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { ImageUrl } from "@/types/image"
import { useDraggableItem } from "../_hooks/use-draggable-item"
import { useCallback } from "react"
import { updateImageUrlFolder } from "../_actions/update"
import { FlexRow } from "@/components/ui/flexbox"
import { EditSingleImage } from "./edit-single-image"

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
            quality={20}
            width={1000} height={1000} alt="image" loading='lazy'
            className="pointer-events-none object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105" />
        </AspectRatio>
      </Link>

      {!isDragging && (
        <>
          <EditSingleImage imageUrl={imageUrl} />
          <FlexRow
            px={4} py={2}
            className="absolute bottom-0 left-0 group-hover:flex hidden bg-gradient-to-t from-black/80 to-black/0 w-full h-12 text-sm font-semibold items-end">
            <span className="truncate h-fit">
              {imageUrl.name}
            </span>
          </FlexRow>
        </>
      )}

    </div>
  )
}