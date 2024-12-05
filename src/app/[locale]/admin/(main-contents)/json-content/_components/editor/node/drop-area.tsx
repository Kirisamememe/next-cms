import { cn } from "@/lib";
import { JsonNodeData } from "@/types"
import { useState } from "react";

type Props = {
  index: number
  isDragging?: boolean
  data: JsonNodeData
  onDataChange: (newData: JsonNodeData) => void;
}

export function DropArea({ data, onDataChange, index, isDragging }: Props) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('dropped')
    e.preventDefault()
    setIsDragOver(false)

    const item: JsonNodeData = JSON.parse(e.dataTransfer.getData("text/plain"))
    if (data.children?.some((c) => c.id === item.id) && (index === item.index || index === Number(item.index) + 1)) {
      return
    }
    // console.log(item)

    const newChildren = (data.children || []).map((c) =>
      c.id === item.id ? item : c
    )
    // console.log(newChildren)
    onDataChange({ ...data, children: newChildren });
  }

  const handleDragEnter = () => {
    if (isDragging) {
      return
    }
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  
  return (
    <div 
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
      "h-fit shrink-0 py-0 transition-all ",
      isDragOver && "py-3"
    )}>
      <div className={cn(
        "h-6 pointer-events-none transition-all bg-blue-700/0 outline-blue-700 outline-2",
        isDragOver && "h-12 bg-blue-700/30 outline rounded-lg"
      )} />
    </div>
  )
}