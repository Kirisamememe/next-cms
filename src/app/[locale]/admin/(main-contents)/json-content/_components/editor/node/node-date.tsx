'use client'

import { DateTimePicker } from "@/components/datetime-picker";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { FlexRow } from "@/components/ui/flexbox";
import { getLocaleForFns } from "@/i18n";
import { JsonNodeData } from "@/types";
import { format } from "date-fns";
import { useLocale } from "next-intl";

type Props = {
  data: JsonNodeData
  handleValueChange: (value: string | number | boolean | Date) => void
}

export function DateNode({ data, handleValueChange }: Props) {
  const locale = useLocale()
  const fnsLocale = getLocaleForFns(locale)

  return (
    <FlexRow className="p-4 border-2 border-t-0 rounded-bl-xl rounded-br-xl">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'secondary'} className="w-full">
            {format(data.value?.toString() || new Date().toString(), "PPP ppp", { locale: fnsLocale })}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <DateTimePicker 
            value={new Date(data.value?.toString() || new Date())} 
            clearable={false}
            onChange={handleValueChange} 
          />
        </PopoverContent>
      </Popover>
    </FlexRow>
  )
}