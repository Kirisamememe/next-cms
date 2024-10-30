import { CircleSpinLoading } from "@/components/circle-spin-loading";
import { Flexbox } from "@/components/ui/flexbox";

export default function Loading() {
  return (
    <Flexbox center className="fixed top-0 left-0 w-dvw h-dvh z-0 bg-black/50 pointer-events-none">
      <CircleSpinLoading />
    </Flexbox>
  )
}