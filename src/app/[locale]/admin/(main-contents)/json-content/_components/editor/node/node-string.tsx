'use client'

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib";
import { JsonNodeData } from "@/types";
import { forwardRef } from "react";

type Props = {
  data: JsonNodeData;
  handleValueChange: (value: string | number | boolean | Date) => void;
}

export const StringNode = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & Props
>(({ data, handleValueChange, ...props }, ref) => {
  return (
    <div
      className="p-0.5 border-2 border-t-0 rounded-bl-xl rounded-br-xl bg-background"
      ref={ref}
      draggable
      onDragStart={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      {...props}
    >
      <Textarea
        className={cn(
          "w-full min-h-6 resize-none border-none rounded-tl-none rounded-tr-none field-sizing-content",
        )}
        placeholder="Input string"
        value={String(data.value)}
        onChange={(e) => {
          handleValueChange(e.currentTarget.value);
        }}
      />
    </div>
  )
})
StringNode.displayName = 'StringNode'