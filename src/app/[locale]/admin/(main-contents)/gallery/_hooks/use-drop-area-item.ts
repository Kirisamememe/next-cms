import { cn } from "@/lib"
import { DropData } from "@/types"
import { useCallback, useMemo, useState } from "react"
import { useGalleryContext } from "../_components/gallery-provider"

type Props = {
  areaData: string
}

export function useDropAreaItem({ areaData }: Props) {
  const [isDragOver, setIsDragOver] = useState(false)

  const {
    setDroppedData,
  } = useGalleryContext()


  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])


  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])


  /**
   * 要素が落とされた際、受け取る側が、落とされたデータをステート管理に登録する
   */
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const data: DropData = JSON.parse(e.dataTransfer.getData('text/plain'))
    setDroppedData((prev) => [...prev, {
      targetPath: areaData,
      transferredData: data
    }])

  }, [areaData, setDroppedData])

  const dropAreaClassNames = useMemo(() => (cn(
    isDragOver && "[transition:none] outline outline-blue-600 outline-4 -outline-offset-4 rounded-md",
  )), [isDragOver])

  const dropAreaHandlers = useMemo(() => ({
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  }), [handleDragEnter, handleDragLeave, handleDrop])

  return {
    isDragOver,
    dropAreaClassNames,
    dropAreaHandlers
  }
}