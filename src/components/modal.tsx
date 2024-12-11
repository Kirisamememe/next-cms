'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePathname, useRouter } from "@/i18n/routing"

type Props = {
  children: React.ReactNode
  href: string
  routerPush: string
}

export const Modal = ({ children, href, routerPush }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.push(routerPush)
    }
  }
  return (
    <Dialog open={pathname === href} onOpenChange={onOpenChange}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}