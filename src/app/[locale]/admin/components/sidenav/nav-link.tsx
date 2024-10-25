'use client'

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ReactNode } from "react";
import { Button } from "../../../../../components/ui/button";
import { SidebarMenuButton } from "../../../../../components/ui/sidebar";

type Props = {
  url: string
  title: string
}

export const NavLink = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement> & Props
>(({ url, title, children, ...props }, ref) => {
  const pathname = usePathname()

  return (
    <SidebarMenuButton asChild tooltip={title} className={cn(pathname.endsWith(url) && "bg-accent font-bold hover:bg-accent")}>
      <Link ref={ref} href={url} {...props}>
        {children}
      </Link>
    </SidebarMenuButton>
  )
})
NavLink.displayName = "NavLink"