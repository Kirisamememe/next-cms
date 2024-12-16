import { FlexRow } from "@/components/ui/flexbox"
import { CopyBtn } from "./copy-btn"
import { PublicationDatetimePopover } from "../../../_components/content/publication-datetime-popover"
import { ArchiveAlertDialog } from "../../../_components/content/archive-dialog"

type Props = {
  id: number
  content: any
  date: Date | null
  isArchived: boolean
}

export const JsonContentItemActionBar = ({ id, content, date, isArchived }: Props) => {

  return (
    <FlexRow
      className="border-t px-5 py-1 gap-2 ">
      <CopyBtn content={content} />
      <PublicationDatetimePopover variant={"ghost"} size={"icon"} contentId={id} date={date} contentType="json" side="top" sideOffset={-2} />
      <ArchiveAlertDialog variant={"ghost"} size={'icon'} className="ml-auto" contentId={id} isArchived={isArchived} contentType="json" />
    </FlexRow>
  )
}