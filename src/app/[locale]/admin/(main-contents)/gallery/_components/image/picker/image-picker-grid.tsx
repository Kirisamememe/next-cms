import { GridColumn } from "@/components/ui/grid"
import { ImageItem } from "./image-picker-item"

type Props = {
  urls: string[]
}

export function ImagePickerGrid({ urls }: Props) {

  return (
    <GridColumn grid={4} gap={0.5}>
      {urls.map((url) => (
        <ImageItem key={url} url={url} />
      ))}
    </GridColumn>
  )
}