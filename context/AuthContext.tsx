"use client";
// import { signOut } from "next-auth/react"
import { auth } from "@/firebase/config";
import { User } from "@/interfaces/user";
import { setCookie } from "cookies-next";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface AuthContextInterface {
  googleSignIn: () => void;
  logOut: () => void;
  user: User | undefined;
}

const initialState: AuthContextInterface = {
  googleSignIn: () => {},
  logOut: () => {},
  user: undefined,
};

const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const router = useRouter();

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const token = await res.user.getIdToken();
      setCookie("token", token);
      router.replace("/loans");
    } catch (error) {
      throw new Error("Hubo un error al iniciar sesión");
    }
  };

  const logOut = async () => {
    const data = await fetch("/api/auth", {
      method: "POST",
    });
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
