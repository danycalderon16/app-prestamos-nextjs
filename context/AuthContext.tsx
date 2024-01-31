"use client";
// import { signOut } from "next-auth/react"
import { auth } from "@/firebase/config";
import { deleteCookie, setCookie } from "cookies-next";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

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
    // signOut(auth).then(() => {
      console.log("logout");
      
      const data = await fetch("/api/auth", {
        method: "POST",
      })
      router.replace("/sign-in")
    // });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser!);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

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
