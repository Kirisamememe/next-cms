'use client'

import { Button } from "@/components/ui/button"
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const SortBtn = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const router = useRouter()

  const handleSort = () => {
    if (sortOrder === 'asc') {
      router.replace(`?sort=desc`)
      setSortOrder('desc')
    } else {
      router.replace(`?sort=asc`)
      setSortOrder('asc')
    }
  }


  return (
    <Button onClick={handleSort} variant={"outline"} size={"icon"} className="shrink-0 h-10">
      {sortOrder === 'asc' ? <ArrowDownNarrowWide /> : <ArrowDownWideNarrow />}
    </Button>
  )
}