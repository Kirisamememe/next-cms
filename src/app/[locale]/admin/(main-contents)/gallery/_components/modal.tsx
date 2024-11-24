'use client'

import { Dialog } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function Modal({ children }: Props) {
  const router = useRouter()

  const onOpenChange = (value: boolean) => {
    if (value) return
    router.back()
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  )
}