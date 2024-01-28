"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebase_app from "@/firebase/config";
import { UserAuth } from "@/context/AuthContext";

const provider = new GoogleAuthProvider();

export default function Page() {

  const {googleSignIn} = UserAuth();

  const data = useSession();

  const auth = getAuth(firebase_app)
  
  console.log({userFB:auth.currentUser});
  console.log({useSession:data});
  

  if(auth.currentUser){
    redirect("loans")
  }
  

  return (
    <div className="bg-white flex h-full">
      <div className="flex items-center justify-center h-screen w-screen dark:bg-gray-800 ">
        <button
        onClick={()=>googleSignIn()}
          className={`px-4
                py-2
                border
                flex
                gap-2
                border-slate-200
                dark:border-slate-700
                rounded-lg
                text-slate-700
                dark:text-slate-200
                hover:border-slate-400
                dark:hover:border-slate-500
                hover:text-slate-900
                dark:hover:text-slate-300
                hover:shadow
                transition
                duration-150`}
        >
          <Image
            className="w-6 h-6"
            src={"/google_logo.svg"}
            loading="lazy"
            width={24}
            height={24}
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
