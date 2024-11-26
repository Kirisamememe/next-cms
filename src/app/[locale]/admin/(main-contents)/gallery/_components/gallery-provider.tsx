'use client'

import { createContext, ReactNode, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { ImageFile } from "./image/new-image-provider"
import { DropData } from "@/types/drop-data"
import { MediaFolder } from "@/types/media-folder-schema"

export type UploadingState = 'normal' | 'uploading' | 'finished'
export type DroppedData = {
  targetPath: string
  transferredData: DropData
}

type GalleryContextType = {
  folders: MediaFolder[]

  droppedData: DroppedData[]
  setDroppedData: React.Dispatch<SetStateAction<DroppedData[]>>

  filesDragging: boolean
  setFilesDragging: React.Dispatch<SetStateAction<boolean>>

  creatingNewFolder: boolean
  setCreatingNewFolder: React.Dispatch<SetStateAction<boolean>>

  files: ImageFile[]
  setFiles: React.Dispatch<SetStateAction<ImageFile[]>>

  gridSize: number
  setGridSize: React.Dispatch<SetStateAction<number>>

  dragImageRef: RefObject<HTMLImageElement | null>
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

type Props = {
  children: ReactNode
  folders: MediaFolder[]
}

export function GalleryProvider({ children, folders }: Props) {
  const [droppedData, setDroppedData] = useState<DroppedData[]>([])
  const [filesDragging, setFilesDragging] = useState(false)
  const [files, setFiles] = useState<ImageFile[]>([])
  const [creatingNewFolder, setCreatingNewFolder] = useState(false)
  const [gridSize, setGridSize] = useState(12)
  const dragImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // 先にimg要素作っとかないとロードが間に合わず、結局ゴースト画像が表示されてしまう
    const img = new window.Image()
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
    dragImageRef.current = img

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      if (!e.dataTransfer?.types.includes('Files')) {
        return
      }
      setFilesDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      // relatedTargetがnullまたはbody/htmlの場合は、ブラウザーの範囲外にドラッグされたとみなす
      if (!e.relatedTarget || ['HTML', 'BODY'].includes((e.relatedTarget as Element).tagName)) {
        setFilesDragging(false)
      }
    }

    document.addEventListener('dragenter', handleDragEnter)
    document.addEventListener('dragleave', handleDragLeave)
    document.addEventListener('drop', () => setFilesDragging(false))

    return () => {
      document.removeEventListener('dragenter', handleDragEnter)
      document.removeEventListener('dragleave', handleDragLeave)
      document.removeEventListener('drop', () => setFilesDragging(false))
    }
  }, [])

  return (
    <GalleryContext.Provider
      value={{
        folders,
        droppedData,
        setDroppedData,
        filesDragging,
        setFilesDragging,
        creatingNewFolder,
        setCreatingNewFolder,
        files,
        setFiles,
        gridSize,
        setGridSize,
        dragImageRef
      }}>
      <div onDragOver={e => e.preventDefault()} className="w-full h-full">
        {children}
      </div>
    </GalleryContext.Provider>
  )
}

export const useGalleryContext = () => {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error("useGalleryContext must be used within an GalleryProvider")
  }
  return context
}