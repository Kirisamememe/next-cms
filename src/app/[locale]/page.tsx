import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { articleService } from "@/di/services";
import { extractTitleFromMarkdown } from "@/lib";

export default async function Home() {

  const recommendArticleList = await articleService.getMany('published', { take: 10 })

  return (
    <FlexColumn className="m-auto" gap={8}>
      <FlexColumn className="h-72">
        <Heading size={36}>
          Welcome
        </Heading>
      </FlexColumn>
      <FlexColumn gap={3}>
        {recommendArticleList.map((article) => (
          <FlexRow key={article.id} className="w-[32rem] font-semibold line-clamp-1">
            {article.atom.title || extractTitleFromMarkdown(article.atom.body)}
          </FlexRow>
        ))}
      </FlexColumn>
    </FlexColumn>
  )
}
