'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { cn } from "@/lib";
import { createId } from "@paralleldrive/cuid2";
import { JsonNodeData, ValueType } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { StringNode } from "./node/node-string";
import { NumberNode } from "./node/node-number";
import { BooleanNode } from "./node/node-boolean";
import { ArrObjNode } from "./node/node-arr-obj";
import { Heading } from "@/components/ui/typography";
import { DateNode } from "./node/node-date";
import { JsonTypeSelector } from "./json-type-selector";

type JsonNodeProps = {
  data: JsonNodeData;
  onChange: (newData: JsonNodeData) => void;
  onDelete?: () => void;
  index: number;
  parentIsArr?: boolean;
};


export default function JsonNode({ data, onChange, onDelete, index, parentIsArr = false }: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState(data.valueType === 'object' || data.valueType === 'array');
  const [localKey, setLocalKey] = useState(data.keyName || '')
  const [isDragging, setIsDragging] = useState(false);


  // 値の変更をハンドルする関数
  const handleValueChange = (newValue: string | number | boolean | Date) => {
    onChange({ ...data, value: newValue })
  }

  // キー名の変更をハンドルする関数
  const handleKeyChange = (newKey: string) => {
    setLocalKey(newKey)
    onChange({ ...data, keyName: newKey });
  }

  // タイプの変更をハンドルする関数
  const handleTypeChange = (newType: ValueType) => {
    const updatedData: JsonNodeData = { ...data, valueType: newType };
    if (newType === "array") {
      updatedData.children = [];
      delete updatedData.value;
      setIsExpanded(true);
    }
    else if (newType === "object") {
      updatedData.children = [{
        id: createId(),
        keyName: "newKey",
        valueType: "string",
        value: "",
      }]
      delete updatedData.value;
      setIsExpanded(true);
    }
    else {
      updatedData.value = getDefaultValue(newType);
      delete updatedData.children;
    }
    onChange(updatedData);
  }

  const getDefaultValue = (type: ValueType): string | number | boolean | Date => {
    switch (type) {
      case "string":
        return "";
      case "number":
        return 0;
      case "boolean":
        return false;
      case "date":
        return new Date();
      default:
        return "";
    }
  }

  // 配列やオブジェクトにアイテムを追加する関数
  const handleAddChild = (position: "start" | "end" = "start") => {
    const newChild: JsonNodeData = {
      id: createId(),
      keyName: data.valueType === "object" ? `newKey${(data.children?.length || 0) + 1}` : undefined,
      valueType: "string",
      value: "",
    }

    if (position === "start") {
      onChange({
        ...data,
        children: [newChild, ...(data.children || [])],
      })
    }
    else {
      onChange({
        ...data,
        children: [...(data.children || []), newChild],
      })
    }
  }


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const transferData ={
      ...data,
      index
    }
    e.dataTransfer.setData("text/plain", JSON.stringify(transferData))
    setIsDragging(true)
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (onDelete) {
      onDelete()
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }




  const renderValueEditor = () => {
    if (data.valueType === 'string') {
      return (
        <StringNode
          data={data} 
          handleValueChange={handleValueChange}
        />
      )
    }
    else if (data.valueType === 'number') {
      return (
        <NumberNode data={data} handleValueChange={handleValueChange} />
      )
    }
    else if (data.valueType === 'boolean') {
      return (
        <BooleanNode data={data} handleValueChange={handleValueChange} />
      )
    }
    else if (data.valueType === 'date') {
      return (
        <DateNode data={data} handleValueChange={handleValueChange} />
      )
    }
    else if (data.valueType === "array" || data.valueType === "object") {
      return (
        <ArrObjNode
          handleAddChild={handleAddChild} data={data} onDataChange={onChange} 
        />
      )
    }
  }


  if (data.id === 'root') {
    return (
      <FlexColumn 
        className={cn(
          "shrink-0 w-fit mb-5",
      )}>
        {renderValueEditor()}
      </FlexColumn>
    )
  }

  return (
    <FlexColumn 
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className={cn(
        "shrink-0 w-full",
        isDragging && "opacity-20",
    )}>

      <FlexColumn className={cn(
        "relative w-[23rem] sm:w-[26rem]",
      )}>

        <FlexRow gap={1} centerY className={cn(
          "min-h-12 rounded-lg p-1 bg-border",
          isExpanded && "rounded-bl-none",
          !(data.valueType === 'object' || data.valueType === 'array') && "rounded-b-none",
        )}>

          {/* 親が配列 */}
          {parentIsArr && (
            <Badge className="w-fit h-fit px-1.5 min-w-6 justify-center ml-2 bg-foreground/20" variant={'custom'}>
              {index}
            </Badge>
          )}

          {/* ルートのタイトル */}
          {data.id === 'root' && (
            <Heading className="ml-2 mr-6">
              Root
            </Heading>
          )}


          {data.id !== 'root' && (
            <>
              <JsonTypeSelector data={data} handleTypeChange={handleTypeChange} />
              <Separator orientation="vertical" className="h-[calc(100%+0.5rem)] bg-background" />
            </>
          )}

          {/* キー名の入力フィールド */}
          {data.keyName !== undefined  && (
            <Input
              className={cn(
                "w-44 border-none rounded-none bg-transparent",
                !(data.valueType === "array" || data.valueType === "object") && "rounded-tr-none rounded-bl-none rounded-br-none"
              )}
              value={localKey}
              onChange={(e) => handleKeyChange(e.target.value)}
            />
          )}

          {/* 削除ボタン */}
          {onDelete && (
            <Button variant="ghost" size="icon" onClick={onDelete} className="ml-auto mr-1 rounded-md shrink-0 size-8 hover:bg-foreground/10">
              <Trash2 size={16} />
            </Button>
          )}
        </FlexRow>


        {/* 展開・折りたたみボタン */}
        {(data.valueType === 'object' || data.valueType === 'array') && (
          <Button
            className={cn(
              "absolute -right-12 top-1.5 size-9 shrink-0 rounded-lg",
            )}
            variant="secondary" size="icon"
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        )}

        {!(data.valueType === 'object' || data.valueType === 'array') && (
          <>
            {/* <Separator className="-ml-0.5 my-1 w-[calc(100%+0.25rem)]" /> */}
            {renderValueEditor()}
          </>
        )}

      </FlexColumn>

      {/* オブジェクトや配列の子ノードを表示 */}
      {isExpanded &&
        renderValueEditor()
      }
    </FlexColumn>
  )
}