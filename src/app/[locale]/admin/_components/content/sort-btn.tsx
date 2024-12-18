'use client'

import { Button } from "@/components/ui/button"
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const SortBtn = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortOrder = searchParams.get('sort')

  const handleSort = () => {
    const params = new URLSearchParams(searchParams)

    if (sortOrder === 'asc') {
      params.delete('sort')
    } else {
      params.set('sort', 'asc')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }


  return (
    <Button onClick={handleSort} variant={"outline"} size={"icon"} className="shrink-0 h-10">
      {sortOrder === 'asc' ? <ArrowDownNarrowWide /> : <ArrowDownWideNarrow />}
    </Button>
  )
}