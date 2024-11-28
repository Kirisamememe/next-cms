import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Role, roles } from "@/types"
import { Separator } from "@/components/ui/separator"
import { Submit } from "@/components/ui/submit-button"
import { useTranslations } from "next-intl"
import { FormHeader } from "./form-header"
import { isPermissible } from "@/lib-server-only"

type Props = {
  email: string
  targetRole: Role
  image: string | null
  name: string | null
  nickname: string | null
  operatorRole: Role
  action: (formData: FormData) => Promise<never>
}

export function EditEditorRoleForm({
  image,
  email,
  name,
  targetRole,
  nickname,
  operatorRole,
  action
}: Props) {
  const t = useTranslations()

  return (
    <form action={action} className="flex flex-col gap-3">
      <FormHeader email={email} image={image} name={name} nickname={nickname} />

      <Separator />

      <label className="flex flex-col gap-2 text-sm">
        <span className="ml-1 font-semibold">
          {t('editor.profile.role')}
        </span>
        <Select name="role" defaultValue={targetRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="w-full z-[1000]">
            {roles.map((role) => {
              if (!isPermissible({ targetRole: role, operatorRole: operatorRole })) {
                return null
              }
              return (
                <SelectItem key={role} value={role}>{t(`editor.${role}`)}</SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </label>

      <Submit className="mt-4">
        {t("common.submit")}
      </Submit>
    </form>
  )
}
