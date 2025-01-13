import { FlexRow } from "@/components/ui/flexbox"
import { CopyBtn } from "../../../_components/content/copy-btn"
import { PublicationDatetimePopover } from "../../../_components/content/publication-datetime-popover"
import { ArchiveAlertDialog } from "../../../_components/content/archive-dialog"
import { updateJsonContentPublishedAt } from "../../../_actions/update"

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
      <ArchiveAlertDialog variant={"ghost"} size={'icon'} className="mr-auto" contentId={id} isArchived={isArchived} contentType="json" />
      <CopyBtn content={content} />
      <PublicationDatetimePopover
        variant={"ghost"} size={"icon"}
        contentId={id} date={date}
        side="top" sideOffset={-2}
        updateAction={updateJsonContentPublishedAt}
      />
    </FlexRow>
  )
}