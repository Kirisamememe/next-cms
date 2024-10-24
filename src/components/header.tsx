import LocaleSwitcher from "./locale-switcher";
import { FlexRow } from "./ui/flexbox";

export function Header() {
  return (
    <FlexRow className="fixed top-0 left-0 h-16 w-full border-b justify-between">
      Dashboard
      <LocaleSwitcher />
    </FlexRow>
  )
}