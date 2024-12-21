import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

export function NewImageBtn() {
  const t = useTranslations()

  return (
    <Link href={'/admin/gallery/new'} scroll={false} prefetch>
      <Button type="button" variant={'outline'} className="border-foreground/10 bg-background/40">
        <ImagePlus size={16} />
        {t('gallery.imageUrl.btn')}
      </Button>
    </Link>
  )
}