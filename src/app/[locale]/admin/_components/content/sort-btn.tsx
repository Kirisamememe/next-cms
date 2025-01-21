'use client'

import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

export const SortBtn = () => {
  const t = useTranslations()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortOrder = searchParams.get('sort')
  const orderby = searchParams.get('orderby')

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    const newOrderby = value.split('|')[0]
    const newSort = value.split('|')[1]

    if (newSort === 'desc') {
      params.delete('sort')
    } else {
      params.set('sort', 'asc')
    }

    if (newOrderby === 'updatedAt') {
      params.delete('orderby')
    } else {
      params.set('orderby', newOrderby)
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select defaultValue={`${orderby || 'updatedAt'}|${sortOrder || 'desc'}`} onValueChange={handleValueChange}>
      <SelectTrigger className="size-10 p-2 gap-4 hover:bg-muted">
        <span className="shrink-0">
          {sortOrder === 'asc' ? <ArrowDownNarrowWide size={20} /> : <ArrowDownWideNarrow size={20} />}
        </span>
      </SelectTrigger>
      <SelectContent align="end" sideOffset={4} className="w-44">
        <SelectGroup>
          <SelectLabel>{t('common.orderBy.desc')}</SelectLabel>
          <SelectItem value="updatedAt|desc" className="[&>span]:right-1">
            {t('common.orderBy.updatedAt')}
          </SelectItem>
          <SelectItem value="createdAt|desc" className="[&>span]:right-1">
            {t('common.orderBy.createdAt')}
          </SelectItem>
        </SelectGroup>
        <Separator className="my-1 -translate-x-1 w-[calc(100%+0.5rem)]" />
        <SelectGroup>
          <SelectLabel>{t('common.orderBy.asc')}</SelectLabel>
          <SelectItem value="updatedAt|asc">
            {t('common.orderBy.updatedAt')}
          </SelectItem>
          <SelectItem value="createdAt|asc">
            {t('common.orderBy.createdAt')}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}