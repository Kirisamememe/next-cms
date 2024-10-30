import { Flexbox } from "@/components/ui/flexbox";
import { Submit } from "@/components/ui/submit-button";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode
  isPending: boolean
}

export function ArticleConfig({ isPending, children }: Props) {
  return (
    <Flexbox border radius={"lg"} className="sticky top-[86px] shrink-0 w-72 h-[calc(100vh-7rem)] p-4">
      {children}
      <Submit disabled={isPending}>Submit</Submit>
    </Flexbox>
  )
}