import { EmptyIllustration } from "@/components/empty";
import { FlexColumn } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib";

type Props = {
  text: string
  className?: string
}

export function NoContentFound({ text, className }: Props) {
  return (
    <FlexColumn center className={cn("m-auto pb-16", className)}>
      <EmptyIllustration />
      <Heading weight={600} className="">
        {text}
      </Heading>
    </FlexColumn>
  )
}