'use client'

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { generateToken } from "../_actions/create"
import { TokenGenerateFormResult } from "./generate-form-result"
import { TokenGenerateForm } from "./generate-form"
import { useActionState } from "react"
import { useTranslations } from "next-intl"


export function AccessTokenDialog() {
  const t = useTranslations()
  const [newlyCreatedToken, formAction] = useActionState(
    async (_: string, formData: FormData) => {
      const name = formData.get('name')?.toString()
      if (!name) {
        return ''
      }
      const newToken = await generateToken(name)
      return newToken.token
    }, ''
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <Plus size={16} />
          {t('restfulApi.token.generate')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction} className="flex flex-col gap-4">
          {newlyCreatedToken ?
            <TokenGenerateFormResult newlyCreatedToken={newlyCreatedToken} /> :
            <TokenGenerateForm />
          }
        </form>
      </DialogContent>
    </Dialog>
  )
}