'use client'

import { Submit } from "@/components/ui/submit-button";
import { deleteImage } from "../_actions/delete";
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
import { FC, useActionState } from "react";
import { cn } from "@/lib";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n";


type Props = {
  imageId: number
} & React.ComponentPropsWithoutRef<typeof Button>

export const DeleteImageBtn: FC<Props> = ({ imageId, className }) => {
  const t = useTranslations()
  const router = useRouter()
  const [_, action, pending] = useActionState(async () => {
    const res = await deleteImage(imageId)
    if (!res?.isSuccess) {
      toast({
        title: t('common.form.databaseError'),
        variant: 'destructive'
      })
      return
    }
    router.back()
  }, undefined)


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"}
          className={cn(
            "bg-background/50 hover:bg-destructive hover:text-destructive-foreground", className
          )}>
          {pending ?
            <div className="circle-spin-2" /> :
            <Trash2 size={20} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('gallery.imageUrl.delete.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('gallery.imageUrl.delete.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common.cancel')}
          </AlertDialogCancel>
          <form action={action} className="">
            <AlertDialogAction asChild>
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