'use client'

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import React from "react";

const Submit = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  const { pending, data } = useFormStatus()
  console.log(`Data: ${data}`)

  return (
    <Button ref={ref} type="submit" disabled={pending} {...props}>
      {pending ?
        <div className="circle-spin-2-invert" /> :
      children}
    </Button>
  )
}) 
Submit.displayName = "Submit"

export { Submit }