'use client'

import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
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

  droppedImage: string
  setDroppedImage: React.Dispatch<SetStateAction<string>>
  droppedFolder: string
  setDroppedFolder: React.Dispatch<SetStateAction<string>>
  droppedData: DroppedData[]
  setDroppedData: React.Dispatch<SetStateAction<DroppedData[]>>

  filesDragging: boolean
  setFilesDragging: React.Dispatch<SetStateAction<boolean>>

  files: ImageFile[]
  setFiles: React.Dispatch<SetStateAction<ImageFile[]>>
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

type Props = {
  children: ReactNode
  folders: MediaFolder[]
}

export function GalleryProvider({ children, folders }: Props) {
  const [droppedImage, setDroppedImage] = useState<string>('')
  const [droppedFolder, setDroppedFolder] = useState<string>('')
  const [droppedData, setDroppedData] = useState<DroppedData[]>([])

  const [filesDragging, setFilesDragging] = useState(false)
  const [files, setFiles] = useState<ImageFile[]>([])

  useEffect(() => {
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

        droppedImage,
        setDroppedImage,
        droppedFolder,
        setDroppedFolder,
        droppedData,
        setDroppedData,

        filesDragging,
        setFilesDragging,
        files,
        setFiles
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