import { createMainContentApi } from "../_actions/create"
import { Submit } from "@/components/ui/submit-button"

type Props = {
  apiName: string
}

export function CreateMainContentApi({ apiName }: Props) {
  const action = async () => {
    'use server'
    await createMainContentApi(apiName)
  }

  return (
    <form action={action}>
      <Submit className="w-fit">
        Create
      </Submit>
    </form>
  )
}