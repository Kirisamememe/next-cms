'use client'

import { GridColumn } from "@/components/ui/grid"
import { ImageItem } from "./new-image-picker-item"
import { useNewImageContext } from "../new-image-provider"

type Props = {
  urls: string[]
}

export function NewImagePickerGrid({ urls }: Props) {
  const { imageUrls } = useNewImageContext()
  const [inserted, notInserted] = urls.reduce<[string[], string[]]>(
    ([ins, notIns], url) => {
      if (imageUrls.includes(url)) {
        return [[...ins, url], notIns]
      }
      return [ins, [...notIns, url]]
    },
    [[], []]
  )
  const sortedUrls = [...notInserted, ...inserted]

  return (
    <GridColumn grid={4} gap={0.5} className="rounded-lg overflow-hidden mb-24">
      {sortedUrls.map((url) => (
        <ImageItem key={url} url={url} inserted={imageUrls.includes(url)} />
      ))}
    </GridColumn>
  )
}