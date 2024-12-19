'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Archive, ArchiveRestore } from "lucide-react"
import { useTranslations } from "next-intl"
import { FC, useActionState } from "react"
import { FormState } from "@/types"
import { archiveArticle, archiveJsonContent, restoreArticle, restoreJsonContent } from "../../_actions/update"
import { Submit } from "@/components/ui/submit-button"

type Props = {
  contentId: number
  isArchived: boolean
  contentType: 'article' | 'json'
} & React.ComponentPropsWithoutRef<typeof Button>

export const ArchiveAlertDialog: FC<Props> = ({ contentId, isArchived, contentType, className, ...props }) => {
  const t = useTranslations()

  const [_, action] = useActionState<FormState>(async () => {
    console.log(contentId, isArchived)
    let res: FormState

    if (contentType === 'article') {
      res = isArchived ?
        await restoreArticle(contentId) :
        await archiveArticle(contentId)
    } else {
      res = isArchived ?
        await restoreJsonContent(contentId) :
        await archiveJsonContent(contentId)
    }

    if (!res.isSuccess) {
      toast({
        title: t('common.form.databaseError'),
        variant: "destructive"
      })
      return { isSuccess: false }
    }
    toast({
      title: t('common.form.saved')
    })
    return { isSuccess: true }
  }, { isSuccess: false })


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} {...props}>
          {isArchived ? <ArchiveRestore size={20} /> : <Archive size={20} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t(`article.${isArchived ? 'restoreAlert' : 'archiveAlert'}.title`)}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t(`article.${isArchived ? 'restoreAlert' : 'archiveAlert'}.description`)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common.cancel')}
          </AlertDialogCancel>
          <form action={action}>
            <Submit>
              {t("common.ok")}
            </Submit>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}