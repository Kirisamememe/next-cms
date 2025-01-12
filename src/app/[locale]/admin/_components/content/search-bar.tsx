'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname } from "@/i18n"
import { Filter, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';
import { useRef } from "react"

export const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations()
  const searchStr = searchParams.get('search')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)

    if (e.target?.value) {
      params.set('search', e.target.value)
    } else {
      params.delete('search')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  const clear = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    router.replace(`${pathname}?${params.toString()}`)

    if (!inputRef.current) return
    inputRef.current.value = ''
  }

  return (
    <>
      <Filter size={16} className="absolute left-3 top-3" />
      <Input
        ref={inputRef}
        className="flex-grow pl-10 rounded-lg"
        placeholder={t('article.filter')}
        onChange={handleOnChange}
        defaultValue={searchStr?.toString()}
      />
      {searchStr &&
        <Button variant={'ghost'} size={'icon'} className="absolute right-14 size-8 top-1 rounded-md hover:bg-foreground/10" onClick={clear}>
          <X size={16} />
        </Button>
      }
    </>
  )
}