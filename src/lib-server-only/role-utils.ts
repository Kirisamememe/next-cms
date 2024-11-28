import 'server-only';
import { adminRole, LEVEL_1, Role, roleLevel } from "@/types";

export function isAdminGroup(role: Role) {
  return adminRole.includes(role)
}

export function isSuperAdmin(role: Role) {
  return roleLevel[role] === LEVEL_1
}

export function isPermissible({
  targetRole,
  operatorRole
}: {
  targetRole: Role,
  operatorRole: Role
}) {
  return roleLevel[targetRole] > roleLevel[operatorRole]
}