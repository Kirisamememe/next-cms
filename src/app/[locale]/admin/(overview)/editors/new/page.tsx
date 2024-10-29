import { getSession } from "@/lib/getSession";
import { isAdminGroup } from "@/lib/roleUtils";
import { redirect } from "next/navigation";
import { NewEditor } from "./components/new-editor";

export default async function NewEditorFormPage() {
  const { user } = await getSession()

  if (!isAdminGroup(user.role)) {
    redirect('/admin/editors?error=common.error.permission')
  }

  return <NewEditor />
}