import { JsonNodeData, ValueType } from "@/types";
import { createId } from "@paralleldrive/cuid2";
import { useCallback } from "react";

export const useJsonConvert = () => {

  const convertToJsonValue = useCallback((node: JsonNodeData): any => {
    switch (node.valueType) {
      case 'string':
      case 'number':
      case 'boolean':
        return node.value;
      case 'date':
        return node.value;
      case 'object':
        const obj: { [key: string]: any } = {};
        (node.children || []).forEach((child) => {
          if (child.keyName !== undefined) {
            obj[child.keyName] = convertToJsonValue(child);
          }
        });
        return obj;
      case 'array':
        return (node.children || []).map((child) => convertToJsonValue(child));
    }
  }, [])

  const convertToJsonData = useCallback((jsonValue: any): JsonNodeData => {
    if (Array.isArray(jsonValue)) {
      const arr: JsonNodeData = {
        id: createId(),
        valueType: 'array',
        children: [],
      };
      jsonValue.forEach((value) => {
        arr.children?.push(convertToJsonData(value));
      });
      return arr;
    }

    if (jsonValue instanceof Date) {
      return {
        id: createId(),
        valueType: 'date',
        value: jsonValue,
      };
    }

    switch (typeof jsonValue) {
      case 'string':
      case 'number':
      case 'boolean':
        return {
          id: createId(),
          valueType: typeof jsonValue as ValueType,
          value: jsonValue,
        }
      case 'object':
        if (jsonValue === null) {
          return {
            id: createId(),
            valueType: 'string',
            value: '',
          }
        }
        const obj: JsonNodeData = {
          id: createId(),
          valueType: 'object',
          children: [],
        };
        Object.entries(jsonValue).forEach(([key, value]) => {
          const child = convertToJsonData(value);
          child.keyName = key;
          obj.children?.push(child);
        });
        return obj;
      default:
        return {
          id: createId(),
          valueType: 'string',
          value: '',
        }
    }
  }, [])

  return { 
    convertToJsonValue,
    convertToJsonData,
  }
}