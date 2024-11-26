"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const GridSlider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    height?: 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  }
>(({ className, children, height = 2, size = 5, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn("relative w-full grow overflow-hidden rounded-full bg-secondary", `h-${height}`)}>
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn("transition-transform cursor-grab active:cursor-grabbing active:scale-125 hover:scale-110 shadow-md relative group block rounded-full border-2 border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", `h-${size} w-${size}`)}>
      {children &&
        <div className={"absolute w-14 h-8 top-10 sm:top-6 -left-4 sm:-left-5 rounded-md bg-card ring-2 ring-primary items-center font-semibold justify-center text-sm hidden group-hover:flex group-active:flex group-focus-visible:flex transition-all"}>
          {children}
        </div>
      }
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
GridSlider.displayName = 'GridSlider'

export { GridSlider }
