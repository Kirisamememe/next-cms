import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const session = await auth()

  console.log(`name: ${session?.user?.name}`)
  console.log(`role: ${session?.user?.role}`)
  console.log(`image: ${session?.user?.image}`)

  return (
    <form action={async () => {
      'use server'
      await signOut({ redirectTo: '/admin' })
    }}>
      Dashboard
      <Button >
        Logout
      </Button>
    </form>
  )
}