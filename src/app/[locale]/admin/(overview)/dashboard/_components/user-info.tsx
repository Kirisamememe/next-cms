import Image from "next/image";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { Role } from "@/types/editor-schema";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

type Props = {
  name?: string | null
  nickname?: string | null
  role?: Role
  image?: string | null
}

export function UserInfo({ name, nickname, role, image }: Props) {
  const t = useTranslations()

  return (
    <FlexRow border p={8} radius={"lg"} gap={6} centerY bg className="w-full">
      <Image height={120} width={120} src={image || ""} alt="avatar image" className="rounded-full" />
      <FlexColumn>
        <Heading size={24} mb={2}>
          {t('dashboard.welcome', { name: nickname || name })}
        </Heading>
        <Badge className="w-fit">
          {t(`editor.${role}`)}
        </Badge>
      </FlexColumn>
    </FlexRow>
  )
}