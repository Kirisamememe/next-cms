import { Button } from "@/components/ui/button"
import { CalendarIcon, CalendarCheck } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PublicationDatetimeForm } from "./publication-datetime-form"
import { useForm } from "react-hook-form"
import { articlePublicationForm } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { updatePublishedAt } from "../_actions/update"

type Props = {
  articleId: number
  date?: Date | null
}

export function PublicationDatetimePopover({ articleId, date }: Props) {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof articlePublicationForm>>({
    resolver: zodResolver(articlePublicationForm),
    defaultValues: {
      publishedAt: date || null
    },
    mode: "onChange",
  })

  const onSubmit = (values: z.infer<typeof articlePublicationForm>) => {
    startTransition(async () => {
      const res = await updatePublishedAt(articleId, values)
      if (!res) {
        toast({
          title: t('common.form.databaseError'),
          variant: "destructive"
        })
        console.error("失敗した")
        return
      }

      toast({
        title: t('common.form.saved'),
      })
      setOpen(false);
    })
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          {date ? <CalendarCheck size={20} /> : <CalendarIcon size={20} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 w-auto p-0" side="left" align="start">
        <PublicationDatetimeForm form={form} onSubmit={onSubmit} isPending={isPending} />
      </PopoverContent>
    </Popover>
  )
}