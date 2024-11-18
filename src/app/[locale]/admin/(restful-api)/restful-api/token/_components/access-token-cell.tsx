'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Copy, CopyCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  token: string
}

export function AccessTokenCell({ token }: Props) {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
    toast({
      title: t('restfulApi.token.toast.copied')
    })
  }

  return (
    <div className="flex items-center space-x-2">
      <Input value={token} readOnly className="w-64" />
      <Button onClick={() => copyToClipboard(token)} size="icon" variant="outline" className="rounded-md">
        {copied ?
          <CopyCheck size={20} /> :
          <Copy size={20} />}
      </Button>
    </div>
  )
}