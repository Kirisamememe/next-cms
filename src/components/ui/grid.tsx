import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";


const gridColumnVariants = cva(
  "grid ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      grid: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
        "sub": "grid-cols-subgrid"
      },
      sm: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4",
        5: "sm:grid-cols-5",
        6: "sm:grid-cols-6",
        7: "sm:grid-cols-7",
        8: "sm:grid-cols-8",
        9: "sm:grid-cols-9",
        10: "sm:grid-cols-10",
        11: "sm:grid-cols-11",
        12: "sm:grid-cols-12",
      },
      md: {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        5: "md:grid-cols-5",
        6: "md:grid-cols-6",
        7: "md:grid-cols-7",
        8: "md:grid-cols-8",
        9: "md:grid-cols-9",
        10: "md:grid-cols-10",
        11: "md:grid-cols-11",
        12: "md:grid-cols-12",
      },
      lg: {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        5: "lg:grid-cols-5",
        6: "lg:grid-cols-6",
        7: "lg:grid-cols-7",
        8: "lg:grid-cols-8",
        9: "lg:grid-cols-9",
        10: "lg:grid-cols-10",
        11: "lg:grid-cols-11",
        12: "lg:grid-cols-12",
      },
      xl: {
        1: "xl:grid-cols-1",
        2: "xl:grid-cols-2",
        3: "xl:grid-cols-3",
        4: "xl:grid-cols-4",
        5: "xl:grid-cols-5",
        6: "xl:grid-cols-6",
        7: "xl:grid-cols-7",
        8: "xl:grid-cols-8",
        9: "xl:grid-cols-9",
        10: "xl:grid-cols-10",
        11: "xl:grid-cols-11",
        12: "xl:grid-cols-12",
      },
      xxl: {
        1: "2xl:grid-cols-1",
        2: "2xl:grid-cols-2",
        3: "2xl:grid-cols-3",
        4: "2xl:grid-cols-4",
        5: "2xl:grid-cols-5",
        6: "2xl:grid-cols-6",
        7: "2xl:grid-cols-7",
        8: "2xl:grid-cols-8",
        9: "2xl:grid-cols-9",
        10: "2xl:grid-cols-10",
        11: "2xl:grid-cols-11",
        12: "2xl:grid-cols-12",
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
    },
    defaultVariants: {
      gap: 4,
      radius: "lg"
    }
  }
)

type Props = {
  border?: boolean,
  bg?: boolean,
  trans?: boolean,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}

const GridColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof gridColumnVariants> &
  Props
>(({
  className,
  grid,
  sm,
  md,
  lg,
  xl,
  xxl,
  radius,
  gap,
  p,
  px,
  py,
  border = false,
  bg = false,
  trans = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      gridColumnVariants({ grid, sm, md, lg, xl, xxl, radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      trans && "transition-all",
      className
    )}
    {...props}
  />
))
GridColumn.displayName = "GridColumn"

export { GridColumn }