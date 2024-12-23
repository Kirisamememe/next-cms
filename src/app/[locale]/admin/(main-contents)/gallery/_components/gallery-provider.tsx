'use client'

import { createContext, ReactNode, RefObject, SetStateAction, use, useEffect, useMemo, useRef, useState } from "react"
import { DropData, MediaFolder, ImageFile } from "@/types"
import { GRID_COOKIE_NAME } from "./gallery-grid-setting-btn"
import Cookies from "js-cookie";
import React from "react"

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
  folders: MediaFolder[],
  GRID_SIZE_SERVER: number,
}

function isServer() {
  return typeof window === 'undefined'
}

export function GalleryProvider({ children, folders, GRID_SIZE_SERVER }: Props) {
  const GRID_SIZE = isServer() ? GRID_SIZE_SERVER : Number(Cookies.get(GRID_COOKIE_NAME) || 2)

  const [droppedData, setDroppedData] = useState<DroppedData[]>([])
  const [filesDragging, setFilesDragging] = useState(false)
  const [files, setFiles] = useState<ImageFile[]>([])
  const [creatingNewFolder, setCreatingNewFolder] = useState(false)
  const [gridSize, setGridSize] = useState(GRID_SIZE)
  const dragImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // 先にimg要素作っとかないとロードが間に合わず、結局ゴースト画像が表示されてしまう
    const img = new window.Image()
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
    dragImageRef.current = img

    let dragCounter = 0

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      if (!e.dataTransfer?.types.includes('Files')) {
        return
      }
      dragCounter++
      if (dragCounter === 1) {
        setFilesDragging(true)
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()

      dragCounter--
      if (dragCounter === 0) {
        setFilesDragging(false)
      }
    }

    const handleDrop = () => {
      dragCounter = 0
      setFilesDragging(false)
    }

    document.addEventListener('dragenter', handleDragEnter)
    document.addEventListener('dragleave', handleDragLeave)
    document.addEventListener('drop', handleDrop)

    return () => {
      document.removeEventListener('dragenter', handleDragEnter)
      document.removeEventListener('dragleave', handleDragLeave)
      document.removeEventListener('drop', handleDrop)
    }
  }, [])

  const contextValue = useMemo(() => ({
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
    dragImageRef,
  }), [creatingNewFolder, droppedData, files, filesDragging, folders, gridSize])

  return (
    <GalleryContext
      value={contextValue}>
      <div
        onDragOver={e => e.preventDefault()}
        className="w-full h-full"
      >
        {children}
      </div>
    </GalleryContext>
  )
}

export const useGalleryContext = () => {
  const context = use(GalleryContext)
  if (!context) {
    throw new Error("useGalleryContext must be used within an GalleryProvider")
  }
  return context
}