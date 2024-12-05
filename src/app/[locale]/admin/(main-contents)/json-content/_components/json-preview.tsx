'use client'

import { FlexColumn } from "@/components/ui/flexbox";
import { JsonNodeData } from "@/types";
import { JSX, useMemo } from "react";

type Props = {
  initData: JsonNodeData
}

export function JsonPreview({ initData }: Props) {
  const formattedJson = useMemo(() => {
    return formatJsonWithTypes(convertToJsonValue(initData));
  }, [initData]);

  return (
    <FlexColumn border radius={"lg"} p={6} className="sticky top-20 h-fit basis-1/3 min-w-80">
      <pre 
        className={`text-sm font-mono w-full overflow-hidden text-ellipsis`}
        lang="en"
      >
        {formattedJson}
      </pre>
    </FlexColumn>
  )
}

function convertToJsonValue(node: JsonNodeData): any {
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

function formatJsonWithTypes(value: any, indent: number = 0): JSX.Element {
  const space = '  '.repeat(indent);
  const nextIndent = indent + 1;

  if (value === null) return <span className="text-gray-500">null</span>;
  
  switch (typeof value) {
    case 'string':
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
                {formatJsonWithTypes(item, nextIndent)}
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
              {formatJsonWithTypes(val, nextIndent)}
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