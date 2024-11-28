import { EditorConcise } from "@/types";
import { EditorCard } from "./editor-card";
import { Link } from "@/i18n";

type Props = {
  editor: EditorConcise
}

export function EditorCardWithLink({ editor }: Props) {
  return (
    <Link
      href={`/admin/editors/${editor.id}`}
      className="transition-transform [&>div]:hover:bg-muted/60 active:scale-95"
    >
      <EditorCard editor={editor} />
    </Link>
  )
}