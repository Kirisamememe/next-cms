import { Flexbox } from "@/components/ui/flexbox";
import { AuthenticateEditorList } from "./components/authenticate-editors";
import { UnauthenticatedEditorList } from "./components/unauthenticated-editors";
import { getSession } from "@/lib/getSession";

export default async function EditorsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, operatorId } = await getSession()

  return (
    <>
      <AuthenticateEditorList operatorId={operatorId} operatorRole={user.role} />
      <UnauthenticatedEditorList operatorRole={user.role} />
      <Flexbox center className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] z-[100]">
        {children}
      </Flexbox>
    </>
  )
}