import { User } from "@/interfaces/user";
import { jwtDecode } from "jwt-decode";

import { cookies } from "next/headers";

export function existUser():boolean{
  return getUser() !== null;
}

export function getUser():User | null{
  const cookieStore = cookies()
  const token = cookieStore.get("token")
  if(!token) return null;
  const data = jwtDecode(token?.value||"");
  let user: User | null = null;

  user = data as User;

  return user;
}