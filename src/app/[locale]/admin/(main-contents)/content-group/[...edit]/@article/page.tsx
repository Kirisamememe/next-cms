import { articleService } from "@/di/services";
import { GroupFormContentContainer } from "../_components/content-container";
import { ContentSearch } from "../_components/content-search";
import { SelectedItem } from "../_components/selected-item";
import { ListSelector } from "../_components/selector";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const { searchArticle } = await searchParams
  const search = searchArticle?.toString() || ''

  const articles = articleService.getSimpleList(search)

  return (
    <GroupFormContentContainer type={'articles'}>
      <ContentSearch placeholder="articles" query="searchArticle" search={search}>
        <ListSelector list={articles} type={"articles"} />
      </ContentSearch>
      <SelectedItem type="articles" />
    </GroupFormContentContainer>
  )
}