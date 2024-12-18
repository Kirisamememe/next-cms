'use client'

import { cn } from "@/lib";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "@/i18n";

type Props = {
  url: string
  title: string
}

export const NavLink = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement> & Props
>(({ url, title, children, ...props }, ref) => {
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
    if (!pathname.endsWith(url)) {
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
      <Link ref={ref} href={url} {...props}>
        {children}
      </Link>
    </SidebarMenuButton>
  )
})
NavLink.displayName = "NavLink"