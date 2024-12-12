"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { FlexRow } from "@/components/ui/flexbox"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n"
import { cn } from "@/lib"

type RootProps = {
  children: React.ReactNode
}

export function RSCTabs({ children }: RootProps) {
  return (
    <FlexRow gap={1} className="bg-muted rounded-lg p-1 shrink-0 w-full @[40rem]:w-fit">
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

  return (
    <Button asChild variant={"ghost"}
      className={cn(
        "w-fit rounded-md h-8 hover:bg-background/40 text-muted-foreground",
        (pathname.endsWith(segment) || (pathname.endsWith(path.split('/')[2]) && segment === 'all')) &&
        "bg-background hover:bg-background font-semibold shadow-md text-foreground"
      )} >
      <Link
        href={path}
        className="w-full"
      >
        {children}
      </Link>
    </Button>
  )
}