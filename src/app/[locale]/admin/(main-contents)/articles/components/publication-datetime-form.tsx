import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { articlePublicationForm } from "@/types/article-schema"
import { DateTimePicker } from "./datetime-picker"


type Props = {
  form: UseFormReturn<{
    published_at?: Date | null;
  }, any, undefined>
  onSubmit: (values: z.infer<typeof articlePublicationForm>) => void
  isPending: boolean
}


export function PublicationDatetimeForm({ form, onSubmit, isPending }: Props) {
  const t = useTranslations()

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 p-4">
        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem className="relative">
              <DateTimePicker
                value={field.value}
                defaultDate={form.formState.defaultValues?.published_at}
                onChange={field.onChange}
              />
              <FormControl>
              </FormControl>
              <FormDescription hidden>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={form.handleSubmit(onSubmit)} isPending={isPending}>
          {t("common.save")}
        </Button>
      </form>
    </Form>
  )
}