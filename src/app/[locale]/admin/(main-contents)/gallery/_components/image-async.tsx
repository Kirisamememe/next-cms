'use client'

import { cn } from "@/lib"
import Image from "next/image"
import { useState } from "react"

type Props = {
  url: string
}

export function AsyncImage({ url }: Props) {
  const [loading, setLoading] = useState(true)

  return (
    <div className={cn(
      loading && "square-move-3 scale-150"
    )}>
      <Image
        src={url}
        width={1280} height={1280} alt="image"
        className={"object-contain object-center w-fit h-fit max-w-screen max-h-screen z-[500]"}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}