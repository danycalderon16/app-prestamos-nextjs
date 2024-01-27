"use client"
import { signOut } from "next-auth/react"
import { auth } from '@/firebase/config';
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextInterface {
  googleSignIn: () => void;
  logOut: () => void;
  user: User | undefined;
}

const initialState:AuthContextInterface = {
  googleSignIn: () => {},
  logOut: () => {},
  user: undefined
}

const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}:React.PropsWithChildren) => {
  const [user, setUser ] = useState<User>();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  const logOut = ()=> {
   signOut();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser)=> {
      setUser(currentuser!);
    });
  
    return () => {
      unsubscribe();
    }
  }, [user])

  return (
    <AuthContext.Provider value={{
      user,
      googleSignIn,
      logOut
    }}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
};