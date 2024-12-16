import { combineDateAndTime, getTimeString } from "@/lib";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FlexColumn } from "@/components/ui/flexbox";
import { Input } from "@/components/ui/input";
import { format } from "date-fns/format";
import { UndoDot, X } from "lucide-react";

type Props = {
  value?: Date | null
  defaultDate?: Date | null
  onChange: (...event: any[]) => void
  clearable?: boolean
}

export function DateTimePicker({ value, defaultDate, onChange, clearable = true }: Props) {
  return (
    <FlexColumn gap={4} className="relative">
      <Calendar
        mode="single"
        selected={value || defaultDate || undefined}
        onSelect={(date) => {
          onChange(combineDateAndTime(date, getTimeString(value)))
        }}
        disabled={(date) =>
          date < new Date("1970-01-01")
        }
      />
      <Input
        type="datetime-local"
        step="1"
        className="[&::-webkit-calendar-picker-indicator]:hidden"
        value={value ? format(value, "yyyy-MM-dd'T'HH:mm:ss") : ''}
        onChange={(e) => {
          const dateString = e.currentTarget.value
          if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)) {
            onChange(new Date(dateString))
          }
        }}
      />
      {value === null && defaultDate &&
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={() => { onChange(undefined) }}
          className="absolute right-1 bottom-1 size-8 rounded-sm"
        >
          <UndoDot size={20} />
        </Button>
      }
      {value !== null && clearable &&
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={() => { onChange(null) }}
          className="absolute right-1 bottom-1 size-8 rounded-sm"
        >
          <X size={20} />
        </Button>
      }
      {!clearable &&
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={() => { onChange(new Date()) }}
          className="absolute right-1 bottom-1 size-8 rounded-sm"
        >
          <UndoDot size={20} />
        </Button>
      }
    </FlexColumn>
  )
}