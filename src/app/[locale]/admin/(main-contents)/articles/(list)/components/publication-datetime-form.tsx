import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { combineDateAndTime, getTimeString } from "@/lib/utils"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { articlePublicationForm } from "@/types/article-schema"
import { X } from "lucide-react"


type Props = {
  form: UseFormReturn<{
    published_at: Date | null;
  }, any, undefined>
  onSubmit: (values: z.infer<typeof articlePublicationForm>) => void
  isPending: boolean
}


export function PublicationDatetimeForm({ form, onSubmit, isPending }: Props) {
  const t = useTranslations()

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3 p-4">
        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem className="relative">
              <Calendar
                mode="single"
                className="p-0"
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
                className="[&::-webkit-calendar-picker-indicator]:hidden"
                value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => {
                  const dateString = e.target.value;
                  if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
                    field.onChange(new Date(dateString));
                  }
                }}
              />
              <FormControl>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  type="button"
                  onClick={() => { field.onChange(null) }}
                  className="absolute right-1 bottom-1 size-8 rounded-sm"
                  disabled={isPending}>
                  <X size={20} />
                </Button>
              </FormControl>
              <FormDescription hidden>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={form.handleSubmit(onSubmit)} className="mt-2" isPending={isPending}>
          {t("common.save")}
        </Button>
      </form>
    </Form>
  )
}