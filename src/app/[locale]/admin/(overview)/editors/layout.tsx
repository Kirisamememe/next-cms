import { InsetLayoutWithPadding } from "../../_components/inset-layout-with-padding";
import { AuthenticateEditorList } from "./_components/authenticate-editors";
import { UnauthenticatedEditorList } from "./_components/unauthenticated-editors";
import { getSession } from "@/lib-server-only";

export default async function EditorsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, operatorId } = await getSession()

  return (
    <InsetLayoutWithPadding>
      <AuthenticateEditorList operatorId={operatorId} operatorRole={user.role} />
      <UnauthenticatedEditorList operatorRole={user.role} />
      {children}
    </InsetLayoutWithPadding>
  )
}