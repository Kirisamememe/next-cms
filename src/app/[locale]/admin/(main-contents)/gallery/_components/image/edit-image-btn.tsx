import { Link } from "@/i18n";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

type Props = {
  imageId: number
}

export function EditImageBtn({ imageId }: Props) {
  return (
    <Link href={`/admin/gallery/edit/${imageId}`} scroll={false} prefetch>
      <Button
        type="button" variant={'secondary'}
        className="group-hover:opacity-100 group-active:opacity-0 group-hover:pointer-events-auto opacity-0 pointer-events-none absolute top-2 right-2 rounded-full bg-background/70 p-0 size-8 hover:bg-foreground hover:text-background hover:shadow-xl">
        <PenLine size={16} />
      </Button>
    </Link>
  )
}