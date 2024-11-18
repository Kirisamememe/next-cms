'use client'

import { Switch } from "@/components/ui/switch";
import { useActionState, useOptimistic } from "react";
import { toggleActive } from "../_actions/update";

type Props = {
  isActive: boolean
  apiId: number
}

export function ApiSwitch({ isActive, apiId }: Props) {
  const [state, formAction] = useActionState(async () => {
    addOptimistic(!state)

    const { data, error } = await toggleActive(apiId, !state)
    if (error) {
      console.log(error)
      return false
    }
    return !!data.activatedAt
  }, isActive)

  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    (_, newState: boolean) => {
      return newState
    }
  )

  return (
    <form action={formAction}>
      <Switch
        type="submit"
        checked={optimisticState}
      />
    </form>

  )
}