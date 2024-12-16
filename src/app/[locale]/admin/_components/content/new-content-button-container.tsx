'use client'

import dynamic from "next/dynamic"

const NewContentBtn = dynamic(() => import('./new-content-button'), {
  ssr: false
})

type Props = {
  href: string
  label: string
}

export function NewContentBtnContainer({ href, label }: Props) {

  return (
    <NewContentBtn href={href} label={label} />
  )
}