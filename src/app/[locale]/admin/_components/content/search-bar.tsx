'use client'

import { Input } from "@/components/ui/input"
import { usePathname } from "@/i18n"
import { Filter } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';

export const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations()

  const handleOnChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)

    if (e.target?.value) {
      params.set('search', e.target.value)
    } else {
      params.delete('search')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <>
      <Filter size={16} className="absolute left-3 top-3" />
      <Input
        className="flex-grow pl-10 rounded-lg"
        placeholder={t('article.filter')}
        onChange={handleOnChange}
      />
    </>
  )
}