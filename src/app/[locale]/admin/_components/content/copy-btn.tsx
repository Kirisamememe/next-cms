'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Copy } from "lucide-react"

type Props = {
  content: any
}

export const CopyBtn = ({ content }: Props) => {
  const handleOnClick = () => {
    navigator.clipboard.writeText(JSON.stringify(content))
    toast({
      title: 'Copied',
    })
  }

  return (
    <Button variant={'ghost'} size={'icon'} onClick={handleOnClick}>
      <Copy size={20} />
    </Button>
  )
}