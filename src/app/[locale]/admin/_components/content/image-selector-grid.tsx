'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { ImageUrlSimpleItem, MediaFolder } from "@/types"
import { useState } from "react"
import Image from "next/image"
import { Folder, FolderOutput } from "lucide-react"
import { cn } from "@/lib"

type Props = {
  selectedId: number | null
  onValueChange: (id: number) => void
  images: ImageUrlSimpleItem[]
  folders: MediaFolder[]
}

export const ImageSelectorGrid = ({ selectedId, onValueChange, images, folders }: Props) => {
  const [currentPath, setCurrentPath] = useState('.')

  const onFolderClick = (path: string) => {
    setCurrentPath(path)
  }

  const back = () => {
    setCurrentPath(currentPath.split('/').slice(0, -1).join('/'))
  }

  const handleSelect = (id: number) => {
    onValueChange(id)
  }

  const filteredFolder = folders.filter(folder => folder.parentPath === currentPath)
  const filteredImages = images.filter(image => image.folderPath === currentPath)

  return (
    <>
      {currentPath !== '.' &&
        <Button
          variant={'secondary'} size={'icon'}
          className="rounded-none w-full h-full aspect-square flex-col text-xs gap-1 bg-muted/50"
          onClick={() => back()}
        >
          <FolderOutput />
          {'../'}
        </Button>
      }
      {filteredFolder.map((folder) => (
        <Button key={folder.path}
          variant={'secondary'} size={'icon'}
          className="rounded-none w-full h-full aspect-square flex-col text-xs overflow-hidden gap-1"
          onClick={() => onFolderClick(folder.path)}
        >
          <Folder />
          <span className="text-center whitespace-pre-wrap line-clamp-2 unselectable">
            {folder.name}
          </span>
        </Button>
      ))}
      {filteredImages.map((image) => (
        <AspectRatio ratio={1} key={image.id}
          className={cn(
            "cursor-pointer hover:outline outline-2 -outline-offset-2 outline-[hsl(var(--selected2))]",
            selectedId === image.id && "outline-pulse"
          )}
          onClick={() => handleSelect(image.id)}>
          <Image
            src={image.url.replace('/upload/', '/upload/ar_1.0,c_lfill,h_768/')}
            quality={50}
            width={200} height={200} alt="image" loading='lazy'
            className="pointer-events-none object-cover object-center w-full h-full" />
        </AspectRatio>
      ))}
    </>
  )
}