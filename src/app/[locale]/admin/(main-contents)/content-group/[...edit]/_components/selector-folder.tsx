'use client'

import { Button } from "@/components/ui/button"
import { useGroupFormContext } from "./group-form-provider"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GridColumn } from "@/components/ui/grid"
import { ContentListItem, MediaFolder } from "@/types"
import { ComponentProps, use } from "react"
import { buildFolderTree, cn } from "@/lib"
import { Separator } from "@/components/ui/separator"
import { Folder } from "lucide-react"
import { FlexColumn } from "@/components/ui/flexbox"


type Props = {
  list: Promise<MediaFolder[]>
}

export const FolderSelector = ({ list }: Props) => {
  const listData = use(list)
  const { listMap, setListData } = useGroupFormContext()

  const folders = buildFolderTree(listData)

  const handleSelect = (item: ContentListItem) => {
    if (listMap['mediaFolders'].some(f => f.id === item.id)) {
      setListData(listMap['mediaFolders'].filter(f => f.id !== item.id), 'mediaFolders')
      return
    }
    setListData([...listMap['mediaFolders'], item], 'mediaFolders')
  }

  return (
    <ScrollArea className="h-full">
      <GridColumn gap={0.5} className="w-[calc(100%-0.5rem)] p-2">
        {folders.map(item => (
          <FolderTree
            key={item.path}
            itemData={{ id: item.path, title: item.name }}
            folders={item.children}
            onDataChange={handleSelect} />
        ))}
      </GridColumn>
      <ScrollBar orientation="vertical" className="mr-1 py-2" />
    </ScrollArea>
  )
}

const Item = ({
  itemData,
  onDataChange,
  className,
  ...props
}: {
  itemData: ContentListItem
  onDataChange: (value: ContentListItem) => void
} & ComponentProps<typeof Button>) => {
  const { listMap } = useGroupFormContext()

  return (
    <Button
      type='button'
      variant={"ghost"}
      className={cn(
        "justify-start rounded-md w-full px-2 duration-100 flex",
        listMap['mediaFolders'].some(f => f.id === itemData.id) && "bg-foreground/15 hover:bg-foreground/20",
        className
      )}
      onClick={() => onDataChange(itemData)}
      {...props}
    >
      <Folder size={16} />
      <span className="truncate">
        {itemData.title}
      </span>
    </Button>
  )
}

const FolderTree = ({
  folders,
  level = 0,
  itemData,
  onDataChange
}: {
  folders?: MediaFolder[]
  level?: number
  itemData: ContentListItem,
  onDataChange: (itemData: ContentListItem) => void
}) => {

  return (
    <FlexColumn gap={1} className="relative w-full">
      <Item
        itemData={itemData}
        onDataChange={onDataChange}
        className="cursor-pointer"
        style={{ marginLeft: level ? `${level * 1.5}rem` : '0', width: `calc(100% - ${level ? `${level * 1.5}rem` : '0'})` }}
      />
      {folders?.map((childFolder) => (
        <FolderTree
          key={childFolder.path}
          folders={childFolder.children}
          level={level + 1}
          itemData={{ id: childFolder.path, title: childFolder.name }}
          onDataChange={onDataChange}
        />
      ))}
      {!!folders?.length &&
        <Separator
          orientation='vertical'
          style={{ left: level ? `${level * 1.5 + 0.9}rem` : '0.9rem' }}
          className={cn(
            "absolute h-[calc(100%-2.75rem)] top-9",
          )}
        />
      }
    </FlexColumn>
  )
}