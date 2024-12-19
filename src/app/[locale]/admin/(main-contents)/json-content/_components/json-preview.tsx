'use client'

import { FC, useMemo } from "react";
import { useJsonConvert } from "../_hooks/use-json-convert";
import { cn } from "@/lib";

type Props = {
  initData: object
} & React.ComponentPropsWithRef<"div">

export const JsonPreview: FC<Props> = ({ initData, className, ...props }) => {
  const { convertToHighlightedJson } = useJsonConvert()

  const formattedJson = useMemo(() => {
    return convertToHighlightedJson(initData);
  }, [convertToHighlightedJson, initData]);

  return (
    <div className={cn("h-full overflow-scroll", className)} {...props}>
      <pre
        className={`p-6 text-xs font-mono w-full text-ellipsis h-fit`}
        lang="en"
      >
        {formattedJson}
      </pre>
    </div>
  )
}