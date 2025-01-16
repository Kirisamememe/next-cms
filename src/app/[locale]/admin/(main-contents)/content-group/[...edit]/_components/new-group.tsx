'use client'

import { contentGroupSchema, FormState } from "@/types"
import { GroupForm } from "./group-form"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const NewGroup = () => {

  return (
    <GroupForm />
  )
}