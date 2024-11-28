import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"
import { Link } from "@/i18n"

type Props = {
  id: number
}

export function ImageEditBtn({ id }: Props) {
  return (
    <Link href={`/admin/gallery/edit/${id}`} scroll={false}>
      <Button variant={"secondary"} size={"icon"}
        className="group-hover:inline-flex hidden absolute top-2 right-2 rounded-full bg-background/50 size-8">
        <PenLine size={16} />
      </Button>
    </Link>
  )
}