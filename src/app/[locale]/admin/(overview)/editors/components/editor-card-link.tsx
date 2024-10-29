import { Editor } from "@/types/editor-schema";
import Link from "next/link";
import { EditorCard } from "./editor-card";

type Props = {
  editor: Editor
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