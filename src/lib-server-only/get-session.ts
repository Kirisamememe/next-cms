import 'server-only';
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function getSession() {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin')
  }

  return {
    user: session.user,
    operatorId: session.operatorId
  }
}