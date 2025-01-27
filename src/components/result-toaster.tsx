'use client'

import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

export default function ResultToaster() {
  const t = useTranslations()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const error = useMemo(() => params.get('error'), [params])
  const message = useMemo(() => params.get('message'), [params])

  useEffect(() => {
    if (message) {
      toast({
        title: t('common.form.saved'),
      })
      router.replace(pathname)
      return
    }

  }, [error, message, pathname, router, t, toast])

  return null
}