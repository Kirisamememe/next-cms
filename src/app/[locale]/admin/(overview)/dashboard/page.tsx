import { Dashboard } from "@/app/[locale]/admin/(overview)/dashboard/_components/dashboard";
import { getSession } from "@/lib/getSession";

export default async function DashboardPage() {
  const { user } = await getSession()

  return <Dashboard name={user.name} nickname={user.nickname} role={user.role} image={user.image} />
}