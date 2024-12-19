import { cn } from "@/lib";
import { JsonNodeData } from "@/types"
import { createId } from "@paralleldrive/cuid2";
import { useState } from "react";
import type { ComponentPropsWithRef, FC } from "react";
import { useJsonEditor } from "../../json-editor-provider";

type Props = {
  index: number
  isDragging?: boolean
  data: JsonNodeData
  onDataChange: (newData: JsonNodeData) => void;
} & ComponentPropsWithRef<"div">

export const DropArea: FC<Props> = ({ data, onDataChange, index, isDragging, ref, className, ...props }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const { setDataTransferred } = useJsonEditor()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('dropped')
    e.preventDefault()
    setIsDragOver(false)

    const currentChildren = data.children || []
    const item: JsonNodeData = JSON.parse(e.dataTransfer.getData("text/plain"))

    const isExisting = currentChildren.some(c => c.id === item.id)
    const isSamePosition = (index === item.index || index === Number(item.index) + 1)

    if (isExisting && isSamePosition) return

    let newChildren: JsonNodeData[]
    if (isExisting) {
      // 既存のitemを除外した配列を作成
      newChildren = currentChildren.filter(c => c.id !== item.id)
      // 末尾への追加の場合
      if (index > newChildren.length) {
        item.index = newChildren.length
        newChildren.push(item)
      } else if (index > Number(item.index)) {
        // それ以外の場合は指定されたindexに挿入
        item.index = index - 1
        newChildren.splice(index - 1, 0, item)
      } else {
        // それ以外の場合は指定されたindexに挿入
        item.index = index
        newChildren.splice(index, 0, item)
      }

      onDataChange({ ...data, children: newChildren })
    }
    else {
      const newChild: JsonNodeData = {
        ...item,
        id: createId(),
      }
      newChildren = [...currentChildren]
      // 末尾への追加の場合
      if (index >= newChildren.length) {
        newChild.index = newChildren.length
        newChildren.push(newChild)
      } else {
        // それ以外の場合は指定されたindexに挿入
        newChild.index = index
        newChildren.splice(index, 0, newChild)
      }
      onDataChange({ ...data, children: newChildren })
      setDataTransferred((prev) => [...prev, item.id])
    }
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
    <>
      <div className={cn(
        "w-[23rem] sm:w-[26rem] h-0 absolute -top-3 left-0",
        isDragOver && "h-24",
        className
      )}>
        <div
          ref={ref}
          {...props}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={cn(
            "w-full h-6 shrink-0 py-0 transition-all absolute inset-0",
            isDragOver && "py-3 h-24"
          )} />
      </div>
      <div className={cn(
        "h-0 w-[23rem] sm:w-[26rem] pointer-events-none transition-all bg-blue-700/0 outline-blue-700 outline-2",
        isDragOver && "h-20 bg-blue-700/30 outline rounded-lg"
      )} />
    </>
  )
}