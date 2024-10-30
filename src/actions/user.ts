'use server'

import { prisma } from "@/prisma"

export async function isUserExist() {
  const users = await prisma.user.findMany()
  return users.length > 0
}

export async function getAllowedEmails() {
  return await prisma.allowedEmail.findMany()
}

export async function addAllowedEmail(email: string) {
  return await prisma.allowedEmail.create({
    data: {
      email: email
    }
  })
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      role: true,
      nickname: true,
      image: true
    }
  })

  return user
}


export async function noSuperAdmin() {
  const superAdmin = await prisma.user.findMany({
    where: {
      role: "SUPER_ADMIN"
    }
  })

  return superAdmin.length === 0;
}

export async function setAsSuperAdmin(email: string) {
  return await prisma.user.update({
    where: {
      email: email
    },
    data: {
      role: "SUPER_ADMIN"
    }
  })
}