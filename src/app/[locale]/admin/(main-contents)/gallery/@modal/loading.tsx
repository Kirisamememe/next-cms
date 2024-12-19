'use client'

import { CircleSpinLoading } from "@/components/circle-spin-loading";
import { Flexbox } from "@/components/ui/flexbox";
import { createPortal } from "react-dom";

export default function Loading() {
  return createPortal(
    <Flexbox center className="fixed top-1/2 left-1/2 size-36 -translate-x-1/2 -translate-y-1/2 z-[500] bg-black/90 pointer-events-none rounded-xl">
      <CircleSpinLoading />
    </Flexbox>,
    document.body
  )
}