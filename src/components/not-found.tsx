import { NotFoundIllustration } from "@/components/404";
import { Button } from "@/components/ui/button";
import { Flexbox } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import Link from "next/link";

type Props = {
  href?: string
}

export default function NotFound({ href = '/' }: Props) {

  return (
    <Flexbox center className="m-auto">
      <NotFoundIllustration />
      <Heading size={20}>
        Not Found
      </Heading>
      <p>Could not find requested resource</p>
      <Button asChild className="mt-4 mb-12">
        <Link href={href}>
          Back to home
        </Link>
      </Button>
    </Flexbox>
  )
}