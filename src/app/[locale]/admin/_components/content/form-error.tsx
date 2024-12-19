import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  message?: string
}

export const FormError = ({ message }: Props) => {
  const t = useTranslations()

  if (!message) return null

  return (
    <Alert variant="destructive" className="w-full">
      <AlertCircle size={18} />
      <AlertDescription className="font-semibold">
        {t(message)}
      </AlertDescription>
    </Alert>
  )
};