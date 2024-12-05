'use client'

import { DateTimePicker } from "@/components/datetime-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'} className="w-full">
            {format(data.value?.toString() || new Date().toString(), "PPP ppp", { locale: fnsLocale })}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle hidden>
          </DialogTitle>
          <DialogDescription hidden>
          </DialogDescription>
          <DateTimePicker 
            value={new Date(data.value?.toString() || new Date())} 
            onChange={handleValueChange} 
          />
        </DialogContent>
      </Dialog>
    </FlexRow>
  )
}