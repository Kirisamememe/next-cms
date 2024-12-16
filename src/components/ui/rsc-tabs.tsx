"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { FlexRow } from "@/components/ui/flexbox"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n"
import { cn } from "@/lib"
import { useDynamicHeader } from "@/app/[locale]/admin/_components/dynamic-header-provider"

type RootProps = {
  children: React.ReactNode
}

export function RSCTabs({ children }: RootProps) {
  const { atTop, isGoingUp } = useDynamicHeader()

  return (
    <FlexRow
      gap={1}
      className={cn(
        "sticky top-16 bg-card/80 px-8 shrink-0 w-full z-50 backdrop-blur-md border-b gap-6 transition-transform duration-300",
        (!atTop && !isGoingUp) && "-translate-y-16"
      )}>
      {children}
    </FlexRow>
  )
}

type TabProps = {
  segment: string
  path: string
  children: React.ReactNode
}

export function RSCTabLink({ segment, path, children }: TabProps) {
  const pathname = usePathname()
  const params = useSearchParams()

  return (
    <Button asChild variant={"ghost"}
      className={cn(
        "w-fit h-11 hover:bg-background/40 text-muted-foreground rounded-none px-0",
        (pathname.endsWith(segment) || (pathname.endsWith(path.split('/')[2]) && segment === 'all')) &&
        "font-semibold text-foreground shadow-[inset_0_-2px_0_0_hsl(var(--foreground))]"
      )} >
      <Link
        href={`${path}?${params.toString()}`}
      >
        {children}
      </Link>
    </Button>
  )
}