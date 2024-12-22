import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib"
import { FC } from "react"
import { modelListTuple } from "@/types/schema-ai"
import Cookies from "js-cookie";

type Props = {
  className?: string
} & React.ComponentPropsWithoutRef<typeof Select>
  & Pick<React.ComponentPropsWithoutRef<typeof SelectValue>, "placeholder">

export const AIModelSelector: FC<Props> = ({ className, placeholder, ...props }) => {
  const defaultModel = Cookies.get('AI_MODEL')

  return (
    <Select name="ai-model" defaultValue={defaultModel} {...props}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {modelListTuple.map((model) => (
          <SelectItem key={model} value={model}>
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}