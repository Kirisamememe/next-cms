import { FlexRow } from "@/components/ui/flexbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  email: string
  image: string | null
  name: string | null
  nickname: string | null
}

export function FormHeader({ email, image, name, nickname }: Props) {
  return (
    <FlexRow px={1} py={2} gap={2} radius={"md"}>
      <Avatar className="size-9 group-data-[collapsible=icon]:size-8">
        {image &&
          <AvatarImage src={image} />}
        <AvatarFallback>{name || "USER"}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {nickname || name}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {email}
        </span>
      </div>
    </FlexRow>
  )
}