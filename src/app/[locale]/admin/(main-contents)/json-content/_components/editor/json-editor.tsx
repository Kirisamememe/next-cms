'use client'

import { FlexColumn } from "@/components/ui/flexbox";
import { JsonNodeData } from "@/types";
import { JsonNode } from "./json-node";

type Props = {
  jsonData: JsonNodeData,
  setJsonData: (jsonData: JsonNodeData) => void
}

export default function JsonEditor({ jsonData, setJsonData }: Props) {
  return (
    <FlexColumn
      radius={"lg"} className="relative appear overflow-scroll w-full p-6 " >
      <JsonNode
        index={0}
        data={jsonData}
        onChange={(newValue) => setJsonData(newValue)}
        onDelete={() => { }}
      />
    </FlexColumn>
  )
}