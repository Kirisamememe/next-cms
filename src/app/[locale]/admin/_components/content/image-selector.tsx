import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ImageUrlSimpleItem, MediaFolder } from "@/types"
import { use, useState } from "react"
import { ImageSelectorGrid } from "./image-selector-grid"
import { GridColumn } from "@/components/ui/grid"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { FlexRow } from "@/components/ui/flexbox"
import { Trash2, UndoDot } from "lucide-react"

type Props = {
  selectedId: number | null
  onValueChange: (id: number | null) => void
  images: Promise<ImageUrlSimpleItem[]>
  folders: Promise<MediaFolder[]>
}

export const ImageSelector = ({ selectedId, onValueChange, images, folders }: Props) => {
  const _images = use(images)
  const _folders = use(folders)
  const currenImg = _images.find(image => image.id === selectedId)
  const t = useTranslations()

  const [defaultId] = useState(selectedId ?? null)

  const clear = () => {
    onValueChange(null)
  }

  const reset = () => {
    onValueChange(defaultId)
  }

  return (
    <Popover>
      <div className="relative">
        <PopoverTrigger asChild>
          {currenImg ? (
            <div className="w-full h-40 cursor-pointer rounded-md overflow-hidden hover:opacity-60 transition-opacity">
              <Image
                src={currenImg.url}
                quality={75}
                width={1000} height={1000} alt="image" loading='lazy'
                className="pointer-events-none object-cover object-center w-full h-full"
              />
            </div>
          ) : (
            <Button variant={'outline'} className="w-full bg-card h-40">
              {t('common.form.selectImage')}
            </Button>
          )}
        </PopoverTrigger>
        <FlexRow gap={2} className="absolute top-1.5 right-1.5 p-1 z-50">
          {selectedId &&
            <Button type="button" variant={'secondary'} size={'icon'} className="size-9 flex-1 bg-background/50  backdrop-blur-md rounded-full" onClick={clear}>
              <Trash2 size={20} />
            </Button>
          }
          {defaultId && selectedId !== defaultId &&
            <Button type="button" variant={'secondary'} size={'icon'} className="size-9 flex-1 bg-background/50 backdrop-blur-md rounded-full" onClick={reset}>
              <UndoDot size={20} />
            </Button>
          }
        </FlexRow>
      </div>
      <PopoverContent className="w-[22rem] p-2 rounded-xl">
        <ScrollArea className="h-[28rem] rounded-md">
          <GridColumn grid={3} className="gap-0.5">
            <ImageSelectorGrid selectedId={selectedId} onValueChange={onValueChange} images={_images} folders={_folders} />
          </GridColumn>
          <ScrollBar />
        </ScrollArea>
        <FlexRow gap={2} className="mt-2">
          <PopoverClose asChild>
            <Button variant={'secondary'} className="flex-1">
              {t('common.close')}
            </Button>
          </PopoverClose>
        </FlexRow>
      </PopoverContent>
    </Popover>
  )
}