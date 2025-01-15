'use client'

import { Button } from "@/components/ui/button";
import { FlexColumn } from "@/components/ui/flexbox";
import { Plus } from "lucide-react";
import { JsonNodeData } from "@/types";
import { cn } from "@/lib";
import { JsonNode } from "../json-node";
import React from "react";
import { DropArea } from "./drop-area";

type Props = {
  data: JsonNodeData
  onDataChange: (newData: JsonNodeData) => void;
  handleAddChild: (position: "start" | "end") => void,
}


export function ArrObjNode({ data, onDataChange, handleAddChild }: Props) {

  return (
    <FlexColumn
      className={cn(
        "relative w-fit",
        data.id !== 'root' && "pl-8 pb-6 mb-2",
      )}>

      {data.id !== 'root' && (<div className={cn(
        "absolute -top-0 left-0 h-full w-4 rounded-bl-full border-l-2 border-b-2",

      )}>
        <div className={cn(
          "absolute -bottom-2 left-2 size-3 border-2 rounded-full bg-background",

        )} />
      </div>)}

      <Button
        type="button"
        variant="secondary" onClick={() => handleAddChild('start')}
        className={cn(
          "w-[23rem] sm:w-[26rem] h-6 opacity-40 hover:opacity-100 mt-6 mb-3",
        )}>
        <Plus size={16} />
      </Button>

      {(data.children || []).map((child, index) => (
        <div key={child.id} className="relative">
          <DropArea
            data={data} onDataChange={onDataChange} index={index} />
          <JsonNode
            data={child}
            index={index}
            isDuplicate={data.children?.some(c => c.keyName === child.keyName && c.id !== child.id)}
            parentIsArr={data.valueType === 'array'}
            onChange={(newChild) => {
              const newChildren = (data.children || []).map((c) =>
                c.id === newChild.id ? newChild : c
              );
              onDataChange({ ...data, children: newChildren });
            }}
            onDelete={() => {
              const newChildren = (data.children || []).filter((c) => c.id !== child.id);
              onDataChange({ ...data, children: newChildren });
            }}
          />
        </div>
      ))}

      <div className="relative">
        <DropArea data={data} onDataChange={onDataChange} index={data.children?.length || 0} />
      </div>

      <Button
        type="button"
        variant="secondary" onClick={() => handleAddChild("end")}
        className={cn(
          "w-[23rem] sm:w-[26rem] h-6 opacity-40 hover:opacity-100 mt-3",
        )}>
        <Plus size={16} />
      </Button>

      {/* {`droppable_${data.id}`} */}
    </FlexColumn>
  )
}