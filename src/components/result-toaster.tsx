'use client'

import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function ResultToaster() {
  const t = useTranslations()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const error = params.get('error')
  const message = params.get('message')

  useEffect(() => {
    if (error) {
      toast({
        title: t('common.formResult.failed'),
        description: t(error),
        variant: "destructive"
      })
      router.replace(pathname)
      return
    }

    if (message) {
      toast({
        title: t('common.formResult.saved'),
      })
      router.replace(pathname)
      return
    }

  }, [error, message, pathname, router, t, toast])

  return null
}