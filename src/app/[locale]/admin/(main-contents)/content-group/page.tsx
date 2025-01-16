import { GroupCard } from "./_components/group-card";
import { NewContentBtnContainer } from "../../_components/content/new-content-button-container";
import { getTranslations } from "next-intl/server";
import { GridColumn } from "@/components/ui/grid";
import { contentGroupService } from "@/di/services";

export default async function Page() {
  const t = await getTranslations()
  const data = await contentGroupService.findMany()

  return (
    <GridColumn p={6} className="appear @[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
      <NewContentBtnContainer href={'/admin/content-group/new'} label={t('contentGroup.newBtn')} />
      {data.map(group => <GroupCard key={group.id} groupData={group} />)}
    </GridColumn>
  )
}
