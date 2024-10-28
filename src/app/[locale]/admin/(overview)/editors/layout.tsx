import { AuthorizedEditorList } from "./components/authorized-editors";
import { UnauthorizedEditorList } from "./components/unauthorized-editors";

export default async function EditorsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthorizedEditorList />
      <UnauthorizedEditorList />
      {children}
    </>
  )
}