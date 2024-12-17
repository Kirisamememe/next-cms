'use client'

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib"
import { FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { getLocaleForFns } from "@/i18n"
import { DateTimePicker } from "../../../../../components/datetime-picker"


type Props = {
  value?: Date | null
  onChange: (...event: any[]) => void
  defaultDate?: Date | null;
}

export function DateTimePopover({ value, onChange, defaultDate }: Props) {
  const t = useTranslations()
  const params = useParams<{ locale: string }>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              format(value, "PPP pp", { locale: getLocaleForFns(params.locale) })
            ) : (
              <span>{t('article.publishedAt.placeholder')}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-auto" align="center">
        <DateTimePicker value={value} defaultDate={defaultDate} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}