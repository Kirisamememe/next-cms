import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib";
import { JsonNodeData, ValueType } from "@/types";
import { Binary, Braces, Brackets, CalendarClock, LetterText, ToggleLeft } from "lucide-react";

type Props = {
  data: JsonNodeData;
  handleTypeChange: (value: ValueType) => void;
}

export function JsonTypeSelector({ data, handleTypeChange }: Props) {
  return (
    <Select value={data.valueType} onValueChange={handleTypeChange}>
      <SelectTrigger className={cn(
        "w-fit gap-3 rounded-tr-none rounded-br-none rounded-bl-none border-none bg-transparent",
      )}>
        <SelectValue placeholder="Type">
          {data.valueType === "string" && (
            <LetterText size={20} />
          )}
          {data.valueType === "number" && (
            <Binary size={20} />
          )}
          {data.valueType === "boolean" && (
            <ToggleLeft size={20} />
          )}
          {data.valueType === "date" && (
            <CalendarClock size={20} />
          )}
          {data.valueType === "array" && (
            <Brackets size={20} />
          )}
          {data.valueType === "object" && (
            <Braces size={20} />
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent sideOffset={-4} alignOffset={-4}>
        <SelectItem value="string">String</SelectItem>
        <SelectItem value="number">Number</SelectItem>
        <SelectItem value="boolean">Boolean</SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="array">Array</SelectItem>
        <SelectItem value="object">Object</SelectItem>
      </SelectContent>
    </Select>
  )
}