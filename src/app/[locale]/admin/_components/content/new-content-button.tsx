'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { cn } from "@/lib";
import { SquarePen } from "lucide-react";
import { createPortal } from "react-dom";
import { useScrollState } from "../scroll-state-provider";

type Props = {
  href: string
  label: string
}

export default function NewContentBtn({ href, label }: Props) {
  const { atTop, isGoingUp } = useScrollState()

  return createPortal(
    <Button
      asChild
      size={"sm"}
      className={cn(
        "animate-in slide-in-from-right fixed right-6 rounded-full z-[5000] font-semibold transition-transform duration-300",
        "bottom-8 [&>span]:hidden w-14 h-14 ",
        "lg:top-3.5 lg:[&>span]:block lg:[&>svg]:size-4 lg:w-auto lg:h-9 lg:pl-4 lg:pr-5",
        (!atTop && !isGoingUp) && "translate-x-24 lg:-translate-y-16 lg:translate-x-0"
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