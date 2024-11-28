import { cn } from "@/lib";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";


const flexboxVariants = cva(
  "min-w-4 min-h-4 ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex"
      },
      gap: {
        0.5: "gap-0.5",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
      },
      radius: {
        base: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      p: {
        1: "p-1",
        2: "p-2",
        3: "p-3",
        4: "p-4",
        5: "p-5",
        6: "p-6",
        7: "p-7",
        8: "p-8",
      },
      px: {
        1: "px-1",
        2: "px-2",
        3: "px-3",
        4: "px-4",
        5: "px-5",
        6: "px-6",
        7: "px-7",
        8: "px-8",
      },
      py: {
        1: "py-1",
        2: "py-2",
        3: "py-3",
        4: "py-4",
        5: "py-5",
        6: "py-6",
        7: "py-7",
        8: "py-8",
      }
    }
  }
)

const Flexbox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof flexboxVariants> &
  {
    border?: boolean,
    bg?: boolean,
    shadow?: boolean,
    trans?: boolean,
    centerX?: boolean,
    centerY?: boolean,
    center?: boolean
  }
>(({
  className,
  orientation = "vertical",
  radius,
  gap,
  p,
  px,
  py,
  border = false,
  bg = false,
  shadow = false,
  trans = false,
  centerX = false,
  centerY = false,
  center = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      flexboxVariants({ orientation, radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      shadow && "shadow-sm dark:shadow-none",
      trans && "transition-all",
      centerX && orientation === "horizontal" && "justify-center",
      centerY && orientation === "horizontal" && "items-center",
      centerX && orientation === "vertical" && "items-center",
      centerY && orientation === "vertical" && "justify-center",
      center && "justify-center items-center",
      className
    )}
    {...props}
  />
))
Flexbox.displayName = "Flexbox"


const flexRowVariants = cva(
  "flex min-w-4 min-h-4 ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      gap: {
        0.5: "gap-0.5",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
      },
      radius: {
        base: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      p: {
        1: "p-1",
        2: "p-2",
        3: "p-3",
        4: "p-4",
        5: "p-5",
        6: "p-6",
        7: "p-7",
        8: "p-8",
      },
      px: {
        1: "px-1",
        2: "px-2",
        3: "px-3",
        4: "px-4",
        5: "px-5",
        6: "px-6",
        7: "px-7",
        8: "px-8",
      },
      py: {
        1: "py-1",
        2: "py-2",
        3: "py-3",
        4: "py-4",
        5: "py-5",
        6: "py-6",
        7: "py-7",
        8: "py-8",
      },
    }
  }
)

const FlexRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof flexboxVariants> &
  {
    border?: boolean,
    bg?: boolean,
    shadow?: boolean,
    trans?: boolean,
    centerX?: boolean,
    centerY?: boolean,
    center?: boolean
  }
>(({
  className,
  radius,
  gap,
  p,
  px,
  py,
  border = false,
  bg = false,
  shadow = false,
  trans = false,
  centerX = false,
  centerY = false,
  center = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      flexRowVariants({ radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      shadow && "shadow-sm dark:shadow-none",
      trans && "transition-all",
      centerX && "justify-center",
      centerY && "items-center",
      center && "justify-center items-center",
      className
    )}
    {...props}
  />
))
FlexRow.displayName = "FlexRow"


const flexColumnVariants = cva(
  "flex flex-col min-w-4 min-h-4 ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      gap: {
        0.5: "gap-0.5",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
      },
      radius: {
        base: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      p: {
        1: "p-1",
        2: "p-2",
        3: "p-3",
        4: "p-4",
        5: "p-5",
        6: "p-6",
        7: "p-7",
        8: "p-8",
      },
      px: {
        1: "px-1",
        2: "px-2",
        3: "px-3",
        4: "px-4",
        5: "px-5",
        6: "px-6",
        7: "px-7",
        8: "px-8",
      },
      py: {
        1: "py-1",
        2: "py-2",
        3: "py-3",
        4: "py-4",
        5: "py-5",
        6: "py-6",
        7: "py-7",
        8: "py-8",
      }
    }
  }
)

const FlexColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof flexboxVariants> &
  {
    border?: boolean,
    bg?: boolean,
    shadow?: boolean
    trans?: boolean,
    centerX?: boolean,
    centerY?: boolean,
    center?: boolean
  }
>(({
  className,
  radius,
  gap,
  p,
  px,
  py,
  border = false,
  bg = false,
  shadow = false,
  trans = false,
  centerX = false,
  centerY = false,
  center = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      flexColumnVariants({ radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      shadow && "shadow-sm dark:shadow-none",
      trans && "transition-all",
      centerX && "items-center",
      centerY && "justify-center",
      center && "justify-center items-center",
      className
    )}
    {...props}
  />
))
FlexColumn.displayName = "FlexColumn"

export { Flexbox, FlexRow, FlexColumn }