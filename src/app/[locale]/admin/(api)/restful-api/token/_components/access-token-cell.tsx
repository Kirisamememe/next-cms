import { Input } from "@/components/ui/input";

type Props = {
  token: string
}

export function AccessTokenCell({ token }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Input value={token} readOnly className="w-64" />
    </div>
  )
}