'use client'

import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { useGroupFormContext } from "./group-form-provider"
import { Badge } from "@/components/ui/badge"
import { Folder, X } from "lucide-react"
import { EmptyState } from "./illustration/empty-state"
import { ContentListItem, ContentType } from "@/types"
import { Button } from "@/components/ui/button"

type Props = {
  type: ContentType
}

export const SelectedItem = ({ type }: Props) => {
  const { listMap, setListData } = useGroupFormContext()

  if (!listMap[type].length) {
    return (
      <FlexColumn center className="h-full">
        <EmptyState type={type} />
      </FlexColumn>
    )
  }

  const handleDelete = (item: ContentListItem) => {
    setListData(listMap[type].filter(f => f.id !== item.id), type)
  }

  return (
    <FlexColumn gap={2}>
      {listMap[type].map((item) => (
        <FlexRow key={item.id} gap={3} centerY className="w-full p-2 bg-muted rounded-md">
          <Badge variant={'custom'} className="bg-foreground/10 px-1.5 rounded-sm">
            {type !== 'mediaFolders' ? item.id : <Folder size={16} />}
          </Badge>
          <span className="truncate">
            {type !== 'mediaFolders' ? item.title : item.id}
          </span>
          <Button
            variant={'ghost'} size={'icon'}
            className="shrink-0 ml-auto rounded-full size-6 bg-foreground/15 hover:bg-foreground/30"
            onClick={() => handleDelete(item)}
          >
            <X size={16} />
          </Button>
        </FlexRow>
      ))}
    </FlexColumn>
  )
}