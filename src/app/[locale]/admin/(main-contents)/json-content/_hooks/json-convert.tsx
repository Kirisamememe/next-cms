import { JsonNodeData, ValueType } from "@/types";
import { createId } from "@paralleldrive/cuid2";
import { JSX } from "react";

export const convertToJsonValue = (node: JsonNodeData): any => {
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
}

const isValidDateString = (value: string): boolean => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const convertToJsonNodeData = (jsonValue: any, option?: { isRoot: boolean }): JsonNodeData => {
  if (Array.isArray(jsonValue)) {
    const arr: JsonNodeData = {
      id: createId(),
      valueType: 'array',
      children: [],
    };
    jsonValue.forEach((value) => {
      arr.children?.push(convertToJsonNodeData(value));
    });
    return arr;
  }

  if (typeof jsonValue === 'string' && isValidDateString(jsonValue)) {
    return {
      id: createId(),
      valueType: 'date',
      value: new Date(jsonValue),
    };
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
        id: option?.isRoot ? 'root' : createId(),
        valueType: 'object',
        children: [],
      };
      Object.entries(jsonValue).forEach(([key, value]) => {
        const child = convertToJsonNodeData(value);
        child.keyName = key;
        obj.children?.push(child);
      });
      return obj;
    default:
      return {
        id: 'root',
        valueType: 'object',
        children: [],
      }
  }
}


export const convertToHighlightedJson = (value: any, indent: number = 0): JSX.Element => {
  const space = '  '.repeat(indent);
  const nextIndent = indent + 1;

  if (value === null) return <span className="text-gray-500">null</span>;

  switch (typeof value) {
    case 'string':
      if (isValidDateString(value)) {
        return <span className="text-yellow-600">&quot;{new Date(value).toISOString()}&quot;</span>;
      }
      return (
        <span className="text-lime-600">
          &quot;{value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}&quot;
        </span>
      )
    case 'number':
      return <span className="text-blue-400">{value}</span>;
    case 'boolean':
      return <span className="text-purple-400">{String(value)}</span>;
    case 'object':
      if (value instanceof Date) {
        return <span className="text-yellow-600">&quot;{value.toISOString()}&quot;</span>;
      }
      if (Array.isArray(value)) {
        if (value.length === 0) return <>[]</>;
        return (
          <>
            [
            {value.map((item, index) => (
              <span key={index}>
                {'\n'}{space}{'  '}
                {convertToHighlightedJson(item, nextIndent)}
                {index < value.length - 1 && ','}
              </span>
            ))}
            {'\n'}{space}]
          </>
        );
      }
      const entries = Object.entries(value);
      if (entries.length === 0) return <>{'{}'}</>;
      return (
        <>
          {'{'}
          {entries.map(([key, val], index) => (
            <span key={key} className="">
              {'\n'}{space}{'  '}
              <span className="text-emerald-600">&quot;{key.replace(/"/g, '\\"')}&quot;</span>
              {': '}
              {convertToHighlightedJson(val, nextIndent)}
              {index < entries.length - 1 && ','}
            </span>
          ))}
          {'\n'}{space}{'}'}
        </>
      );
    default:
      return <>{String(value)}</>;
  }
}