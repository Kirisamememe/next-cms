'use client'

import { createPortal } from "react-dom"
import { FlexColumn } from "./ui/flexbox"
import { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

export const Modal = ({ children }: Props) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return createPortal(
    <FlexColumn center className="animate-in fade-in-0 fixed inset-0 w-screen h-screen z-50 bg-background/80">
      <div className="relative outline outline-1 outline-black/0 dark:outline-black/80 rounded-3xl w-fit bg-background">
        <div className="before:rounded-3xl before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] before:dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:z-10 before:pointer-events-none" />
        {children}
      </div>
    </FlexColumn>,
    document.body
  )
}