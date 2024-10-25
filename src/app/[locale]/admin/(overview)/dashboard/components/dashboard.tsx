'use client'

import Image from "next/image";
import { Flexbox } from "../../../../../../components/ui/flexbox";
import { Heading, LabelText } from "../../../../../../components/ui/typography";
import { getDictionary } from "@/lib/translator";

type Props = {
  name?: string | null
  email?: string | null
  role?: "ADMIN" | "USER" | "BLOCKED"
  image?: string | null
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function Dashboard({ name, email, role, image, dictionary }: Props) {
  return (
    <Flexbox border p={8} radius={"lg"}>
      {/* <Heading>
        {name}
      </Heading>
      <LabelText>
        {email}
      </LabelText> */}
      <LabelText>
        {role}
      </LabelText>
      <Image height={200} width={200} src={image || ""} alt="" />
      {dictionary["dashboard"].summary}
    </Flexbox>
  )
}