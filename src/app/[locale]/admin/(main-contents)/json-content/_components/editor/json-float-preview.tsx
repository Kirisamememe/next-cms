'use client'

import { FlexColumn } from "@/components/ui/flexbox";
import { JsonPreview } from "../json-preview";
import { convertToJsonValue } from "../../_hooks/json-convert";
import { JsonNodeData } from "@/types";
import { Button } from "@/components/ui/button";
import { Captions, CaptionsOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib";

type Props = {
  jsonData: JsonNodeData,
}

export default function JsonFloatPreview({ jsonData }: Props) {
  const [expanded, setExpanded] = useState(false)

  const handleOnClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={cn(
      "fixed @[54rem]:sticky top-32 @[54rem]:top-16 right-2 h-full",
      !expanded && "size-0"
    )}>
      <FlexColumn radius={"lg"} className={cn(
        "absolute top-0 right-0 shrink-0 transition-all w-80",
        expanded ? "h-[calc(100vh-14rem)] backdrop-blur-md bg-muted/50" : "w-12 h-0"
      )}>
        <Button
          type="button" variant={expanded ? 'ghost' : 'outline'} size={'icon'}
          className="z-20 size-9 absolute top-2 right-2"
          onClick={handleOnClick}
        >
          {expanded ? (<CaptionsOff size={16} />) : (<Captions size={16} />)}
        </Button>
        <JsonPreview
          className={cn(
            "py-4 transition-all duration-200",
            !expanded && "opacity-0",
          )}
          initData={convertToJsonValue(jsonData)}
        />
      </FlexColumn>
    </div>
  )
}