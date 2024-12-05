'use client'

import { Badge } from "@/components/ui/badge"
import { FlexRow } from "@/components/ui/flexbox"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib"
import { JsonNodeData } from "@/types"

type Props = {
  data: JsonNodeData
  handleValueChange: (value: string | number | boolean | Date) => void
}

export function BooleanNode({ data, handleValueChange }: Props) {
  return (
    <FlexRow className="p-3 border-2 border-t-0 rounded-bl-xl rounded-br-xl justify-between">
      <Switch
        className={cn(
          "",
        )}
        checked={Boolean(data.value)}
        onCheckedChange={(value) => {
          handleValueChange(value)
        }}
      />
      <Badge variant={'secondary'}>
        {data.value ? "true" : "false"}
      </Badge>
    </FlexRow>
  )
}