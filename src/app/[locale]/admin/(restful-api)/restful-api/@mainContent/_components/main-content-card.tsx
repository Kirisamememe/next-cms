import { FlexColumn } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { ApiDetails } from "./api-detail";
import { ApiSwitch } from "./api-switch";
import { apiService } from "@/services/api-service";
import { CreateMainContentApi } from "./create-api";

type Props = {
  name: string
}

export async function MainContentApiCard({ name }: Props) {
  const { data, noData } = await apiService.getByName(name)
  if (noData) {
    return (
      <FlexColumn gap={4} p={4} radius={'md'} className="bg-muted/30">
        <Heading className="text-lg">
          {name}
        </Heading>
        <CreateMainContentApi apiName={name} />
      </FlexColumn>
    )
  }


  return (
    <FlexColumn gap={4} p={4} radius={'md'} className="bg-muted/30">
      <Heading className="text-lg">
        {name}
      </Heading>
      <ApiDetails api={data} />
      <ApiSwitch apiId={data.id} isActive={!!data.activatedAt} />
    </FlexColumn>
  )
}