'use client'

import { GridColumn } from "@/components/ui/grid"
import { ReactNode } from "react"
import { useGalleryContext } from "./gallery-provider"

type Props = {
  children: ReactNode
}


export function GalleryGridWrapper({ children }: Props) {
  const { gridSize } = useGalleryContext()

  return (
    <GridColumn
      gap={0.5}
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${gridSize}rem,1fr))` }}
      className="gap-0.5 relative transition-transform"
    >
      {children}
    </GridColumn>
  )
}