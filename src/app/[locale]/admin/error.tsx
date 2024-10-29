'use client' // Error boundaries must be Client Components

import { InternalErrorIllustration } from '@/components/500'
import { Button } from '@/components/ui/button'
import { Flexbox } from '@/components/ui/flexbox'
import { Heading } from '@/components/ui/typography'
import { toast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    toast({
      title: t('common.error.failed'),
      description: t(error.message),
      variant: "destructive"
    })
    // Log the error to an error reporting service
    console.error(error)
  }, [error, t])

  return (
    <Flexbox center className="m-auto">
      <InternalErrorIllustration />
      <Heading size={20} mb={1}>
        Something went wrong!
      </Heading>
      <p>Could not find requested resource</p>
      <Button onClick={() => reset()} className='mt-6'>
        Try again
      </Button>
    </Flexbox>
  )
}