import { Flexbox } from "@/components/ui/flexbox";
import { cn } from "@/lib";
import { FC } from "react";

type Props = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">

export const InsetLayoutWithPadding: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Flexbox className={cn("h-full gap-4 p-4 @[40rem]:p-6", className)} {...props}>
      {children}
    </Flexbox>
  )
};