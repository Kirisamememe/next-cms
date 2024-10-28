import { Flexbox } from "@/components/ui/flexbox"
import { Heading, Paragraph } from "@/components/ui/typography"
import Link from "next/link"

type Props = {
  id: number
  title: string
  summary: string
}

export function ArticleCard({ id, title, summary }: Props) {
  return (
    <Link href={`/admin/articles/edit/${id}`}>
      <Flexbox border radius={"lg"} p={4} className="hover:bg-muted/50">
        <Heading>
          {title}
        </Heading>
        <Paragraph color="muted">
          {summary}
        </Paragraph>
      </Flexbox>
    </Link>
  )
}