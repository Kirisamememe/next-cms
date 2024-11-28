import { cn } from "@/lib";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const headingVariants = cva(
  "",
  {
    variants: {
      size: {
        14: "text-sm",
        16: "text-base",
        18: "text-lg",
        20: "text-xl",
        24: "text-2xl",
        30: "text-3xl",
        36: "text-4xl",
        48: "text-5xl",
      },
      height: {
        1: "leading-[100%]",
        1.2: "leading-[120%]",
        1.5: "leading-[150%]",
      },
      weight: {
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
        800: "font-extrabold",
        900: "font-black",
      },
      color: {
        foreground: "text-foreground",
        primary: "text-primary",
        destructive: "text-destructive",
        muted: "text-muted-foreground",
      },
      py: {
        0.5: "py-0.5",
        1: "py-1",
        2: "py-2",
      },
      mx: {
        0.5: "mx-0.5",
        1: "mx-1",
        1.5: "mx-1.5",
        2: "mx-2",
        3: "mx-3",
      },
      mb: {
        0.5: "mb-0.5",
        1: "mb-1",
        2: "mb-2",
        3: "mb-3",
      },
      clamp: {
        1: "line-clamp-1",
        2: "line-clamp-2",
        3: "line-clamp-3",
        4: "line-clamp-4",
        5: "line-clamp-5",
        6: "line-clamp-6",
      }
    },
    defaultVariants: {
      size: 16,
      color: "foreground",
      weight: 700
    }
  }
)

const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants>
>(({ className, children, size, height, weight, color, py, mx, mb, clamp, ...props }, ref) => (
  <h6
    ref={ref}
    className={cn(
      headingVariants({ size, height, weight, color, py, mx, mb, clamp }),
      className
    )}
    {...props}
  >
    {children}
  </h6>
))
Heading.displayName = "Heading"



const paragraphVariants = cva(
  "",
  {
    variants: {
      size: {
        12: "text-xs",
        14: "text-sm",
        16: "text-base",
        18: "text-lg",
        20: "text-xl",
        24: "text-2xl",
      },
      height: {
        1.2: "leading-[120%]",
        1.35: "leading-[135%]",
        1.5: "leading-[150%]",
        1.65: "leading-[165%]",
        1.8: "leading-[180%]",
        2: "leading-[200%]",
      },
      weight: {
        200: "font-extralight",
        300: "font-light",
        400: "font-normal",
        500: "font-medium",
      },
      color: {
        foreground: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        destructive: "text-destructive"
      },
      mt: {
        0.5: "mt-0.5",
        1: "mt-1",
        1.5: "mt-1.5",
        2: "mt-2",
        3: "mt-3",
        4: "mt-4",
        5: "mt-5",
        6: "mt-6",
      },
      mb: {
        0.5: "mb-0.5",
        1: "mb-1",
        1.5: "mb-1.5",
        2: "mb-2",
        3: "mb-3",
        4: "mb-4",
        5: "mb-5",
        6: "mb-6",
      },
      clamp: {
        1: "line-clamp-1",
        2: "line-clamp-2",
        3: "line-clamp-3",
        4: "line-clamp-4",
        5: "line-clamp-5",
        6: "line-clamp-6",
      }
    },
    defaultVariants: {
      size: 14,
      color: "foreground",
      weight: 400
    }
  }
)

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof paragraphVariants> & {
    noWrap?: boolean
  }
>(({ className, children, size, height, weight, color, mt, mb, clamp, noWrap = false, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      paragraphVariants({ size, height, weight, color, mt, mb, clamp }),
      noWrap && "text-nowrap",
      className
    )}
    {...props}
  >
    {children}
  </p>
))
Paragraph.displayName = "Paragraph"




const labelTextVariants = cva(
  "",
  {
    variants: {
      size: {
        10: "text-[0.625rem]",
        12: "text-xs",
        14: "text-sm",
        16: "text-base",
        18: "text-lg",
        20: "text-xl",
        24: "text-2xl",
        30: "text-3xl",
        36: "text-4xl",
        48: "text-5xl",
      },
      height: {
        1: "leading-[100%]",
        1.1: "leading-[110%]",
        1.2: "leading-[120%]",
        1.35: "leading-[135%]",
        1.5: "leading-[150%]",
        1.65: "leading-[165%]",
        1.8: "leading-[180%]",
        2: "leading-[200%]",
      },
      weight: {
        200: "font-extralight",
        300: "font-light",
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
        800: "font-extrabold",
        900: "font-black",
      },
      color: {
        foreground: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        destructive: "text-destructive"
      },
      mx: {
        0.5: "mx-0.5",
        1: "mx-1",
        1.5: "mx-1.5",
        2: "mx-2",
        3: "mx-3",
      },
      mt: {
        0.5: "mt-0.5",
        1: "mt-1",
        1.5: "mt-1.5",
        2: "mt-2",
        3: "mt-3",
      },
      mb: {
        0.5: "mb-0.5",
        1: "mb-1",
        1.5: "mb-1.5",
        2: "mb-2",
        3: "mb-3",
      }
    },
    defaultVariants: {
      size: 12,
      color: "muted",
      weight: 400
    }
  }
)

const LabelText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof labelTextVariants>
>(({ className, children, size, height, weight, color, mx, mt, mb, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      labelTextVariants({ size, height, weight, color, mx, mt, mb }),
      className
    )}
    {...props}
  >
    {children}
  </p>
))
LabelText.displayName = "LabelText"

export { Heading, Paragraph, LabelText }