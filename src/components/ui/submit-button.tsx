'use client'

import { useFormStatus } from "react-dom";
import { Button } from "./button";

import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { FC } from "react";

type Props = {
  error?: { message: string }
  isPending?: boolean
} & React.ComponentPropsWithRef<typeof Button>

const Submit: FC<Props> = ({ children, error, isPending = false, ref, ...props }) => {
  const { pending } = useFormStatus()
  const _pending = pending || isPending
  const t = useTranslations()

  return (
    <>
      {error?.message &&
        <Alert variant="destructive" className="mt-3 w-full">
          <AlertCircle size={18} />
          <AlertDescription className="font-semibold">
            {t(error?.message)}
          </AlertDescription>
        </Alert>
      }
      <Button ref={ref} type="submit" {...props} disabled={_pending}>
        {_pending ?
          <div className="circle-spin-2-invert" /> :
          children}
      </Button>
    </>
  )
}
Submit.displayName = "Submit"

export { Submit }