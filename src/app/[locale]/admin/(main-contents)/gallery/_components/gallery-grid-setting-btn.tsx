'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid3x3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from "react";
import { Heading } from "@/components/ui/typography";
import { GridSlider } from "./grid-size-slider";
import { useGalleryContext } from "./gallery-provider";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

export const GRID_COOKIE_NAME = 'GRID_SIZE'
const GRID_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const GalleryGridSettingBtn = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const t = useTranslations()
  const { gridSize, setGridSize } = useGalleryContext()

  const onValueCommit = (value: number[]) => {
    Cookies.set(GRID_COOKIE_NAME, value[0].toString(), { expires: GRID_COOKIE_MAX_AGE })
    setGridSize(value[0])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button ref={ref} {...props} variant={"outline"} size={"icon"} className={cn("", className)}>
          <Grid3x3 size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 h-24">
        <Heading weight={600}>
          {t('gallery.setting.gridSize')}
        </Heading>
        <FlexColumn>
          <GridSlider onValueCommit={onValueCommit} height={1.5} size={4} className="h-10" defaultValue={[gridSize]} min={1} max={4} step={1} />
          <FlexRow className="justify-between px-[7px] -mt-2">
            <Separator orientation="vertical" className="w-0.5 h-1.5 bg-foreground/30" />
            <Separator orientation="vertical" className="w-0.5 h-1.5 bg-foreground/30" />
            <Separator orientation="vertical" className="w-0.5 h-1.5 bg-foreground/30" />
            <Separator orientation="vertical" className="w-0.5 h-1.5 bg-foreground/30" />
          </FlexRow>
        </FlexColumn>
      </PopoverContent>
    </Popover>
  )
})
GalleryGridSettingBtn.displayName = 'GallerySettingBtn'

export { GalleryGridSettingBtn }