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
  // const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    // setIsDraggingOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    // setIsDraggingOver(false)
  }

  return (
    <div 
      className="p-0.5 border-2 border-t-0 rounded-bl-xl rounded-br-xl"
      ref={ref}
      {...props}
    >
      <Textarea
        rows={2}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "w-full resize-none border-none bg-transparent rounded-tl-none rounded-tr-none",
          // isDraggingOver && "pointer-events-none"
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