'use client'

import { Input } from "@/components/ui/input"
import { usePathname } from "@/i18n"
import { Filter } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      router.replace(pathname)
      return
    }
    router.replace(`/admin/articles?search=${e.currentTarget.value}`)
  }

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