import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  redirect('/sign-in');
}
