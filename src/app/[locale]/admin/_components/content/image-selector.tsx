import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ImageUrlSimpleItem, MediaFolder } from "@/types"
import { use, useEffect } from "react"
import { ImageSelectorGrid } from "./image-selector-grid"
import { GridColumn } from "@/components/ui/grid"
import Image from "next/image"

type Props = {
  selectedId: number | null
  onValueChange: (id: number) => void
  images: Promise<ImageUrlSimpleItem[]>
  folders: Promise<MediaFolder[]>
}

export const ImageSelector = ({ selectedId, onValueChange, images, folders }: Props) => {
  const _images = use(images)
  const _folders = use(folders)
  const currenImg = _images.find(image => image.id === selectedId)

  useEffect(() => {

  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        {currenImg ? (
          <div className="w-full h-40 cursor-pointer rounded-md overflow-hidden hover:opacity-60">
            <Image
              src={currenImg.url}
              quality={75}
              width={1000} height={1000} alt="image" loading='lazy'
              className="pointer-events-none object-cover object-center w-full h-full" />
          </div>
        ) : (
          <Button variant={'outline'} className="w-full bg-card h-40">
            Select Image
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2 rounded-xl">
        <ScrollArea className="h-[28rem] rounded-md">
          <GridColumn grid={3} className="gap-0.5">
            <ImageSelectorGrid selectedId={selectedId} onValueChange={onValueChange} images={_images} folders={_folders} />
          </GridColumn>
          <ScrollBar />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}