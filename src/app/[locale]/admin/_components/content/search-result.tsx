import { Badge } from "@/components/ui/badge"
import { FlexRow } from "@/components/ui/flexbox"
import { LabelText } from "@/components/ui/typography"

type Props = {
  filterBadge: string
  searchQuery: string
  total: string
}

export const SearchResult = ({ filterBadge, searchQuery, total }: Props) => {
  return (
    <FlexRow center className="bg-muted/50 h-10 rounded-lg">
      <LabelText size={14} className="flex gap-2 items-center">
        <Badge variant={'secondary'} className="rounded-sm px-2">
          {filterBadge}
        </Badge>
        <span>
          {searchQuery}
        </span>
        {total}
      </LabelText>
    </FlexRow>
  )
}