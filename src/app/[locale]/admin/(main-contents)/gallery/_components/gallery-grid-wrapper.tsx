'use client'

import { GridColumn } from "@/components/ui/grid"
import { ReactNode } from "react"
import { useGalleryContext } from "./gallery-provider"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
}


export function GalleryGridWrapper({ children }: Props) {
  const { gridSize } = useGalleryContext()

  return (
    <GridColumn
      gap={0.5}
      className={cn("gap-0.5 relative",
        gridSize === 1 && "grid-cols-4 @[48rem]:grid-cols-6 @[64rem]:grid-cols-7 @[80rem]:grid-cols-8 @[96rem]:grid-cols-9",
        gridSize === 2 && "grid-cols-3 @[48rem]:grid-cols-5 @[64rem]:grid-cols-6 @[80rem]:grid-cols-7 @[96rem]:grid-cols-8",
        gridSize === 3 && "grid-cols-2 @[48rem]:grid-cols-4 @[64rem]:grid-cols-5 @[80rem]:grid-cols-6 @[96rem]:grid-cols-7",
        gridSize === 4 && "grid-cols-1 @[48rem]:grid-cols-3 @[64rem]:grid-cols-4 @[80rem]:grid-cols-5 @[96rem]:grid-cols-6",
      )}
    >
      {children}
    </GridColumn>
  )
}