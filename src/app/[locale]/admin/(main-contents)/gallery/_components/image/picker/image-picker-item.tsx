'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib"
import Image from "next/image"
import { useImagePickerContext } from "../image-picker-provider"

type Props = {
  url: string
}

export function ImageItem({ url }: Props) {
  const {
    selectedUrl,
    setSelectedUrl,
    selectedUrls,
    setSelectedUrls,
    isSingleMode
  } = useImagePickerContext()

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
          'outline-pulse'
        )}>
        <Image
          src={url.replace('/upload/', '/upload/ar_1.0,c_lfill,h_256/')} quality={80} placeholder='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
          width={100} height={100} alt="image" loading='lazy'
          className="object-cover object-center w-full h-full transition-transform duration-300 pointer-events-none" />
      </AspectRatio>
    </>
  )
}