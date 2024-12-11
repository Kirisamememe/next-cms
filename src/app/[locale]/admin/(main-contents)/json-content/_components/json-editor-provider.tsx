'use client'

import { createContext, RefObject, use, useEffect, useMemo, useRef, useState } from "react"

type JsonEditorContextType = {
  dragImageRef: RefObject<HTMLImageElement | null>
  dataTransferred: string[]
  setDataTransferred: React.Dispatch<React.SetStateAction<string[]>>
}


const JsonEditorContext = createContext<JsonEditorContextType | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

export function JsonEditorProvider({ children }: Props) {
  const [dataTransferred, setDataTransferred] = useState<string[]>([])

  const dragImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new window.Image()
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
    dragImageRef.current = img
  }, [])

  const value = useMemo(() => ({
    dragImageRef,
    dataTransferred,
    setDataTransferred
  }), [dataTransferred])

  return (
    <JsonEditorContext value={value}>
      {children}
    </JsonEditorContext>
  )
}


export function useJsonEditor() {
  const context = use(JsonEditorContext)
  if (!context) {
    throw new Error("useJsonEditor must be used within an JsonEditorProvider")
  }
  return context
}