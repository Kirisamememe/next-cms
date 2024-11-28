
'use client'

import { Button } from '@/components/ui/button'
import { Flexbox } from '@/components/ui/flexbox'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode } from "react"
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
}

export function ImagePreviewModal({ children }: Props) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    router.back()
  }


  return createPortal(
    <Flexbox center className='fixed top-0 left-0 w-screen h-screen bg-black/90 z-[100]'>
      <Button
        variant={'secondary'} size={'icon'} onClick={handleClick}
        className={'[&>svg]:size-8 absolute top-8 right-8 rounded-full p-6 z-[102]'}>
        <X />
      </Button>
      <div className='popover z-[101]'>
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