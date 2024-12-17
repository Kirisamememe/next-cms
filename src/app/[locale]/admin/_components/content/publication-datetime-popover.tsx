'use client'

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

type Props = {
  contentId: number
  date?: Date | null
  updateAction: (contentId: number, values: z.infer<typeof publicationDateTimeForm>) => Promise<FormState>
} & React.ComponentPropsWithRef<typeof Button> & React.ComponentPropsWithoutRef<typeof PopoverContent>

export const PublicationDatetimePopover: FC<Props> = (
  { contentId, date, side, align, sideOffset, updateAction, ...props }
) => {
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

    setOpen(false)
    const values = form.getValues()
    const res = await updateAction(contentId, values)

    if (!res.isSuccess) {
      toast({
        title: t('common.form.databaseError'),
        variant: "destructive"
      })
      setOpen(true)
      return res
    }

    toast({
      title: t('common.form.saved')
    })

    return res
  }, { isSuccess: false })


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button {...props} disabled={isPending}>
          {!isPending
            ? (date ? <CalendarCheck size={20} /> : <CalendarIcon size={20} />)
            : <div className="circle-spin-2 scale-75" />
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 w-72 p-0" side={side} align={align} sideOffset={sideOffset}>
        <PublicationDatetimeForm form={form} action={action} error={state.error} />
      </PopoverContent>
    </Popover>
  )
}