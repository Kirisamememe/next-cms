'use client'

import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { JsonNodeData } from "@/types";
import { useState } from "react";

type Props = {
  data: JsonNodeData
  handleValueChange: (value: string | number | boolean | Date) => void
}

export function NumberNode({ data, handleValueChange }: Props) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }
  
  return (
    <div className="p-0.5 border-2 border-t-0 rounded-bl-xl rounded-br-xl">
      <Input
        type="number"
        placeholder="Input number"
        onDragOver={handleDragOver}
        className={cn(
          "w-full border-none rounded-tl-none rounded-tr-none",
          isDraggingOver && "pointer-events-none"
        )}
        value={String(data.value)}
        onChange={(e) => {
          let newValue: string | number | null = e.currentTarget.value;
          if (data.valueType === "number") {
            newValue = Number(newValue);
          }
          handleValueChange(newValue);
        }}
      />
    </div>
  )
}