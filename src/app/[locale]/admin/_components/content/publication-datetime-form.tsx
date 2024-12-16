import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { useTranslations } from "next-intl"
import { DateTimePicker } from "../../../../../components/datetime-picker"
import { Submit } from "@/components/ui/submit-button"


type Props = {
  form: UseFormReturn<{
    publishedAt?: Date | null
  }, any, undefined>
  action: () => void
  error?: { message: string }
}


export function PublicationDatetimeForm({ form, action, error }: Props) {
  const t = useTranslations()

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-4 p-4">
        <FormField
          control={form.control}
          name="publishedAt"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <DateTimePicker
                  value={field.value}
                  defaultDate={form.formState.defaultValues?.publishedAt}
                  onChange={(value) => {
                    console.log(value)
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormDescription hidden>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Submit error={error} >
          {t("common.save")}
        </Submit>
      </form>
    </Form>
  )
}