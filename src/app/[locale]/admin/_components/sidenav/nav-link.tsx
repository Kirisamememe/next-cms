'use client'

import { cn } from "@/lib";
import { usePathname } from "next/navigation";
import React, { ComponentPropsWithRef, FC, useEffect, useState } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "@/i18n";

type Props = {
  url: string
  title: string
  blank?: boolean
} & ComponentPropsWithRef<'a'>

export const NavLink: FC<Props> = ({ url, title, blank, children, ref, ...props }) => {
  const pathname = usePathname()
  const [navigating, setNavigating] = useState(false)

  useEffect(() => {
    if (pathname.endsWith(url)) {
      setNavigating(false)
    }
    return () => {
      setNavigating(false)
    }
  }, [pathname, url])

  const onClick = () => {
    if (!pathname.endsWith(url) && !blank) {
      setNavigating(true)
    }
  }

  return (
    <SidebarMenuButton
      asChild tooltip={title}
      onClick={onClick}
      className={cn(
        "active:scale-95 transition-transform h-9 px-3",
        navigating && "navigating bg-accent/50",
        pathname.endsWith(url) && "bg-accent font-semibold hover:bg-accent")
      }>
      <Link ref={ref} href={url} {...(blank && { target: "_blank", rel: "noopener noreferrer" })} {...props} className="gap-3">
        {children}
      </Link>
    </SidebarMenuButton>
  )
}
NavLink.displayName = "NavLink"