import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Copy, CopyCheck } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  newlyCreatedToken: string
}

export function TokenGenerateFormResult({ newlyCreatedToken }: Props) {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
    toast({
      title: t('api.token.toast.copied')
    })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {t('api.token.dialog.titleAfterGenerate')}
        </DialogTitle>
        <DialogDescription>
          {t('api.token.dialog.descriptionAfterGenerate')}
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 mt-2">
        <Input id="token" value={newlyCreatedToken} readOnly className="flex-grow" />
        <Button
          type="button"
          onClick={() => copyToClipboard(newlyCreatedToken)}
          size="icon"
          variant="outline"
          className="size-10 shrink-0">
          {copied ?
            <CopyCheck size={20} /> :
            <Copy size={20} />}
        </Button>
      </div>

      <DialogClose asChild className="mr-auto">
        <Button type="submit">
          {t('common.close')}
        </Button>
      </DialogClose>
    </>
  )
}