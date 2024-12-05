export type JsonNodeData = {
  id: string;
  keyName?: string;
  index?: number;
  valueType: ValueType;
  value?: string | number | boolean | Date;
  children?: JsonNodeData[];
};

export type ValueType = "string" | "number" | "boolean" | "date" | "array" | "object";