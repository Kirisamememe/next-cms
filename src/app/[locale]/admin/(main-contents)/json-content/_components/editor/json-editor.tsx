'use client'

import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { JsonPreview } from "../json-preview";
import { convertToJsonValue } from "../../_hooks/json-convert";
import { JsonNodeData } from "@/types";
import { JsonNode } from "./json-node";
import { Button } from "@/components/ui/button";
import { Captions, CaptionsOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib";

type Props = {
  jsonData: JsonNodeData,
  setJsonData: (jsonData: JsonNodeData) => void
}

export default function JsonEditor({ jsonData, setJsonData }: Props) {
  const [expanded, setExpanded] = useState(false)

  const handleOnClick = () => {
    setExpanded(!expanded)
  }

  return (
    <FlexRow gap={4} className="relative appear">
      <FlexColumn
        radius={"lg"} className="overflow-scroll w-full p-6 " >
        <JsonNode
          index={0}
          data={jsonData}
          onChange={(newValue) => setJsonData(newValue)}
          onDelete={() => { }}
        />
      </FlexColumn>

      <div className={cn(
        "absolute top-4 right-4 h-full",
        !expanded && "size-12"
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
    </FlexRow>
  )
}