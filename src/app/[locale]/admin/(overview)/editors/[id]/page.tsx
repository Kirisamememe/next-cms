import { prisma } from "@/prisma";
import { notFound, redirect } from "next/navigation";
import { EditEditorRole } from "../components/edit-editor-role";
import { isAdminGroup, isPermissible } from "@/lib/roleUtils";
import { EditProfile } from "../components/edit-profile";
import { getSession } from "@/lib/getSession";


type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function SpecificEditorPage({ params }: Props) {
  // ログイン状態＆権限を確認
  const { user, operatorId } = await getSession()
  const { id } = await params
  const targetId = Number(id)

  // 自分のページではないし、管理者でもない
  if (!isAdminGroup(user.role) && targetId !== operatorId) {
    redirect('/admin/editors?error=common.error.permission')
  }

  // ターゲットユーザーの存在を確認
  const editor = await prisma.user.findUnique({
    where: {
      id: targetId
    }
  })
  // ターゲットユーザーが存在しない
  if (!editor?.id) {
    notFound()
  }

  // このページで自分の権限を設定することはできない
  // 自分自身の場合、必ずNicknameのFormを返す
  if (targetId === operatorId) {
    return <EditProfile editor={editor} />
  }

  // ターゲットユーザーの権限が自分より高い
  if (!isPermissible({ targetRole: editor.role, operatorRole: user.role })) {
    redirect('/admin/editors?error=common.error.permission')
  }

  return <EditEditorRole editor={editor} operatorRole={user.role} />
}