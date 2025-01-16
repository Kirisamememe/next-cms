'use client'

import { FlexRow } from '@/components/ui/flexbox';
import { LabelText } from '@/components/ui/typography';
import { usePathname } from "@/i18n"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react'
import { CircleSpinLoading } from "@/components/circle-spin-loading";
import { TAKE } from '@/types';
import { useTranslations } from 'next-intl';
import { ContentTotal } from './content-total';

type Props = {
  total: number
}

export const InfiniteScroll = ({ total }: Props) => {
  const t = useTranslations()

  const searchParams = useSearchParams()
  const takeParam = Number(searchParams.get('take') || TAKE)

  const router = useRouter()
  const pathname = usePathname()

  const [take, setTake] = useState(takeParam)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      if (take > total) return

      const params = new URLSearchParams(searchParams)
      const newTake = Number(params.get('take') || TAKE) + TAKE
      setTake(newTake)
      params.set('take', newTake.toString())
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    })

    const loader = triggerRef.current
    if (!loader) return
    observer.observe(loader)

    return () => {
      if (loader) {
        observer.unobserve(loader)
      }
    }
  }, [total, pathname, router, searchParams, take])

  if (total === 0) {
    return null
  }

  if (takeParam > total) {
    return (
      <ContentTotal text={t('common.search.total', { total })} />
    )
  }

  if (take === takeParam) {
    return (
      <FlexRow ref={triggerRef} border center className="mx-auto w-80 h-12 my-6 bg-muted/50 rounded-full">
        <LabelText size={14}>
          Load More
        </LabelText>
      </FlexRow>
    )
  }

  return (
    <FlexRow ref={triggerRef} center className="w-full h-24">
      <CircleSpinLoading />
    </FlexRow>
  )
};