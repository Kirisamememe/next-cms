import { FlexRow } from "@/components/ui/flexbox"
import { LabelText } from "@/components/ui/typography"

type Props = {
  text: string
}

export const ContentTotal = ({ text }: Props) => {
  return (
    <FlexRow border center className="mx-auto w-80 h-12 my-6 bg-muted/50 rounded-full">
      <LabelText size={14}>
        {text}
      </LabelText>
    </FlexRow>
  )
}