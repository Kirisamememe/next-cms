'use client'

import { Tabs } from "@/components/ui/tabs"
import { ReactNode } from "react"
import { useImagePickerContext } from "./image-picker-provider"

type Props = {
  children: ReactNode
}

export function NewImageFormTabsContainer({ children }: Props) {
  const { isSingleMode, setIsSingleMode } = useImagePickerContext()

  const onValueChange = (value: string) => {
    if (value === 'multiple') {
      setIsSingleMode(false)
      return
    }
    setIsSingleMode(true)
  }

  return (
    <Tabs onValueChange={onValueChange} defaultValue={isSingleMode ? 'single' : 'multiple'} className="flex flex-col gap-4 w-80 shrink-0">
      {children}
    </Tabs>
  )
}