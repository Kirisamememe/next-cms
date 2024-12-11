'use client'

import { useMemo } from "react";
import { useJsonConvert } from "../_hooks/use-json-convert";

type Props = {
  initData: object
}

export function JsonPreview({ initData }: Props) {
  const { convertToHighlightedJson } = useJsonConvert()

  const formattedJson = useMemo(() => {
    return convertToHighlightedJson(initData);
  }, [convertToHighlightedJson, initData]);

  return (
    <pre
      className={`p-6 text-xs font-mono w-full text-ellipsis h-fit`}
      lang="en"
    >
      {formattedJson}
    </pre>
  )
}