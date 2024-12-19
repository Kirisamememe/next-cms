'use client'

import { createContext, ReactNode, SetStateAction, use, useEffect, useMemo, useState } from "react"

export type ImageFile = {
  url: string
  file: File
  uploadingState: {
    progress: number
    error?: {
      message: string
    }
  },
  abortController: AbortController
}

type ImagePickerContextType = {
  selectedUrl: string
  setSelectedUrl: React.Dispatch<SetStateAction<string>>
  selectedUrls: string[]
  setSelectedUrls: React.Dispatch<SetStateAction<string[]>>
  isSingleMode: boolean
  setIsSingleMode: React.Dispatch<SetStateAction<boolean>>
  files: ImageFile[]
  setFiles: React.Dispatch<SetStateAction<ImageFile[]>>
  expanded: boolean
  setExpanded: React.Dispatch<SetStateAction<boolean>>
}

const ImagePickerContext = createContext<ImagePickerContextType | undefined>(undefined)

type Props = {
  children: ReactNode
  initialExpanded?: boolean
}

export function ImagePickerProvider({ children, initialExpanded = false }: Props) {
  const [selectedUrl, setSelectedUrl] = useState('')
  const [selectedUrls, setSelectedUrls] = useState<string[]>([])
  const [isSingleMode, setIsSingleMode] = useState(true)
  const [files, setFiles] = useState<ImageFile[]>([])
  const [expanded, setExpanded] = useState(initialExpanded)

  useEffect(() => {
    return () => {
      setSelectedUrl('')
      setSelectedUrls([])
    }
  }, [])

  const contextValue = useMemo(() => ({
    selectedUrl,
    setSelectedUrl,
    selectedUrls,
    setSelectedUrls,
    isSingleMode,
    setIsSingleMode,
    files,
    setFiles,
    expanded,
    setExpanded
  }), [selectedUrl, selectedUrls, isSingleMode, files, expanded])

  return (
    <ImagePickerContext
      value={contextValue}>
      {children}
    </ImagePickerContext>
  )
}

export const useImagePickerContext = () => {
  const context = use(ImagePickerContext)
  if (!context) {
    throw new Error("useImagePickerContext must be used within an ImagePickerProvider")
  }
  return context
}