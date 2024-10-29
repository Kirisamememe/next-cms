import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Submit } from "@/components/ui/submit-button"
import { useTranslations } from "next-intl"
import { FormHeader } from "./form-header"

type Props = {
  email: string
  image: string | null
  name: string | null
  nickname: string | null
  action: (formData: FormData) => Promise<never>
}

export function EditProfileForm({ email, image, name, nickname, action }: Props) {
  const t = useTranslations()

  return (
    <form action={action} className="flex flex-col gap-3">
      <FormHeader email={email} image={image} name={name} nickname={nickname} />

      <Separator />

      <label className="flex flex-col gap-2 text-sm">
        <span className="ml-1 font-semibold">
          {t('editor.profile.nickname')}
        </span>
        <Input name="nickname" defaultValue={nickname || ""} placeholder={t('editor.profile.nicknamePlaceholder')} />
      </label>

      <Submit className="mt-4">
        {t("common.submit")}
      </Submit>
    </form>
  )
}