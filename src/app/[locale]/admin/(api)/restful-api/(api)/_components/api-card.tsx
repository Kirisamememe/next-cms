import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { ApiDetails } from "./api-detail";
import { ApiSwitch } from "./api-switch";
import { CreateMainContentApi } from "./create-api";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";
import { getTranslations } from "next-intl/server";
import { apiService } from "@/di/services";

type Props = {
  name: string,
  type: 'many' | 'unique'
  path: string
}

export async function ApiCard({ name, type, path }: Props) {
  const t = await getTranslations()
  const data = await apiService.getByName(name)

  if (!data) {
    return (
      <FlexColumn gap={4} p={4} radius={'md'} className="bg-muted/30 justify-between">
        <FlexRow className="justify-between">
          <Heading className="text-lg">
            {t(`api.card.names.${type}`)}
          </Heading>
          <Badge variant={'custom'} className={cn(
            'h-fit px-2 rounded-full bg-muted/60 text-muted-foreground',
          )}>
            {t('api.card.badge.notCreated')}
          </Badge>
        </FlexRow>
        <CreateMainContentApi apiName={name} path={path} />
      </FlexColumn>
    )
  }


  return (
    <FlexColumn gap={4} p={4} radius={'md'} className="bg-muted/30">
      <FlexRow className="justify-between">
        <Heading className="text-lg">
          {t(`api.card.names.${type}`)}
        </Heading>
        <Badge variant={'custom'} className={cn(
          'h-fit px-2 rounded-full bg-muted',
          data.activatedAt && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500'
        )}>
          {data.activatedAt ?
            t('api.card.badge.active') :
            t('api.card.badge.inactive')
          }
        </Badge>
      </FlexRow>
      <ApiDetails api={data} />
      <ApiSwitch apiId={data.id} isActive={!!data.activatedAt} />
    </FlexColumn>
  )
}