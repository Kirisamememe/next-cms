import { CalendarIcon, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn, combineDateAndTime, getTimeString } from "@/lib/utils"
import { FormControl } from "./form"
import { Button } from "./button"
import { Input } from "./input"
import { ControllerRenderProps } from "react-hook-form"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { getLocale } from "@/i18n/get-locale"


type Props = {
  field: ControllerRenderProps<{
    body: string;
    slug: string;
    summary?: string;
    title?: string;
    image?: string;
    commit_msg?: string;
    author_note?: string;
    author_id: number;
    published_at: Date | null;
  }, "published_at">
}

export function DateTimePicker({ field }: Props) {
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
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP p", { locale: getLocale(params.locale) })
            ) : (
              <span>{t('article.publishedAt.placeholder')}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="relative flex flex-col gap-3 w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={field.value || undefined}
          onSelect={(date) => {
            field.onChange(combineDateAndTime(date, getTimeString(field.value)))
          }}
          disabled={(date) =>
            date < new Date("1970-01-01")
          }
          initialFocus
        />
        <Input
          type="datetime-local"
          className="mx-4 mb-4 w-[calc(100%-2rem)] [&::-webkit-calendar-picker-indicator]:hidden"
          value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ''}
          onChange={(e) => {
            const dateString = e.target.value;
            if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
              field.onChange(new Date(dateString));
            }
          }}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={() => { field.onChange(null) }}
          className="absolute right-5 bottom-5 size-8 rounded-sm"
        >
          <X size={20} />
        </Button>
      </PopoverContent>
    </Popover>
  )
}