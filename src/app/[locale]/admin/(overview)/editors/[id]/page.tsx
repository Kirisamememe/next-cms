import { notFound, redirect } from "next/navigation";
import { EditEditorRole } from "../_components/edit-editor-role";
import { isAdminGroup, isPermissible, getSession } from "@/lib-server-only";
import { EditProfile } from "../_components/edit-profile";
import { idSchema } from "@/types";
import { userService } from "@/di/services";



type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function SpecificEditorPage({ params }: Props) {
  // ログイン状態＆権限を確認
  const { user, operatorId } = await getSession()
  const { id } = await params

  const parseId = await idSchema.safeParseAsync(Number(id))
  if (parseId.error) {
    notFound()
  }

  const targetId = parseId.data

  // 自分のページではないし、管理者でもない
  if (!isAdminGroup(user.role) && targetId !== operatorId) {
    notFound()
  }

  // ターゲットユーザーの存在を確認
  const { data, error } = await userService.getById(targetId)
  // ターゲットユーザーが存在しない
  if (error) {
    notFound()
  }

  // このページで自分の権限を設定することはできない
  // 自分自身の場合、必ずNicknameのFormを返す
  if (targetId === operatorId) {
    return <EditProfile editor={data} />
  }

  // ターゲットユーザーの権限が自分より高い
  if (!isPermissible({ targetRole: data.role, operatorRole: user.role })) {
    redirect('/admin/editors?error=common.form.permission')
  }

  return <EditEditorRole editor={data} operatorRole={user.role} />
}