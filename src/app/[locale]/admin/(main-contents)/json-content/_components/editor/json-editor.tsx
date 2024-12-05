'use client'

import { useState } from "react";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { JsonNodeData } from "@/types";
import { JsonPreview } from "../json-preview";
import { createId } from "@paralleldrive/cuid2";
import dynamic from "next/dynamic";

const JsonNode = dynamic(() => import('./json-node'), {
  ssr: false,
})

type Props = {
  initData?: JsonNodeData;
};



export function JsonEditor({ initData }: Props) {
  const [jsonData, setJsonData] = useState<JsonNodeData>(
    initData ?? { 
      id: 'root', 
      valueType: 'object', 
      children: [{
        id: createId(),
        index: 0,
        keyName: 'newKey',
        valueType: 'string',
        value: ''
      }] 
    }
  )

  const handleDragOver = () => {
    // e.preventDefault()
  }

  return (
    <FlexRow gap={4} className="relative">
      <FlexColumn 
        border radius={"lg"} py={6} px={8} className="overflow-scroll basis-2/3" 
        onDragOver={handleDragOver}>
        <JsonNode
          index={0}
          data={jsonData}
          onChange={(newValue) => setJsonData(newValue)}
        />
      </FlexColumn>
      <JsonPreview initData={jsonData} />
    </FlexRow>
  )
}