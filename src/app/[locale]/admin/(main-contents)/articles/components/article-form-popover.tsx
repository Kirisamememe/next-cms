import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ControllerRenderProps } from "react-hook-form"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { getLocale } from "@/i18n/get-locale"
import { DateTimePicker } from "./datetime-picker"


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
    published_at?: Date | null;
  }, "published_at">;
  defaultDate?: Date | null;
}

export function DateTimePopover({ field, defaultDate }: Props) {
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
      <PopoverContent className="p-4 w-auto" align="center">
        <DateTimePicker value={field.value} defaultDate={defaultDate} onChange={field.onChange} />
      </PopoverContent>
    </Popover>
  )
}