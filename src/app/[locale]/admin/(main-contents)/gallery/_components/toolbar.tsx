'use client'

import { FlexRow } from "@/components/ui/flexbox";
import { NewFolderBtn } from "./folder/new-folder-btn";
import { GalleryGridSettingBtn } from "./gallery-grid-setting-btn";
import { NewImageBtn } from "./image/new-image-btn";
import { useDynamicHeader } from "../../../_components/dynamic-header-provider";
import { cn } from "@/lib";

export function GalleryToolbar() {
  const { atTop, isGoingUp } = useDynamicHeader()

  return (
    <FlexRow gap={3} className={cn(
      "appear sticky top-0 bg-background/90 z-10 shrink-0 [transition:top_0.3s_cubic-bezier(0.4,0,0.2,1)] px-6 py-3 my-3",
      !atTop && "shadow-[0_1px_0_0_hsla(var(--foreground)/0.1)]",
      (!atTop && isGoingUp) && "top-16"
    )}>
      <NewFolderBtn />
      <NewImageBtn />
      <GalleryGridSettingBtn className="ml-auto border-foreground/10 bg-background/40" />
    </FlexRow>
  )
}