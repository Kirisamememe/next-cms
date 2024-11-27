'use client'

import { createContext, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react"

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

type NewImageContextType = {
  selectedUrl: string
  setSelectedUrl: React.Dispatch<SetStateAction<string>>
  selectedUrls: string[]
  setSelectedUrls: React.Dispatch<SetStateAction<string[]>>
  isSingleMode: boolean
  setIsSingleMode: React.Dispatch<SetStateAction<boolean>>
  files: ImageFile[]
  setFiles: React.Dispatch<SetStateAction<ImageFile[]>>
  imageUrls: string[]
}

const NewImageContext = createContext<NewImageContextType | undefined>(undefined)

type Props = {
  children: ReactNode
  imageUrls: string[]
}

export function NewImageProvider({ children, imageUrls }: Props) {
  const [selectedUrl, setSelectedUrl] = useState('')
  const [selectedUrls, setSelectedUrls] = useState<string[]>([])
  const [isSingleMode, setIsSingleMode] = useState(true)
  const [files, setFiles] = useState<ImageFile[]>([])

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
    imageUrls
  }), [selectedUrl, selectedUrls, isSingleMode, files, imageUrls])

  return (
    <NewImageContext.Provider
      value={contextValue}>
      {children}
    </NewImageContext.Provider>
  )
}

export const useNewImageContext = () => {
  const context = useContext(NewImageContext)
  if (!context) {
    throw new Error("useNewImageContext must be used within an NewImageProvider")
  }
  return context
}