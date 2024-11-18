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
import { Submit } from "@/components/ui/submit-button"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { deleteAccessToken } from "../../(api)/@mainContent/_actions/delete"

type Props = {
  token: string
}

export function DeleteAccessToken({ token }: Props) {
  const t = useTranslations()

  const action = async () => {
    'use server'
    await deleteAccessToken(token)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}
          className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive">
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('restfulApi.token.deleteAlert.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('restfulApi.token.deleteAlert.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common.cancel')}
          </AlertDialogCancel>
          <form action={action}>
            <AlertDialogAction asChild type="submit">
              <Submit>
                {t("common.ok")}
              </Submit>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}