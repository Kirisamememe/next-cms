import { prisma } from "@/prisma"
import { signUpSchema } from "@/types/auth-schema"
import { z } from "zod"

export async function isUserExist() {
  const users =  await prisma.user.findMany()
  return users.length > 0
}

export async function getUserByName(name: string) {
  const user = await prisma.user.findUnique({
    where: {
      name: name
    },
    select: {
      name: true,
      password: true,
      role: true,
      image: true
    }
  })

  return user
}

export async function registerUser({ name, password }: z.infer<typeof signUpSchema> ) {
  return await prisma.user.create({
    data: {
      name: name,
      password: password
    }
  })
}