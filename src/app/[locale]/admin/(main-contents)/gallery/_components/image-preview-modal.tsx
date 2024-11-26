
'use client'

import { Flexbox } from '@/components/ui/flexbox'
import { useRouter } from 'next/navigation'
import { ReactNode } from "react"
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
}

export function ImagePreviewModal({ children }: Props) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    router.back()
  }


  return createPortal(
    <Flexbox center className='fixed top-0 left-0 w-screen h-screen bg-black/90 z-[500]'>
      <div className='popover z-[501]'>
        {children}
      </div>
      <div
        onClickCapture={handleClick}
        className="absolute top-0 left-0 w-full h-full cursor-pointer"
      />
    </Flexbox>,
    document.body
  )
}