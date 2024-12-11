'use client'

import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { JsonPreview } from "../json-preview";
import { convertToJsonValue } from "../../_hooks/json-convert";
import { JsonNodeData } from "@/types";
import { JsonNode } from "./json-node";

type Props = {
  jsonData: JsonNodeData,
  setJsonData: (jsonData: JsonNodeData) => void
}

export default function JsonEditor({ jsonData, setJsonData }: Props) {

  return (
    <FlexRow gap={4} className="relative appear">
      <FlexColumn
        radius={"lg"} px={2} className="overflow-scroll w-full" >
        <JsonNode
          index={0}
          data={jsonData}
          onChange={(newValue) => setJsonData(newValue)}
          onDelete={() => { }}
        />
      </FlexColumn>
      <div className="absolute top-0 right-0 h-full">
        <FlexColumn radius={"lg"} className="sticky top-20 h-[calc(100vh-14rem)] w-80 shrink-0 overflow-scroll bg-muted/50 backdrop-blur-md">
          <JsonPreview initData={convertToJsonValue(jsonData)} />
        </FlexColumn>
      </div>
    </FlexRow>
  )
}