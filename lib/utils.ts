import { type ClassValue, clsx } from "clsx"
import { User } from "next-auth";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function existUser():boolean{
  return getUser() !== null;
}


export function getUser():User | null{
  const mc = cookies().get("data")?.value;
  let user: User | null = null;

  if (mc) {
    try {
      user = JSON.parse(mc) as User;
    } catch (error) {
      console.error("Error al parsear el valor de la cookie como JSON:", error);
    }
  }

  return user;
}