'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useNewImageContext } from "../new-image-provider"

type Props = {
  url: string
  inserted: boolean
}

export function ImageItem({ url, inserted }: Props) {
  const {
    selectedUrl,
    setSelectedUrl,
    selectedUrls,
    setSelectedUrls,
    isSingleMode
  } = useNewImageContext()

  const handleClickSingleMode = () => {
    if (selectedUrl === url) {
      setSelectedUrl('')
      return
    }
    setSelectedUrl(url)
  }

  const handleClickMultipleMode = () => {
    if (selectedUrls.includes(url)) {
      setSelectedUrls((prev) => prev.filter((selectedUrl) => selectedUrl !== url))
      return
    }
    setSelectedUrls((prev) => [url, ...prev])
  }

  return (
    <>
      <AspectRatio
        ratio={1} onClick={isSingleMode ? handleClickSingleMode : handleClickMultipleMode}
        className={cn(
          'cursor-pointer hover:outline outline-2 -outline-offset-2 outline-[hsl(var(--selected2))]',
          ((isSingleMode && selectedUrl === url) || (!isSingleMode && selectedUrls.includes(url))) &&
          'outline-pulse',
          inserted && "opacity-30"
        )}>
        <Image
          src={url}
          width={1000} height={1000} alt="image"
          className="object-cover object-center w-full h-full transition-transform duration-300 pointer-events-none" />
      </AspectRatio>
    </>
  )
}