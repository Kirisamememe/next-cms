'use server'

import { prisma } from "@/prisma"

export async function isUserExist() {
  const users = await prisma.user.findMany()
  return users.length > 0
}

export async function isAllowedEmail(email: string) {
  const emails = await prisma.allowedEmail.findMany()
  console.log(`Prismaです：${emails[0]}`)
  return emails.length === 0 || emails.map((val) => val.email).includes(email)
}

export async function getUserRoleByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      role: true,
    }
  })

  return user
}