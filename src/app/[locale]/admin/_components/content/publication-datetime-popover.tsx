import { Button } from "@/components/ui/button"
import { CalendarIcon, CalendarCheck } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PublicationDatetimeForm } from "./publication-datetime-form"
import { useForm } from "react-hook-form"
import { publicationDateTimeForm, FormState } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FC, useActionState, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { updateArticlePublishedAt, updateJsonContentPublishedAt } from "../../_actions/update"

type Props = {
  contentId: number
  date?: Date | null
  contentType: 'article' | 'json'
} & React.ComponentPropsWithRef<typeof Button> & React.ComponentPropsWithoutRef<typeof PopoverContent>

export const PublicationDatetimePopover: FC<Props> = ({ contentId, date, contentType, side, align, sideOffset, ...props }) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof publicationDateTimeForm>>({
    resolver: zodResolver(publicationDateTimeForm),
    defaultValues: {
      publishedAt: date || null
    },
    mode: "onChange",
  })

  const [state, action, isPending] = useActionState<FormState>(async () => {
    const validation = await form.trigger()
    if (!validation) return { isSuccess: false }

    const values = form.getValues()
    let res: FormState
    if (contentType === 'article') {
      res = await updateArticlePublishedAt(contentId, values)
    } else {
      res = await updateJsonContentPublishedAt(contentId, values)
    }

    if (!res) {
      toast({
        title: t('common.form.databaseError'),
        variant: "destructive"
      })
      return res
    }

    toast({
      title: t('common.form.saved')
    })
    setOpen(false)

    return res
  }, { isSuccess: false })


  return (
    <Popover open={isPending || open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button {...props}>
          {date ? <CalendarCheck size={20} /> : <CalendarIcon size={20} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 w-auto p-0" side={side} align={align} sideOffset={sideOffset}>
        <PublicationDatetimeForm form={form} action={action} error={state.error} />
      </PopoverContent>
    </Popover>
  )
}