import { Button } from "@/components/ui/button"
import { FlexColumn } from "@/components/ui/flexbox"
import { Expand } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ListSelector } from "./selector"


type Props = {
  list: Promise<{ id: number, title: string }[]>
  type: 'articles' | 'jsonContents'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const AllItemList = ({ list, type, open, onOpenChange }: Props) => {

  return (
    <FlexColumn>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button size={'icon'}>
            <Expand />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={8} className="p-2 w-[24rem] rounded-lg">
        </PopoverContent>
      </Popover>
    </FlexColumn>
  )
}

