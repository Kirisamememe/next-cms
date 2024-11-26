'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cog } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from "react";
import { Heading } from "@/components/ui/typography";
import { GridSlider } from "./grid-size-slider";
import { useGalleryContext } from "./gallery-provider";

const GallerySettingBtn = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { gridSize, setGridSize } = useGalleryContext()

  const onValueChange = (value: number[]) => {
    setGridSize(value[0])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button ref={ref} {...props} variant={"outline"} size={"icon"} className={cn("", className)}>
          <Cog size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="h-20">
        <Heading mb={3} weight={600}>
          グリッドサイズ
        </Heading>
        <GridSlider onValueChange={onValueChange} height={1} size={4} className="h-1" defaultValue={[gridSize]} min={8} max={18} step={2} />
      </PopoverContent>
    </Popover>
  )
})
GallerySettingBtn.displayName = 'GallerySettingBtn'

export { GallerySettingBtn }