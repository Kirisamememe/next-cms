'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib"
import { use } from "react"
import { GridColumn } from "@/components/ui/grid"
import { ContentListItem } from "@/types/schema-content-group"
import { useGroupFormContext } from "./group-form-provider"
import { ContentType } from "@/types"


type Props = {
  type: Exclude<ContentType, 'mediaFolders'>
  list: Promise<ContentListItem[]>
}

export const ListSelector = ({ list, type }: Props) => {
  const { listMap, setListData } = useGroupFormContext()
  const listData = use(list)

  const handleSelect = (item: ContentListItem) => {
    if (listMap[type].some(l => l.id === item.id)) {
      setListData(listMap[type].filter(f => f.id !== item.id), type)
      return
    }
    setListData([...listMap[type], item], type)
  }

  return (
    <ScrollArea className="h-full">
      <GridColumn gap={2} className="w-[calc(100%-0.5rem)] p-2">
        {listData.map(item => (
          <Button
            type='button'
            variant={"ghost"} key={item.id}
            className={cn(
              "justify-start rounded-md w-full px-2 duration-100",
              listMap[type].some(i => i.id === item.id) && "bg-foreground/15 hover:bg-foreground/20"
            )}
            onClick={() => handleSelect(item)}
          >
            <Badge variant={'secondary'} className="bg-foreground/10 px-1.5 rounded-sm">
              {item.id}
            </Badge>
            <span className="truncate">
              {item.title}
            </span>
          </Button>
        ))}
      </GridColumn>
      <ScrollBar orientation="vertical" className="mr-1 py-2" />
    </ScrollArea>
  )
}

