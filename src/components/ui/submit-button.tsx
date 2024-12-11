'use client'

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

const Submit = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & React.ComponentPropsWithoutRef<typeof Button> & { error?: { message: string } }
>(({ children, error, ...props }, ref) => {
  const { pending } = useFormStatus()
  const t = useTranslations()
  const params = useSearchParams()
  const [errorMsg] = useState(error?.message || params.get('formError'))


  return (
    <>
      {errorMsg &&
        <Alert variant="destructive" className="mt-3">
          <AlertCircle size={18} />
          <AlertDescription className="font-semibold">
            {t(errorMsg)}
          </AlertDescription>
        </Alert>}
      <Button ref={ref} type="submit" disabled={pending} {...props}>
        {pending ?
          <div className="circle-spin-2-invert" /> :
          children}
      </Button>
    </>
  )
})
Submit.displayName = "Submit"

export { Submit }