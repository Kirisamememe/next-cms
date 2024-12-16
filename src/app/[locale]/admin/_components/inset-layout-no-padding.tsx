import { Flexbox } from "@/components/ui/flexbox";
import { FC } from "react";

type Props = {
  children: React.ReactNode
} & React.ComponentPropsWithRef<typeof Flexbox>

export const InsetLayoutNoPadding: FC<Props> = ({ children, ...props }) => {
  return (
    <Flexbox className="h-full" {...props}>
      {children}
    </Flexbox>
  )
};