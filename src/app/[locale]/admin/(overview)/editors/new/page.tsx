import { getSession, isAdminGroup } from "@/lib-server-only";
import { notFound } from "next/navigation";
import { NewEditor } from "./_components/new-editor";


export default async function NewEditorFormPage() {
  const { user } = await getSession()

  if (!isAdminGroup(user.role)) {
    notFound()
  }

  return <NewEditor />
}