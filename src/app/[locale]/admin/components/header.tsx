import { FlexRow } from "../../../../components/ui/flexbox";
import { SidebarTrigger } from "../../../../components/ui/sidebar";
import { getDictionary } from "@/lib/translator";
import { Heading } from "../../../../components/ui/typography";

export function Header({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["auth"];
}) {

  // ヘッダータイトルをマッピングする

  return (
    <FlexRow className="sticky top-0 h-16 w-full border-b justify-between items-center">
      <FlexRow p={3} gap={2} center>
        <SidebarTrigger className="size-10" />
        <Heading>
          {dictionary["dashboard"]["summary"]}
        </Heading>
      </FlexRow>
    </FlexRow>
  )
}