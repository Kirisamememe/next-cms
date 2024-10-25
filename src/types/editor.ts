export type Editor = {
  name: string | null;
  id: number;
  role: Role;
  image: string | null;
  email: string;
  password: string | null;
  nickname: string | null;
  emailVerified: Date | null;
}

export type Role = "ADMIN" | "USER" | "BLOCKED";