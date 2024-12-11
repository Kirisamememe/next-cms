'use client'

import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { JsonNodeData } from "@/types";

type Props = {
  data: JsonNodeData
  handleValueChange: (value: string | number | boolean | Date) => void
}

export function NumberNode({ data, handleValueChange }: Props) {
  return (
    <div className="p-0.5 border-2 border-t-0 rounded-bl-xl rounded-br-xl">
      <Input
        type="number"
        placeholder="Input number"
        className={cn(
          "w-full border-none rounded-tl-none rounded-tr-none",
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