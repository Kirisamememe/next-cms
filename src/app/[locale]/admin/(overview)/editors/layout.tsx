import { AuthorizedEditorList } from "./components/authorized-editors";
import { UnauthorizedEditorList } from "./components/unauthorized-editors";
import { getSession } from "@/lib/getSession";

export default async function EditorsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, operatorId } = await getSession()

  return (
    <>
      <AuthorizedEditorList operatorId={operatorId} operatorRole={user.role} />
      <UnauthorizedEditorList operatorRole={user.role} />
      {children}
    </>
  )
}