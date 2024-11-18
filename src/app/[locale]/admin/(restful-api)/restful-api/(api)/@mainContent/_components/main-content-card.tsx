import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { ApiDetails } from "./api-detail";
import { ApiSwitch } from "./api-switch";
import { apiService } from "@/services/api-service";
import { CreateMainContentApi } from "./create-api";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

type Props = {
  name: string
}

export async function MainContentApiCard({ name }: Props) {
  const t = await getTranslations()
  const { data, noData } = await apiService.getByName(name)

  if (noData) {
    return (
      <FlexColumn gap={4} p={4} radius={'md'} className="bg-muted/30 justify-between">
        <FlexRow className="justify-between">
          <Heading className="text-lg">
            {name}
          </Heading>
          <Badge variant={'custom'} className={cn(
            'h-fit px-2 rounded-full bg-muted/60 text-muted-foreground',
          )}>
            {t('restfulApi.mainApi.card.badge.notCreated')}
          </Badge>
        </FlexRow>
        <CreateMainContentApi apiName={name} />
      </FlexColumn>
    )
  }


  return (
    <FlexColumn gap={4} p={4} radius={'md'} className="bg-muted/30">
      <FlexRow className="justify-between">
        <Heading className="text-lg">
          {name}
        </Heading>
        <Badge variant={'custom'} className={cn(
          'h-fit px-2 rounded-full bg-muted',
          data.activatedAt && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500'
        )}>
          {data.activatedAt ?
            t('restfulApi.mainApi.card.badge.active') :
            t('restfulApi.mainApi.card.badge.inactive')
          }
        </Badge>
      </FlexRow>
      <ApiDetails api={data} />
      <ApiSwitch apiId={data.id} isActive={!!data.activatedAt} />
    </FlexColumn>
  )
}