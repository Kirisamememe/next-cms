import { Flexbox } from "@/components/ui/flexbox";
import { JsonEditor } from "../_components/editor/json-editor";

export default function Page() {
  return (
    <Flexbox gap={6}>
      <JsonEditor />
    </Flexbox>
  )
}