import { Button } from "@/components/ui/button";
import { Flexbox } from "@/components/ui/flexbox";
import { Link } from "@/i18n";

export default function Page() {
  return (
    <Flexbox border radius={"lg"} gap={6} p={6}>
      <Link href={'/admin/json-content/new'}>
        <Button>
          Create
        </Button>
      </Link>
      <Link href={'/admin/json-content/edit'}>
        <Button>
          Edit
        </Button>
      </Link>
    </Flexbox>
  )
}