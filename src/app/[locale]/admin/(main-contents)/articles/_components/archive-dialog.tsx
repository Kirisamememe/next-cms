import {
  AlertDialog,
  AlertDialogAction,
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
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useTransition } from "react"
import { archiveArticle, restoreArticle } from "../_actions/update"

type Props = {
  articleId: number
  isArchived: boolean
}

export function ArchiveAlertDialog({ articleId, isArchived }: Props) {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const session = useSession()

  if (!session.data?.operatorId) {
    return null
  }

  const handleClick = () => {
    startTransition(async () => {
      const res = isArchived ?
        await restoreArticle(articleId, session.data.operatorId) :
        await archiveArticle(articleId, session.data.operatorId)

      if (!res) {
        toast({
          title: t('common.form.databaseError'),
          variant: "destructive"
        })
        return
      }
      toast({
        title: t('common.form.saved')
      })
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
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
          <AlertDialogAction asChild>
            <Button onClick={handleClick} isPending={isPending}>
              {t("common.ok")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}