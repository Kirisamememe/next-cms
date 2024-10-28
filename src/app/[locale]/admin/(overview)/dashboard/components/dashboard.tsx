'use client'

import Image from "next/image";
import { Flexbox } from "@/components/ui/flexbox";
import { Heading, LabelText } from "@/components/ui/typography";
import { Role } from "@/types/editor-schema";

type Props = {
  name?: string | null
  email?: string | null
  role?: Role
  image?: string | null
}

export function Dashboard({ name, email, role, image }: Props) {
  return (
    <Flexbox border p={8} radius={"lg"} className="appear">
      <Heading>
        {name}
      </Heading>
      <LabelText>
        {email}
      </LabelText>
      <LabelText>
        {role}
      </LabelText>
      <Image height={200} width={200} src={image || ""} alt="" />
    </Flexbox>
  )
}