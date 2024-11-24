import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, Folder } from "lucide-react"
import { cn } from "@/lib/utils";
import { MediaFolder } from "@/types/media-folder-schema";
import { Separator } from "@/components/ui/separator";

const FolderSelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>
      <span className="flex items-center gap-2">
        <Folder size={16} />
        {children}
      </span>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
FolderSelectItem.displayName = 'FolderSelectItem'


type Props = {
  folders?: MediaFolder[]
  level?: number
  value: string
  children: React.ReactNode
}

const FolderSelect = ({ folders, level = 0, value, children }: Props) => {
  return (
    <div className="relative">
      <FolderSelectItem
        value={value}
        className="cursor-pointer"
        style={{ paddingLeft: level ? `${level + 0.5}rem` : '0.5rem' }}
      >
        {children}
      </FolderSelectItem>
      {folders?.map((childFolder) => (
        <FolderSelect
          key={childFolder.path}
          folders={childFolder.children}
          level={level + 1}
          value={childFolder.path}
        >
          {childFolder.name}
        </FolderSelect>
      ))}
      {folders?.length ?
        <Separator
          orientation='vertical'
          style={{ left: `${level + 0.9}rem` }}
          className={cn(
            "absolute h-[calc(100%-2.25rem)] top-7",
          )}
        /> : <></>
      }
    </div>
  )
}

export { FolderSelectItem, FolderSelect }