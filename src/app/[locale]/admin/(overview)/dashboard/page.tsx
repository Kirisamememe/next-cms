import { UserInfo } from "./_components/user-info";
import { Flexbox } from "@/components/ui/flexbox";
import { getSession } from "@/lib-server-only";
import Dashboard from "./_components/dashboard-dummy";

export default async function DashboardPage() {
  const { user } = await getSession()

  return (
    <Flexbox p={6} gap={6} className="appear">
      <UserInfo name={user.name} nickname={user.nickname} role={user.role} image={user.image} />
      <Dashboard />
    </Flexbox>
  )
}