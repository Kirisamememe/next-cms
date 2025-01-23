import { GroupCard } from "./_components/group-card";
import { NewContentBtnContainer } from "../../_components/content/new-content-button-container";
import { getTranslations } from "next-intl/server";
import { GridColumn } from "@/components/ui/grid";
import { contentGroupService } from "@/di/services";
import { FlexColumn } from "@/components/ui/flexbox";
import { NoContentFound } from "@/components/no-article-found";
import { ContentTotal } from "../../_components/content/content-total";

export default async function Page() {
  const t = await getTranslations()
  const data = await contentGroupService.findMany()

  if (!data.length) {
    return (
      <FlexColumn center className="h-full">
        <NewContentBtnContainer href={'/admin/content-group/new'} label={t('contentGroup.newBtn')} />
        <NoContentFound text={t('contentGroup.noContent')} />
      </FlexColumn>
    )
  }

  return (
    <>
      <NewContentBtnContainer href={'/admin/content-group/new'} label={t('contentGroup.newBtn')} />
      <GridColumn p={6} className="appear @[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
        {data.map(group => <GroupCard key={group.id} groupData={group} />)}
      </GridColumn>
      <ContentTotal text={t('common.search.total', { total: data.length })} />
    </>
  )
}
