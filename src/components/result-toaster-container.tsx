'use client'

import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('./result-toaster'), {
  ssr: false
})

export function ResultToaster() {
  return <Toaster />
}