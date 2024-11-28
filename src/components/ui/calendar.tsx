"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib";
import { buttonVariants } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { getLocaleForFns } from "@/i18n";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const params = useParams<{ locale: string }>()

  return (
    <DayPicker
      locale={getLocaleForFns(params.locale)}
      showOutsideDays={showOutsideDays}
      className={cn("relative", className)}
      classNames={{
        months: "flex flex-col sm:flex-row",
        month: "",
        month_caption: "flex justify-center py-1 mb-4 relative items-center",
        caption_label: "font-semibold",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute top-0 left-1 size-8 bg-transparent p-0 opacity-50 hover:opacity-100 z-[10]"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute top-0 right-1 size-8 bg-transparent p-0 opacity-50 hover:opacity-100 z-[10]"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 text-center rounded-lg text-sm p-0 relative",
          "[&:has([aria-selected].range-end)]:rounded-r-md [&:has([aria-selected].outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          "[&[aria-selected]>button]:hover:bg-primary [&[aria-selected]>button]:hover:text-primary-foreground"),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft {...props} />;
          }
          return <ChevronRight {...props} />;
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
