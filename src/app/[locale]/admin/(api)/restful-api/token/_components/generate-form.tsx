import { Input } from "@/components/ui/input";
import { Submit } from "@/components/ui/submit-button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function TokenGenerateForm() {
  const t = useTranslations()

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {t('api.token.dialog.titleBeforeGenerate')}
        </DialogTitle>
        <DialogDescription>
          {t('api.token.dialog.descriptionBeforeGenerate')}
        </DialogDescription>
      </DialogHeader>
      <Input
        name="name"
        placeholder={t('api.token.dialog.namePlaceholder')}
      />
      <DialogFooter className="ml-auto sm:space-x-3">
        <DialogClose asChild >
          <Button type="button" variant={'outline'}>
            {t('common.cancel')}
          </Button>
        </DialogClose>
        <Submit type="submit">
          {t('api.token.dialog.generate')}
        </Submit>
      </DialogFooter>
    </>
  )
}