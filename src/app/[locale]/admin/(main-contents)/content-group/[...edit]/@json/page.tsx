import { GroupFormContentContainer } from "../_components/content-container";
import { jsonContentService } from "@/di/services";
import { ContentSearch } from "../_components/content-search";
import { SelectedItem } from "../_components/selected-item";
import { ListSelector } from "../_components/selector";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const { searchJson } = await searchParams
  const search = searchJson?.toString() || ''

  const jsons = jsonContentService.getSimpleList(search)

  return (
    <GroupFormContentContainer type={'jsonContents'}>
      <ContentSearch placeholder="jsonContents" query="searchJson" search={search}>
        <ListSelector list={jsons} type={"jsonContents"} />
      </ContentSearch>
      <SelectedItem type="jsonContents" />
    </GroupFormContentContainer>
  )
}