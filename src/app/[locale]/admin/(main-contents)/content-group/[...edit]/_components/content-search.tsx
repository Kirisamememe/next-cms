'use client'

import { SearchBar } from "@/app/[locale]/admin/_components/content/search-bar"
import { Suspense, useEffect, useRef, useState } from "react"
import { FlexColumn } from "@/components/ui/flexbox"
import { CircleSpinLoading } from "@/components/circle-spin-loading"
import { ContentType } from "@/types"
import { useTranslations } from "next-intl"

type Props = {
  placeholder: ContentType
  query: string
  search?: string
  children: React.ReactNode
}

export const ContentSearch = ({ placeholder, query, search, children }: Props) => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const clickAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!clickAreaRef.current) return
      if (focus) return

      if (!clickAreaRef.current.contains(event.target as Node)) {
        clickAreaRef.current.animate([
          { height: `${clickAreaRef.current.offsetHeight}px`, transform: 'translateY(0)', opacity: 1 },
          { height: '0', transform: 'translateY(-15px)', opacity: 0 },
        ], { duration: 150, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => {
          setOpen(false)
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [clickAreaRef, focus])


  return (
    <>
      <SearchBar
        placeholder={t(`contentGroup.form.${placeholder}.placeholder`)}
        query={query}
        onClick={() => { setOpen(true); setFocus(true) }}
        onBlur={() => setFocus(false)}
      />
      {open && (
        <FlexColumn ref={clickAreaRef} border bg className="animate-in slide-in-from-bottom-2 absolute left-6 top-14 w-[calc(100%-3rem)] h-[calc(100%-4.5rem)] rounded-lg z-[1000]">
          <Suspense key={search} fallback={<CircleSpinLoading />}>
            {children}
          </Suspense>
        </FlexColumn>
      )}
    </>
  )
}