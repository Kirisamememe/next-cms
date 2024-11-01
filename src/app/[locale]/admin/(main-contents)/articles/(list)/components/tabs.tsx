"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { FlexRow } from "@/components/ui/flexbox"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

const tabs = ["all", "draft", "published", "archive"]

export function ArticleTabs() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <FlexRow gap={1} className="w-fit bg-muted rounded-lg p-1">
      {tabs.map((tab, index) => (
        <Button key={index} asChild variant={"ghost"}
          className={cn(
            "w-fit rounded-md h-8 hover:bg-background/40",
            (pathname.endsWith(tab) || (pathname.endsWith("articles") && tab === 'all')) &&
            "bg-background hover:bg-background font-bold shadow-md"
          )} >
          <Link
            href={`/admin/articles${tab === 'all' ? '' : `/${tab}`}`}
            className="w-full"
          >
            {t(`article.tabs.${tab}`)}
          </Link>
        </Button>
      ))}
    </FlexRow>
  )
}
