import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib"
import { FC } from "react"
import { ContentCategory } from "@/types"

type Props = {
  className?: string
  categories: ContentCategory[]
} & React.ComponentPropsWithoutRef<typeof Select>
  & Pick<React.ComponentPropsWithoutRef<typeof SelectValue>, "placeholder">

export const CategorySelector: FC<Props> = ({ className, categories, placeholder, ...props }) => {

  return (
    <Select name="category" {...props}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">No Category</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}