'use client'

import { Submit } from "@/components/ui/submit-button";
import { deleteFolder } from "../_actions/delete";
import { Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useActionState } from "react";


type Props = {
  path: string
}

export function DeleteFolderBtn({ path }: Props) {
  const t = useTranslations()
  const [_, action, pending] = useActionState(async () => {
    await deleteFolder(path)
  }, undefined)


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"}
          className="rounded-full bg-background/50 hover:bg-destructive hover:text-destructive-foreground">
          {pending ?
            <div className="circle-spin-2" /> :
            <Trash2 size={20} />}
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
          <form action={action} className="">
            <AlertDialogAction asChild type="submit">
              <Submit type="submit">
                {t("common.ok")}
              </Submit>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}