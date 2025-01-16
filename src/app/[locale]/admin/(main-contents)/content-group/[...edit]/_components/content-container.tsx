import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib"
import { useTranslations } from "next-intl"

type Props = {
  children: React.ReactNode
  className?: string
  type: 'articles' | 'mediaFolders' | 'jsonContents'
}

export function GroupFormContentContainer({ children, className, type }: Props) {
  const t = useTranslations()

  return (
    <Card className={cn('h-full min-h-[26rem] flex flex-col', className)}>
      <CardHeader>
        <CardTitle>{t(`contentGroup.form.${type}.title`)}</CardTitle>
        <CardDescription>{t(`contentGroup.form.${type}.description`)}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-6 h-full">
        {children}
      </CardContent>
    </Card>
  )
}