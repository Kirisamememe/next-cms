'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { cn } from "@/lib";
import { SquarePen } from "lucide-react";
import { createPortal } from "react-dom";
import { useDynamicHeader } from "../dynamic-header-provider";

type Props = {
  href: string
  label: string
}

export default function NewContentBtn({ href, label }: Props) {
  const { atTop, isGoingUp } = useDynamicHeader()

  return createPortal(
    <Button
      asChild
      size={"sm"}
      className={cn(
        "popover fixed right-6 rounded-full z-[5000] font-semibold transition-transform duration-300",
        "bottom-8 [&>span]:hidden w-14 h-14 ",
        "sm:top-3.5 sm:[&>span]:block sm:[&>svg]:size-4 sm:w-auto sm:h-9 sm:pl-4 sm:pr-5",
        (!atTop && !isGoingUp) && "translate-x-24 sm:-translate-y-16 sm:translate-x-0"
      )}>
      <Link href={href}>
        <SquarePen size={24} />
        <span>
          {label}
        </span>
      </Link>
    </Button>,
    document.body
  )
}