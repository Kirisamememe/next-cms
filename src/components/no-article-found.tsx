import { EmptyIllustration } from "@/components/empty";
import { FlexColumn } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";

type Props = {
  text: string
}

export function NoContentFound({ text }: Props) {
  return (
    <FlexColumn center className="m-auto">
      <EmptyIllustration />
      <Heading weight={600} className="mb-16">
        {text}
      </Heading>
    </FlexColumn>
  )
}