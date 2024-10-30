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
      <Flexbox center className="fixed top-0 left-0 w-dvw h-dvh z-[50] pointer-events-none">
        {children}
      </Flexbox>
      <AuthenticateEditorList operatorId={operatorId} operatorRole={user.role} />
      <UnauthenticatedEditorList operatorRole={user.role} />
    </>
  )
}