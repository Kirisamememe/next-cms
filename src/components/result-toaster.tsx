'use client'

import { useToast } from "@/hooks/use-toast"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function ResultToaster() {
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const error = params.get('error')
  const message = params.get('message')

  useEffect(() => {
    if (error) {
      toast({
        title: "変更が保存できませんでした",
        variant: "destructive"
      })
      router.replace(pathname)
      return
    }

    if (message) {
      toast({
        title: message,
        description: "変更が保存されました！"
      })
      router.replace(pathname)
      return
    }

  }, [error, message, pathname, router, toast])

  return null
}