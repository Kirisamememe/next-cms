import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { articlePublicationForm } from "@/types"
import { DateTimePicker } from "./datetime-picker"


type Props = {
  form: UseFormReturn<{
    publishedAt?: Date | null;
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
          name="publishedAt"
          render={({ field }) => (
            <FormItem className="relative">
              <DateTimePicker
                value={field.value}
                defaultDate={form.formState.defaultValues?.publishedAt}
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